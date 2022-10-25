Feature: Verify Forgot Password Code
    In order to verify the forgot password code to restore the user password
    As registered user
    I want to verify my code

    Scenario: A valid forgot password code
        Given I send a GET request to "/user/auth/password/verify-code?code=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0b3JlX3Bhc3N3b3JkIjp0cnVlLCJ1c2VyIjoiYmZkZGM2ZjYtNDQ1ZC00Y2FiLWE3YTQtNDM1Yjk3MDlhZjRhIiwiaWF0IjoxNjY2NzI4MzcyfQ.wt8PjFpR7ZX5-eLjqCBU5XWKWhn0o1p9XEUZJyocveM"
        Then the response status code should be 200
        And the response body should be empty
    
    Scenario: A invalid forgot password code
        Given I send a GET request to "/user/auth/password/verify-code?code=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        Then the response status code should be 400
        And the response body should have an error message