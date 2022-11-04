Feature: Update User Information
    In order to have update the user information in the platfomr
    As an authenticated user
    I want to update my user information

    Scenario: A valid user information request
        Given I send a POST request to "/api/user/auth/signup" with body:
            """
            {
                "email": "put@test.com",
                "password": "Password1",
                "username": "putuser"
            }
            """
        Then I send a POST request to "/api/user/auth/login" with body:
            """
            {
                "email": "put@test.com",
                "password": "Password1"
            }
            """
        And the response body should have an access token
        And I send an authenticated PUT request to "/api/user/information" with body:
            """
            {
                "name": "First Name",
                "surname": "Last Name",
                "description": null,
                "copyright_name": "copyname",
                "copyright_url": null,
                "banner_url": null,
                "profile_url": null,
                "send_special_offers": false,
                "visible_real_name": true,
                "show_age_in_profile": false,
                "show_city_and_country_in_profile": false,
                "allow_users_message_me": true,
                "marketing_off_site": false
            }
            """
        And the response status code should be 200
        And the response body should be empty