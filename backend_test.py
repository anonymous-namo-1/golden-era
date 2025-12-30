import requests
import sys
import json
from datetime import datetime

class JewelryEcommerceAPITester:
    def __init__(self, base_url="https://golden-era-shop.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and 'products' in response_data:
                        print(f"   Found {len(response_data['products'])} products")
                    elif isinstance(response_data, list):
                        print(f"   Returned {len(response_data)} items")
                except:
                    pass
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Response: {response.text[:200]}")

            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success
            })

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'error': str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_get_all_products(self):
        """Test getting all products"""
        success, response = self.run_test("Get All Products", "GET", "products", 200)
        if success and 'products' in response:
            print(f"   Total products available: {response.get('total', 0)}")
        return success, response

    def test_product_filters(self):
        """Test product filtering"""
        filters = [
            ("metal=Gold", "Gold Filter"),
            ("metal=Silver", "Silver Filter"),
            ("category=Ring", "Ring Category"),
            ("occasion=Wedding", "Wedding Occasion"),
            ("gender=Women", "Women Gender"),
            ("minPrice=10000&maxPrice=50000", "Price Range"),
            ("sort=price_low", "Sort by Price Low"),
            ("sort=price_high", "Sort by Price High")
        ]
        
        results = []
        for filter_param, filter_name in filters:
            success, response = self.run_test(f"Filter: {filter_name}", "GET", f"products?{filter_param}", 200)
            results.append(success)
        
        return all(results)

    def test_get_single_product(self):
        """Test getting a single product"""
        # First get products to find a valid ID
        success, products_response = self.test_get_all_products()
        if not success or not products_response.get('products'):
            return False
        
        product_id = products_response['products'][0]['id']
        success, response = self.run_test("Get Single Product", "GET", f"products/{product_id}", 200)
        
        if success:
            print(f"   Product: {response.get('name', 'Unknown')}")
            print(f"   Price: ₹{response.get('price', 0):,}")
        
        return success, response

    def test_related_products(self):
        """Test getting related products"""
        # Get a product ID first
        success, products_response = self.test_get_all_products()
        if not success or not products_response.get('products'):
            return False
        
        product_id = products_response['products'][0]['id']
        return self.run_test("Get Related Products", "GET", f"products/related/{product_id}", 200)

    def test_search_suggestions(self):
        """Test search suggestions"""
        return self.run_test("Search Suggestions", "GET", "search/suggestions?q=ring", 200)

    def test_cart_operations(self):
        """Test cart CRUD operations"""
        # Get cart
        success1, _ = self.run_test("Get Cart", "GET", "cart", 200)
        
        # Add to cart
        cart_item = {
            "productId": "test-product-1",
            "quantity": 1,
            "size": "M"
        }
        success2, _ = self.run_test("Add to Cart", "POST", "cart", 200, cart_item)
        
        # Clear cart
        success3, _ = self.run_test("Clear Cart", "DELETE", "cart", 200)
        
        return success1 and success2 and success3

    def test_wishlist_operations(self):
        """Test wishlist operations"""
        # Get wishlist
        success1, _ = self.run_test("Get Wishlist", "GET", "wishlist", 200)
        
        # Add to wishlist
        wishlist_item = {
            "productId": "test-product-1"
        }
        success2, _ = self.run_test("Add to Wishlist", "POST", "wishlist", 200, wishlist_item)
        
        return success1 and success2

    def test_appointment_booking(self):
        """Test appointment booking"""
        appointment = {
            "name": "Test User",
            "phone": "9876543210",
            "city": "Mumbai",
            "preferredStore": "Mumbai Central",
            "date": "2024-02-15",
            "time": "14:00",
            "purpose": "Consultation"
        }
        return self.run_test("Book Appointment", "POST", "appointments", 200, appointment)

    def test_gold_exchange(self):
        """Test gold exchange lead submission"""
        exchange_lead = {
            "name": "Test User",
            "phone": "9876543210",
            "email": "test@example.com",
            "city": "Delhi",
            "goldType": "22K Gold",
            "approximateWeight": "10-20 grams"
        }
        return self.run_test("Gold Exchange Lead", "POST", "exchange-leads", 200, exchange_lead)

    def test_stores(self):
        """Test store locator"""
        success1, _ = self.run_test("Get All Stores", "GET", "stores", 200)
        success2, _ = self.run_test("Search Stores by City", "GET", "stores?city=Mumbai", 200)
        return success1 and success2

    def test_order_creation(self):
        """Test order creation"""
        order = {
            "items": [{"productId": "test-1", "quantity": 1, "price": 25000}],
            "total": 25000,
            "address": {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "9876543210",
                "address": "123 Test Street",
                "city": "Mumbai",
                "state": "Maharashtra",
                "pincode": "400001"
            },
            "paymentMethod": "cod"
        }
        return self.run_test("Create Order", "POST", "orders", 200, order)

    def test_contact_form(self):
        """Test contact form submission"""
        contact = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "9876543210",
            "message": "Test message for jewelry inquiry"
        }
        return self.run_test("Contact Form", "POST", "contact", 200, contact)

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        subscription = {
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com"
        }
        return self.run_test("Newsletter Subscription", "POST", "newsletter", 200, subscription)

    def test_categories(self):
        """Test getting categories"""
        return self.run_test("Get Categories", "GET", "categories", 200)

def main():
    print("🏪 Starting The Golden Era Jewelry E-commerce API Tests")
    print("=" * 60)
    
    tester = JewelryEcommerceAPITester()
    
    # Core product tests
    print("\n📦 PRODUCT TESTS")
    tester.test_api_root()
    tester.test_get_all_products()
    tester.test_product_filters()
    tester.test_get_single_product()
    tester.test_related_products()
    tester.test_search_suggestions()
    tester.test_categories()
    
    # E-commerce functionality tests
    print("\n🛒 E-COMMERCE TESTS")
    tester.test_cart_operations()
    tester.test_wishlist_operations()
    tester.test_order_creation()
    
    # Service tests
    print("\n🏪 SERVICE TESTS")
    tester.test_appointment_booking()
    tester.test_gold_exchange()
    tester.test_stores()
    tester.test_contact_form()
    tester.test_newsletter_subscription()
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    failed_tests = [test for test in tester.test_results if not test['success']]
    if failed_tests:
        print("\n❌ FAILED TESTS:")
        for test in failed_tests:
            error_msg = test.get('error', f'Status {test["actual_status"]}')
            print(f"   - {test['name']}: {error_msg}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n✨ Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())