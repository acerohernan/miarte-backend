Feature: Forgot Password
    In order to get the code to restore the password in the application
    As a registered user
    I want to get the code to restore my password

    Scenario: A registered email
        Given I send a POST request to "/user/auth/signup" with body:
            """
            {
                "email": "forgot@test.com",
                "password": "Password1",
                "username": "forgotuser"
            }
            """
        Then I send a POST request to "/user/auth/password/forgot" with body:
            """
            {
                "email": "forgot@test.com"
            }
            """
        Then the response status code should be 200
        And the response body should have the property "code"