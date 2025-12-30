from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class StoneDetails(BaseModel):
    type: Optional[str] = None
    carat: Optional[float] = None
    clarity: Optional[str] = None
    color: Optional[str] = None

class Availability(BaseModel):
    ship: bool = True
    storePickup: bool = False

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    sku: str
    category: str
    metal: str
    purity: str
    metalColor: str
    grossWeight: float
    price: float
    description: str
    images: List[str]
    tags: List[str]
    occasion: List[str]
    gender: str
    stoneDetails: Optional[StoneDetails] = None
    availability: Availability
    rating: float
    reviewCount: int
    dimensions: Optional[Dict[str, Any]] = None
    priceBreakup: Optional[Dict[str, float]] = None

class CartItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    productId: str
    quantity: int = 1
    size: Optional[str] = None
    userId: str = "guest"

class WishlistItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    productId: str
    userId: str = "guest"

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    city: str
    preferredStore: str
    date: str
    time: str
    purpose: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ExchangeLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    city: str
    goldType: str
    approximateWeight: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Store(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    address: str
    city: str
    pincode: str
    phone: str
    hours: str

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str = "guest"
    items: List[Dict[str, Any]]
    total: float
    address: Dict[str, str]
    paymentMethod: str
    status: str = "pending"
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QuizResponse(BaseModel):
    occasion: str
    budget: List[int]
    style: str
    metal: str

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StoreQuery(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    pincode: str
    productId: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# API Routes
@api_router.get("/")
async def root():
    return {"message": "The Golden Era API"}

# Products
@api_router.get("/products", response_model=Dict[str, Any])
async def get_products(
    category: Optional[str] = None,
    metal: Optional[str] = None,
    purity: Optional[str] = None,
    metalColor: Optional[str] = None,
    occasion: Optional[str] = None,
    gender: Optional[str] = None,
    minPrice: Optional[float] = None,
    maxPrice: Optional[float] = None,
    availability: Optional[str] = None,
    sort: Optional[str] = "featured",
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50)
):
    query = {}
    
    if category:
        query["category"] = category
    if metal:
        query["metal"] = metal
    if purity:
        query["purity"] = purity
    if metalColor:
        query["metalColor"] = metalColor
    if occasion:
        query["occasion"] = {"$in": [occasion]}
    if gender:
        query["gender"] = gender
    if minPrice is not None or maxPrice is not None:
        query["price"] = {}
        if minPrice is not None:
            query["price"]["$gte"] = minPrice
        if maxPrice is not None:
            query["price"]["$lte"] = maxPrice
    if availability:
        if availability == "ship":
            query["availability.ship"] = True
        elif availability == "storePickup":
            query["availability.storePickup"] = True
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"sku": {"$regex": search, "$options": "i"}},
            {"category": {"$regex": search, "$options": "i"}},
            {"tags": {"$in": [search]}}
        ]
    
    sort_options = {
        "featured": [("rating", -1)],
        "newest": [("id", -1)],
        "price_low": [("price", 1)],
        "price_high": [("price", -1)]
    }
    
    sort_by = sort_options.get(sort, [("rating", -1)])
    
    skip = (page - 1) * limit
    
    products = await db.products.find(query, {"_id": 0}).sort(sort_by).skip(skip).limit(limit).to_list(limit)
    total = await db.products.count_documents(query)
    
    return {
        "products": products,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit
    }

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@api_router.get("/products/related/{product_id}")
async def get_related_products(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    related = await db.products.find(
        {
            "id": {"$ne": product_id},
            "$or": [
                {"category": product["category"]},
                {"tags": {"$in": product.get("tags", [])}}
            ]
        },
        {"_id": 0}
    ).limit(8).to_list(8)
    
    return related

@api_router.get("/search/suggestions")
async def search_suggestions(q: str):
    if not q or len(q) < 2:
        return []
    
    products = await db.products.find(
        {"$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"sku": {"$regex": q, "$options": "i"}},
            {"category": {"$regex": q, "$options": "i"}}
        ]},
        {"_id": 0, "name": 1, "category": 1, "id": 1, "images": 1, "price": 1}
    ).limit(5).to_list(5)
    
    return products

# Cart
@api_router.get("/cart")
async def get_cart(userId: str = "guest"):
    cart_items = await db.cart.find({"userId": userId}, {"_id": 0}).to_list(100)
    return cart_items

@api_router.post("/cart")
async def add_to_cart(item: CartItem):
    existing = await db.cart.find_one({"userId": item.userId, "productId": item.productId, "size": item.size})
    
    if existing:
        await db.cart.update_one(
            {"userId": item.userId, "productId": item.productId, "size": item.size},
            {"$inc": {"quantity": item.quantity}}
        )
        return {"message": "Cart updated"}
    else:
        doc = item.model_dump()
        await db.cart.insert_one(doc)
        return {"message": "Added to cart"}

@api_router.put("/cart/{item_id}")
async def update_cart_item(item_id: str, quantity: int):
    result = await db.cart.update_one({"id": item_id}, {"$set": {"quantity": quantity}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Cart updated"}

@api_router.delete("/cart/{item_id}")
async def remove_from_cart(item_id: str):
    result = await db.cart.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item removed"}

@api_router.delete("/cart")
async def clear_cart(userId: str = "guest"):
    await db.cart.delete_many({"userId": userId})
    return {"message": "Cart cleared"}

# Wishlist
@api_router.get("/wishlist")
async def get_wishlist(userId: str = "guest"):
    wishlist = await db.wishlist.find({"userId": userId}, {"_id": 0}).to_list(100)
    return wishlist

@api_router.post("/wishlist")
async def add_to_wishlist(item: WishlistItem):
    existing = await db.wishlist.find_one({"userId": item.userId, "productId": item.productId})
    if existing:
        return {"message": "Already in wishlist"}
    
    doc = item.model_dump()
    await db.wishlist.insert_one(doc)
    return {"message": "Added to wishlist"}

@api_router.delete("/wishlist/{item_id}")
async def remove_from_wishlist(item_id: str):
    result = await db.wishlist.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item removed"}

# Appointments
@api_router.post("/appointments")
async def create_appointment(appointment: Appointment):
    doc = appointment.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.appointments.insert_one(doc)
    return {"message": "Appointment booked successfully", "id": appointment.id}

# Exchange Leads
@api_router.post("/exchange-leads")
async def create_exchange_lead(lead: ExchangeLead):
    doc = lead.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.exchange_leads.insert_one(doc)
    return {"message": "Request submitted successfully", "id": lead.id}

# Stores
@api_router.get("/stores")
async def get_stores(city: Optional[str] = None, pincode: Optional[str] = None):
    query = {}
    if city:
        query["city"] = {"$regex": city, "$options": "i"}
    if pincode:
        query["pincode"] = pincode
    
    stores = await db.stores.find(query, {"_id": 0}).to_list(100)
    return stores

# Store Queries
@api_router.post("/store-queries")
async def create_store_query(query: StoreQuery):
    doc = query.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.store_queries.insert_one(doc)
    return {"message": "We'll contact you soon", "id": query.id}

# Orders
@api_router.post("/orders")
async def create_order(order: Order):
    doc = order.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.orders.insert_one(doc)
    return {"message": "Order placed successfully", "orderId": order.id}

@api_router.get("/orders")
async def get_orders(userId: str = "guest"):
    orders = await db.orders.find({"userId": userId}, {"_id": 0}).to_list(100)
    for order in orders:
        if isinstance(order.get('createdAt'), str):
            order['createdAt'] = datetime.fromisoformat(order['createdAt'])
    return orders

# Quiz
@api_router.post("/quiz-results")
async def get_quiz_results(quiz: QuizResponse):
    query = {}
    
    if quiz.occasion:
        query["occasion"] = {"$in": [quiz.occasion]}
    if quiz.budget:
        query["price"] = {"$gte": quiz.budget[0], "$lte": quiz.budget[1]}
    if quiz.metal:
        query["metal"] = quiz.metal
    
    products = await db.products.find(query, {"_id": 0}).limit(12).to_list(12)
    return products

# Newsletter
@api_router.post("/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    existing = await db.newsletter.find_one({"email": subscription.email})
    if existing:
        return {"message": "Already subscribed"}
    
    doc = subscription.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.newsletter.insert_one(doc)
    return {"message": "Subscribed successfully"}

# Contact
@api_router.post("/contact")
async def submit_contact(form: ContactForm):
    doc = form.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.contact_forms.insert_one(doc)
    return {"message": "Message sent successfully", "id": form.id}

# Categories
@api_router.get("/categories")
async def get_categories():
    categories = await db.products.distinct("category")
    return categories

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()