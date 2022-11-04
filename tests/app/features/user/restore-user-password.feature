Feature: Restore User Password
    In order to have the option to restore the user password
    As a registered user
    I want to restore my password

    Scenario: A valid code and valid new password
        Given I send a POST request to "/api/user/auth/signup" with body:
            """
            {
                "id": "d1acfa8f-650d-4620-b732-dae6c4ebe886",
                "email": "restore@test.com",
                "password": "Password1",
                "username": "restoreuser"
            }
            """
        Then I send a POST request to "/api/user/auth/password/restore" with body:
            """
            {
                "code": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0b3JlX3Bhc3N3b3JkIjp0cnVlLCJ1c2VyIjoiZDFhY2ZhOGYtNjUwZC00NjIwLWI3MzItZGFlNmM0ZWJlODg2IiwiaWF0IjoxNjY2NzMwMTE5fQ.5JW6cQ-5blGKeottiHy0e5qg26hHi3_Ne-HRbXufAlc",
                "password": "NewPassword2",
                "re_password": "NewPassword2"
            }
            """
        And the response status code should be 200
        And the response body should be empty
        And I send a POST request to "/api/user/auth/login" with body:
            """
            {
                "email": "restore@test.com",
                "password": "NewPassword2"
            }
            """
        And the response status code should be 200
