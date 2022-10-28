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
        Then I send a POST request to "/user/auth/login" with body:
            """
            {
                "email": "steps@test.com",
                "password": "Password1"
            }
            """
        And the response body should have an access token
        Then I send an authenticated GET request to "/user/steps"
        And the response status code should be 200
        And the response body should have the property "steps"

    Scenario: With an event consumed
        Given the following event is received:
            """
            {
                "data": {
                    "id": "75ca62f3-6de7-43f1-a35a-8cb9bce589c1",
                    "type": "miarte.user.event.1.user.created",
                    "occurred_on": "2022-10-28T15:22:53.231Z",
                    "aggregateId": "5458a289-e99a-4783-b8e2-942a0ffdab29",
                    "attributes": {
                        "email": "create3@test.com",
                        "password": "$2b$10$o6r1cobUxHp1yFujo/kzkOg7BVsPkoeDdxFty5SwwyUHVIsDOAhg6",
                        "username": "nuevouser",
                        "description": null,
                        "copyright_name": null,
                        "copyright_url": null,
                        "name": null,
                        "surname": null,
                        "profile_url": null,
                        "banner_url": null,
                        "visible_real_name": false,
                        "show_age_in_profile": false,
                        "show_city_and_country_in_profile": false,
                        "send_special_offers": false,
                        "allow_users_message_me": false,
                        "marketing_off_site": false
                    }
                }
            }
            """
        Then I get the access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDU4YTI4OS1lOTlhLTQ3ODMtYjhlMi05NDJhMGZmZGFiMjkiLCJlbWFpbCI6InJlc3RvcmUyMkB0ZXN0LmNvbSIsImlhdCI6MTY2Njk2ODM3M30.xSJlEocMPXJphw6q2jlYpxoQo6P-p6EnosUZYVXsI5Y"
        And I send an authenticated GET request to "/user/steps"
        And the response status code should be 200
        And the response body should have the property "steps"
