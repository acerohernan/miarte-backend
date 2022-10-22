Feature: Signup a user
    In order to have registration in our platform
    As anon user
    I want to register my account

    Scenario: A valid request
        Given I send a POST request to "/user/auth/signup" with body:
        """
        {
            "email": "acero@gmail.com",
            "password": "Password1",
            "username": "acerohernan"
        }
        """
        Then the response should be visible in the console
        Then the response status code should be 201
        And the response body should be empty