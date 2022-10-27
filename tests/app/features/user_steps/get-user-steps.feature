Feature: Get user steps
    In order to get steps in our partform
    As an authenticated user
    I want to get my steps

    Scenario: An authenticated user
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {   
            "email": "steps@test.com",
            "password": "Password1",
            "username": "stepsuser"
        }
        """
        And the response should be visible in the console
        Then I send a POST request to "/user/auth/login" with body:
        """
        {
            "email": "steps@test.com",
            "password": "Password1"
        }
        """
        And I send an authenticated GET request to "/user/steps"
        And the response should be visible in the console
        And the response status code should be 200
        And the response body should have the property "steps"

