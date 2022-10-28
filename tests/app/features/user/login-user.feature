Feature: Login an user
    In order to have authentication in our platform
    As a registered user
    I want to authenticate me

    Scenario: Correct credentials
        Given I send a POST request to "/user/auth/signup" with body:
            """
            {
                "email": "session@test.com",
                "password": "Password1",
                "username": "session1"
            }
            """
        Then I send a POST request to "/user/auth/login" with body:
            """
            {
                "email": "session@test.com",
                "password": "Password1"
            }
            """
        And the response status code should be 200
        And the response body should have the property "token"

    Scenario: A registered user with invalid password
        Given I send a POST request to "/user/auth/signup" with body:
            """
            {
                "email": "session2@test.com",
                "password": "Password1",
                "username": "session2"
            }
            """
        Then I send a POST request to "/user/auth/login" with body:
            """
            {
                "email": "session2@test.com",
                "password": "asfdf"
            }
            """
        And the response status code should be 401
        And the response body should have an error message

    Scenario: A not registered user
        Given I send a POST request to "/user/auth/login" with body:
            """
            {
                "email": "non-registered@email.com",
                "password": "sfsdfsdf"
            }
            """
        Then the response status code should be 401
        And the response body should have an error message




