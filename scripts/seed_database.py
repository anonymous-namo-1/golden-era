import json
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Load products data
    products_file = Path(__file__).parent.parent / 'data' / 'products.json'
    with open(products_file, 'r') as f:
        products = json.load(f)
    
    # Clear existing products
    await db.products.delete_many({})
    
    # Insert products
    if products:
        await db.products.insert_many(products)
        print(f"✓ Inserted {len(products)} products")
    
    # Seed stores
    stores = [
        {
            "id": "store_001",
            "name": "The Golden Era - Mumbai Flagship",
            "address": "123 Fashion Street, Fort, Mumbai",
            "city": "Mumbai",
            "pincode": "400001",
            "phone": "+91 22 1234 5678",
            "hours": "10:00 AM - 8:00 PM (All days)"
        },
        {
            "id": "store_002",
            "name": "The Golden Era - Delhi",
            "address": "45 Connaught Place, New Delhi",
            "city": "Delhi",
            "pincode": "110001",
            "phone": "+91 11 1234 5678",
            "hours": "10:00 AM - 8:00 PM (All days)"
        },
        {
            "id": "store_003",
            "name": "The Golden Era - Bangalore",
            "address": "78 MG Road, Bangalore",
            "city": "Bangalore",
            "pincode": "560001",
            "phone": "+91 80 1234 5678",
            "hours": "10:00 AM - 8:00 PM (All days)"
        },
        {
            "id": "store_004",
            "name": "The Golden Era - Pune",
            "address": "12 FC Road, Pune",
            "city": "Pune",
            "pincode": "411004",
            "phone": "+91 20 1234 5678",
            "hours": "10:00 AM - 8:00 PM (All days)"
        },
        {
            "id": "store_005",
            "name": "The Golden Era - Hyderabad",
            "address": "89 Banjara Hills, Hyderabad",
            "city": "Hyderabad",
            "pincode": "500034",
            "phone": "+91 40 1234 5678",
            "hours": "10:00 AM - 8:00 PM (All days)"
        }
    ]
    
    await db.stores.delete_many({})
    await db.stores.insert_many(stores)
    print(f"✓ Inserted {len(stores)} stores")
    
    # Create indexes
    await db.products.create_index("category")
    await db.products.create_index("metal")
    await db.products.create_index("price")
    await db.products.create_index("tags")
    await db.stores.create_index("city")
    await db.stores.create_index("pincode")
    print("✓ Created indexes")
    
    client.close()
    print("\n✅ Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())