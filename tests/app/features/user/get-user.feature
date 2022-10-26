Feature: Get User Information  
    In order to use the user information in the platform
    As an authenticated user
    I want to get my user information

    Scenario: An authenticated user
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "get@test.com",
            "password": "Password1",
            "username": "getuser"
        }
        """
        Then I send a POST request to "/user/auth/login" with body:
        """
        {
            "email": "get@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        And I send an authenticated GET request to "/user/information"
        And the response status code should be 200
        And the response body should have the property "user"
    
    Scenario: An anon user
        Given I send a GET request to "/user/information"
        And the response status code should be 401
        And the response body should have an error message
    