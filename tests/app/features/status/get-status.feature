Feature: Get status
    In order to get the status of the server

    Scenario: Avaible request
        Given I send a GET request to "/api/status"
        Then the response status code should be 200
        And the response body should be empty