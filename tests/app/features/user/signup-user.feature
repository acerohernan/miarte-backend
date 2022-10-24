Feature: Signup a user
    In order to have registration in our platform
    As anon user
    I want to register my account

    Scenario: A valid request
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create@test.com",
            "password": "Password1",
            "username": "acerohernan"
        }
        """
        Then the response status code should be 201
        And the response body should be empty
    
    Scenario: A registered email
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create2@test.com",
            "password": "Password1",
            "username": "randomuser"
        }
        """
        And I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create2@test.com",
            "password": "Password1",
            "username": "randomusername"
        }
        """
        Then the response status code should be 400
        And the response body should have an error message
    
     Scenario: A registered username
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create3@test.com",
            "password": "Password1",
            "username": "nuevouser"
        }
        """
        And I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "create4@test.com",
            "password": "Password1",
            "username": "nuevouser"
        }
        """
        Then the response status code should be 400
        And the response body should have an error message
    

    