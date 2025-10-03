#!/usr/bin/env python3
"""
Backend Testing Suite for Gothic Author Website
Tests visitor tracking, contact form, and database integration
"""

import requests
import json
import time
from datetime import datetime
import hashlib
import random
import string

# Configuration
BASE_URL = "https://gothic-author.preview.emergentagent.com/api"
TIMEOUT = 30

class GothicAuthorBackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.session.timeout = TIMEOUT
        self.test_results = {
            "visitor_tracking": {"passed": 0, "failed": 0, "errors": []},
            "contact_form": {"passed": 0, "failed": 0, "errors": []},
            "database_integration": {"passed": 0, "failed": 0, "errors": []},
            "error_handling": {"passed": 0, "failed": 0, "errors": []}
        }
        
    def log_result(self, category, test_name, success, message=""):
        if success:
            self.test_results[category]["passed"] += 1
            print(f"✅ {test_name}: PASSED")
        else:
            self.test_results[category]["failed"] += 1
            self.test_results[category]["errors"].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: FAILED - {message}")
    
    def generate_random_string(self, length=10):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
    
    def test_visitor_tracking_system(self):
        print("\n🧛 Testing Visitor Tracking System...")
        
        # Test 1: Track visit to home page
        try:
            response = self.session.post(f"{BASE_URL}/track-visit", 
                json={"page_path": "/"},
                headers={"Content-Type": "application/json"})
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") == True:
                    self.log_result("visitor_tracking", "Track visit to home page", True)
                else:
                    self.log_result("visitor_tracking", "Track visit to home page", False, 
                                  f"Success flag false: {data}")
            else:
                self.log_result("visitor_tracking", "Track visit to home page", False, 
                              f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("visitor_tracking", "Track visit to home page", False, str(e))
        
        # Test 2: Track visit to different pages
        pages = ["/about", "/books", "/contact", "/blog/dark-tales"]
        for page in pages:
            try:
                response = self.session.post(f"{BASE_URL}/track-visit", 
                    json={"page_path": page},
                    headers={"Content-Type": "application/json"})
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") == True:
                        self.log_result("visitor_tracking", f"Track visit to {page}", True)
                    else:
                        self.log_result("visitor_tracking", f"Track visit to {page}", False, 
                                      f"Success flag false: {data}")
                else:
                    self.log_result("visitor_tracking", f"Track visit to {page}", False, 
                                  f"Status code: {response.status_code}")
            except Exception as e:
                self.log_result("visitor_tracking", f"Track visit to {page}", False, str(e))
        
        # Test 3: Get visitor stats
        try:
            response = self.session.get(f"{BASE_URL}/visitor-stats")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["total_visits", "unique_visitors", "daily_visits", 
                                 "weekly_visits", "monthly_visits", "last_updated"]
                
                if all(field in data for field in required_fields):
                    if data["total_visits"] > 0:
                        self.log_result("visitor_tracking", "Get visitor stats", True)
                    else:
                        self.log_result("visitor_tracking", "Get visitor stats", False, 
                                      "Total visits should be > 0 after tracking visits")
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("visitor_tracking", "Get visitor stats", False, 
                                  f"Missing fields: {missing}")
            else:
                self.log_result("visitor_tracking", "Get visitor stats", False, 
                              f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("visitor_tracking", "Get visitor stats", False, str(e))
        
        # Test 4: Multiple visits to ensure unique visitor tracking
        try:
            initial_response = self.session.get(f"{BASE_URL}/visitor-stats")
            initial_stats = initial_response.json()
            initial_unique = initial_stats.get("unique_visitors", 0)
            
            # Make multiple visits from same session
            for i in range(3):
                self.session.post(f"{BASE_URL}/track-visit", 
                    json={"page_path": f"/test-page-{i}"},
                    headers={"Content-Type": "application/json"})
                time.sleep(0.5)
            
            # Check stats again
            final_response = self.session.get(f"{BASE_URL}/visitor-stats")
            final_stats = final_response.json()
            final_unique = final_stats.get("unique_visitors", 0)
            
            # Unique visitors should not increase dramatically for same session
            if final_unique >= initial_unique:
                self.log_result("visitor_tracking", "Unique visitor tracking", True)
            else:
                self.log_result("visitor_tracking", "Unique visitor tracking", False, 
                              f"Unique visitors decreased: {initial_unique} -> {final_unique}")
                
        except Exception as e:
            self.log_result("visitor_tracking", "Unique visitor tracking", False, str(e))
    
    def test_contact_form_system(self):
        print("\n📧 Testing Contact Form System...")
        
        # Test 1: Submit valid contact message
        contact_data = {
            "name": "Edgar Allan Poe",
            "email": "edgar@darkpoetry.com",
            "subject": "Inquiry about your latest gothic novel",
            "message": "Greetings from the realm of shadows. I am deeply intrigued by your latest work and would love to discuss the darker themes that permeate your writing. The way you weave mystery and melancholy is truly captivating."
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/contact", 
                json=contact_data,
                headers={"Content-Type": "application/json"})
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") == True and "whisper back soon" in data.get("message", "").lower():
                    self.log_result("contact_form", "Submit valid contact message", True)
                else:
                    self.log_result("contact_form", "Submit valid contact message", False, 
                                  f"Unexpected response: {data}")
            else:
                self.log_result("contact_form", "Submit valid contact message", False, 
                              f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("contact_form", "Submit valid contact message", False, str(e))
        
        # Test 2: Submit another contact message with different data
        contact_data2 = {
            "name": "Victoria Blackwood",
            "email": "victoria@gothicmanor.org",
            "subject": "Collaboration Proposal",
            "message": "Dear Author, I represent a collective of gothic literature enthusiasts. We would be honored to feature your work in our upcoming anthology of contemporary dark fiction."
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/contact", 
                json=contact_data2,
                headers={"Content-Type": "application/json"})
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") == True:
                    self.log_result("contact_form", "Submit second contact message", True)
                else:
                    self.log_result("contact_form", "Submit second contact message", False, 
                                  f"Success flag false: {data}")
            else:
                self.log_result("contact_form", "Submit second contact message", False, 
                              f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("contact_form", "Submit second contact message", False, str(e))
        
        # Test 3: Retrieve contact messages
        try:
            response = self.session.get(f"{BASE_URL}/contact-messages")
            
            if response.status_code == 200:
                messages = response.json()
                if isinstance(messages, list) and len(messages) > 0:
                    # Check if our test messages are in the response
                    found_edgar = any(msg.get("name") == "Edgar Allan Poe" for msg in messages)
                    found_victoria = any(msg.get("name") == "Victoria Blackwood" for msg in messages)
                    
                    if found_edgar and found_victoria:
                        self.log_result("contact_form", "Retrieve contact messages", True)
                    else:
                        self.log_result("contact_form", "Retrieve contact messages", False, 
                                      f"Test messages not found. Edgar: {found_edgar}, Victoria: {found_victoria}")
                else:
                    self.log_result("contact_form", "Retrieve contact messages", False, 
                                  f"Expected list with messages, got: {type(messages)} with length {len(messages) if isinstance(messages, list) else 'N/A'}")
            else:
                self.log_result("contact_form", "Retrieve contact messages", False, 
                              f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("contact_form", "Retrieve contact messages", False, str(e))
    
    def test_database_integration(self):
        print("\n🗄️ Testing Database Integration...")
        
        # Test 1: Verify visitor stats persistence
        try:
            # Get initial stats
            response1 = self.session.get(f"{BASE_URL}/visitor-stats")
            stats1 = response1.json()
            
            # Track a visit
            self.session.post(f"{BASE_URL}/track-visit", 
                json={"page_path": "/database-test"},
                headers={"Content-Type": "application/json"})
            
            # Get updated stats
            response2 = self.session.get(f"{BASE_URL}/visitor-stats")
            stats2 = response2.json()
            
            if stats2["total_visits"] > stats1["total_visits"]:
                self.log_result("database_integration", "Visitor stats persistence", True)
            else:
                self.log_result("database_integration", "Visitor stats persistence", False, 
                              f"Stats not updated: {stats1['total_visits']} -> {stats2['total_visits']}")
        except Exception as e:
            self.log_result("database_integration", "Visitor stats persistence", False, str(e))
        
        # Test 2: Verify contact message storage
        unique_subject = f"Database Test {self.generate_random_string()}"
        contact_data = {
            "name": "Database Tester",
            "email": "test@database.com",
            "subject": unique_subject,
            "message": "Testing database storage functionality"
        }
        
        try:
            # Submit message
            submit_response = self.session.post(f"{BASE_URL}/contact", 
                json=contact_data,
                headers={"Content-Type": "application/json"})
            
            if submit_response.status_code == 200:
                # Retrieve messages and check if our test message is there
                retrieve_response = self.session.get(f"{BASE_URL}/contact-messages")
                messages = retrieve_response.json()
                
                found_message = any(msg.get("subject") == unique_subject for msg in messages)
                
                if found_message:
                    self.log_result("database_integration", "Contact message storage", True)
                else:
                    self.log_result("database_integration", "Contact message storage", False, 
                                  "Test message not found in database")
            else:
                self.log_result("database_integration", "Contact message storage", False, 
                              f"Failed to submit message: {submit_response.status_code}")
        except Exception as e:
            self.log_result("database_integration", "Contact message storage", False, str(e))
        
        # Test 3: Verify timestamp handling
        try:
            response = self.session.get(f"{BASE_URL}/contact-messages")
            messages = response.json()
            
            if messages and len(messages) > 0:
                # Check if messages have proper timestamps
                has_timestamps = all("created_at" in msg for msg in messages[:5])  # Check first 5
                
                if has_timestamps:
                    self.log_result("database_integration", "Timestamp handling", True)
                else:
                    self.log_result("database_integration", "Timestamp handling", False, 
                                  "Messages missing timestamps")
            else:
                self.log_result("database_integration", "Timestamp handling", False, 
                              "No messages to check timestamps")
        except Exception as e:
            self.log_result("database_integration", "Timestamp handling", False, str(e))
    
    def test_error_handling(self):
        print("\n⚠️ Testing Error Handling...")
        
        # Test 1: Invalid contact form data
        invalid_contact_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email format
            "subject": "",  # Empty subject
            "message": ""  # Empty message
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/contact", 
                json=invalid_contact_data,
                headers={"Content-Type": "application/json"})
            
            # Should either return 400 or handle gracefully with success=false
            if response.status_code in [400, 422] or (response.status_code == 200 and not response.json().get("success", True)):
                self.log_result("error_handling", "Invalid contact form data", True)
            else:
                self.log_result("error_handling", "Invalid contact form data", False, 
                              f"Expected error handling, got: {response.status_code}, {response.text}")
        except Exception as e:
            self.log_result("error_handling", "Invalid contact form data", False, str(e))
        
        # Test 2: Invalid track visit data
        try:
            response = self.session.post(f"{BASE_URL}/track-visit", 
                json={"invalid_field": "test"},  # Missing page_path
                headers={"Content-Type": "application/json"})
            
            if response.status_code in [400, 422]:
                self.log_result("error_handling", "Invalid track visit data", True)
            else:
                self.log_result("error_handling", "Invalid track visit data", False, 
                              f"Expected 400/422, got: {response.status_code}")
        except Exception as e:
            self.log_result("error_handling", "Invalid track visit data", False, str(e))
        
        # Test 3: Non-existent endpoint
        try:
            response = self.session.get(f"{BASE_URL}/non-existent-endpoint")
            
            if response.status_code == 404:
                self.log_result("error_handling", "Non-existent endpoint", True)
            else:
                self.log_result("error_handling", "Non-existent endpoint", False, 
                              f"Expected 404, got: {response.status_code}")
        except Exception as e:
            self.log_result("error_handling", "Non-existent endpoint", False, str(e))
        
        # Test 4: Malformed JSON
        try:
            response = self.session.post(f"{BASE_URL}/contact", 
                data="invalid json data",
                headers={"Content-Type": "application/json"})
            
            if response.status_code in [400, 422]:
                self.log_result("error_handling", "Malformed JSON", True)
            else:
                self.log_result("error_handling", "Malformed JSON", False, 
                              f"Expected 400/422, got: {response.status_code}")
        except Exception as e:
            self.log_result("error_handling", "Malformed JSON", False, str(e))
    
    def run_all_tests(self):
        print("🦇 Starting Gothic Author Website Backend Tests...")
        print(f"Testing against: {BASE_URL}")
        print("=" * 60)
        
        self.test_visitor_tracking_system()
        self.test_contact_form_system()
        self.test_database_integration()
        self.test_error_handling()
        
        self.print_summary()
    
    def print_summary(self):
        print("\n" + "=" * 60)
        print("🧛‍♂️ TEST SUMMARY")
        print("=" * 60)
        
        total_passed = sum(category["passed"] for category in self.test_results.values())
        total_failed = sum(category["failed"] for category in self.test_results.values())
        total_tests = total_passed + total_failed
        
        for category, results in self.test_results.items():
            passed = results["passed"]
            failed = results["failed"]
            total_cat = passed + failed
            
            print(f"\n{category.replace('_', ' ').title()}:")
            print(f"  ✅ Passed: {passed}/{total_cat}")
            print(f"  ❌ Failed: {failed}/{total_cat}")
            
            if results["errors"]:
                print("  Errors:")
                for error in results["errors"]:
                    print(f"    - {error}")
        
        print(f"\n🎭 OVERALL RESULTS:")
        print(f"  Total Tests: {total_tests}")
        print(f"  Passed: {total_passed}")
        print(f"  Failed: {total_failed}")
        print(f"  Success Rate: {(total_passed/total_tests*100):.1f}%" if total_tests > 0 else "No tests run")
        
        if total_failed == 0:
            print("\n🌟 All tests passed! The gothic spirits are pleased.")
        else:
            print(f"\n⚡ {total_failed} test(s) failed. The shadows whisper of issues to resolve.")

if __name__ == "__main__":
    tester = GothicAuthorBackendTester()
    tester.run_all_tests()