import requests
import sys
import json
from datetime import datetime

class BloggerAPITester:
    def __init__(self, base_url="https://writerly-7.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.username = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{status} - {name}")
        if details:
            print(f"   Details: {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if not success:
                details += f" (Expected: {expected_status})"
                try:
                    error_data = response.json()
                    details += f", Response: {error_data}"
                except:
                    details += f", Response: {response.text[:200]}"
            
            self.log_test(name, success, details)
            
            if success:
                try:
                    return True, response.json()
                except:
                    return True, {}
            else:
                return False, {}

        except Exception as e:
            self.log_test(name, False, f"Error: {str(e)}")
            return False, {}

    def test_categories_endpoint(self):
        """Test categories endpoint"""
        print("\n🔍 Testing Categories API...")
        success, response = self.run_test(
            "Get Categories",
            "GET",
            "categories",
            200
        )
        
        if success and isinstance(response, list):
            self.log_test("Categories Response Format", True, f"Found {len(response)} categories")
            return response
        else:
            self.log_test("Categories Response Format", False, "Invalid response format")
            return []

    def test_posts_endpoint(self):
        """Test posts endpoint"""
        print("\n🔍 Testing Posts API...")
        
        # Test get all posts
        success, response = self.run_test(
            "Get All Posts",
            "GET",
            "posts",
            200
        )
        
        posts = []
        if success and isinstance(response, list):
            posts = response
            self.log_test("Posts Response Format", True, f"Found {len(response)} posts")
            
            # Test category filtering if posts exist
            if posts:
                first_post_category = posts[0].get('category')
                if first_post_category:
                    success, filtered_response = self.run_test(
                        "Get Posts by Category",
                        "GET",
                        f"posts?category={first_post_category}",
                        200
                    )
                    
                    if success:
                        filtered_count = len(filtered_response) if isinstance(filtered_response, list) else 0
                        self.log_test("Category Filtering", True, f"Found {filtered_count} posts in category '{first_post_category}'")
        else:
            self.log_test("Posts Response Format", False, "Invalid response format")
        
        return posts

    def test_individual_post(self, posts):
        """Test individual post endpoint"""
        if not posts:
            self.log_test("Individual Post Test", False, "No posts available to test")
            return
        
        print("\n🔍 Testing Individual Post API...")
        first_post = posts[0]
        slug = first_post.get('slug')
        
        if slug:
            success, response = self.run_test(
                "Get Individual Post",
                "GET",
                f"posts/{slug}",
                200
            )
            
            if success and response.get('slug') == slug:
                self.log_test("Individual Post Content", True, f"Retrieved post: {response.get('title', 'Unknown')}")
            else:
                self.log_test("Individual Post Content", False, "Post content mismatch")
        else:
            self.log_test("Individual Post Test", False, "No slug found in first post")

    def test_auth_registration(self):
        """Test user registration"""
        print("\n🔍 Testing Authentication - Registration...")
        
        test_user_data = {
            "username": f"testuser_{datetime.now().strftime('%H%M%S')}",
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "password": "TestPassword123!"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=test_user_data
        )
        
        if success and response.get('access_token'):
            self.token = response['access_token']
            self.username = response.get('username')
            self.log_test("Registration Token", True, f"Received token for user: {self.username}")
            return True
        else:
            self.log_test("Registration Token", False, "No token received")
            return False

    def test_auth_login(self):
        """Test user login with existing credentials"""
        print("\n🔍 Testing Authentication - Login...")
        
        # First register a user
        test_user_data = {
            "username": f"logintest_{datetime.now().strftime('%H%M%S')}",
            "email": f"logintest_{datetime.now().strftime('%H%M%S')}@example.com",
            "password": "LoginTest123!"
        }
        
        # Register
        reg_success, reg_response = self.run_test(
            "Pre-Login Registration",
            "POST",
            "auth/register",
            200,
            data=test_user_data
        )
        
        if not reg_success:
            self.log_test("Login Test Setup", False, "Could not register user for login test")
            return False
        
        # Now test login
        login_data = {
            "email": test_user_data["email"],
            "password": test_user_data["password"]
        }
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data=login_data
        )
        
        if success and response.get('access_token'):
            self.log_test("Login Token", True, f"Login successful for user: {response.get('username')}")
            return True
        else:
            self.log_test("Login Token", False, "Login failed")
            return False

    def test_protected_endpoints(self):
        """Test protected endpoints (CRUD operations)"""
        if not self.token:
            self.log_test("Protected Endpoints", False, "No authentication token available")
            return
        
        print("\n🔍 Testing Protected Endpoints...")
        
        # Test create post
        new_post_data = {
            "title": f"Test Post {datetime.now().strftime('%H%M%S')}",
            "excerpt": "This is a test post excerpt for API testing",
            "content": "This is the full content of the test post. It contains multiple sentences to test the content field properly.",
            "image_url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
            "category": "Test",
            "slug": f"test-post-{datetime.now().strftime('%H%M%S')}",
            "published": True
        }
        
        success, response = self.run_test(
            "Create Post",
            "POST",
            "posts",
            200,
            data=new_post_data
        )
        
        created_post_id = None
        if success and response.get('id'):
            created_post_id = response['id']
            self.log_test("Post Creation Response", True, f"Created post with ID: {created_post_id}")
            
            # Test update post
            update_data = {
                "title": f"Updated Test Post {datetime.now().strftime('%H%M%S')}",
                "excerpt": "Updated excerpt for testing"
            }
            
            success, response = self.run_test(
                "Update Post",
                "PUT",
                f"posts/{created_post_id}",
                200,
                data=update_data
            )
            
            if success:
                self.log_test("Post Update", True, "Post updated successfully")
            
            # Test delete post
            success, response = self.run_test(
                "Delete Post",
                "DELETE",
                f"posts/{created_post_id}",
                200
            )
            
            if success:
                self.log_test("Post Deletion", True, "Post deleted successfully")
        else:
            self.log_test("Post Creation Response", False, "Failed to create post or no ID returned")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Blogger API Tests...")
        print(f"Testing against: {self.base_url}")
        
        # Test public endpoints
        categories = self.test_categories_endpoint()
        posts = self.test_posts_endpoint()
        self.test_individual_post(posts)
        
        # Test authentication
        auth_success = self.test_auth_registration()
        if auth_success:
            self.test_protected_endpoints()
        
        # Test login separately
        self.test_auth_login()
        
        # Print summary
        print(f"\n📊 Test Summary:")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": self.tests_passed/self.tests_run*100 if self.tests_run > 0 else 0,
            "test_results": self.test_results
        }

def main():
    tester = BloggerAPITester()
    results = tester.run_all_tests()
    
    # Save results to file
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return 0 if results["success_rate"] > 80 else 1

if __name__ == "__main__":
    sys.exit(main())