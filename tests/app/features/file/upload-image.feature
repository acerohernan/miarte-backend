Feature: Upload and image
    In order to upload images in our platform
    As an authenticated user
    I want to upload a file

    Scenario: A valid image (.jpg,.jpeg,.png) and (>1MB)
        Given I get the access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMWFjZmE4Zi02NTBkLTQ2MjAtYjczMi1kYWU2YzRlYmU4ODYiLCJlbWFpbCI6InJlc3RvcmUyQHRlc3QuY29tIiwiaWF0IjoxNjY2ODQ1Njc0fQ.lWEjkf3kdFs_eG03XDO9phOZPXReWxmjCX2ssLpywt8"
        Then I send an authenticated POST request to "/api/file/image/upload" with a valid image
        And the response status code should be 200
        And the response body should have the property "link"

    Scenario: A valid image (.jpg,.jpeg,.png) and (>1MB)
        Given I get the access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMWFjZmE4Zi02NTBkLTQ2MjAtYjczMi1kYWU2YzRlYmU4ODYiLCJlbWFpbCI6InJlc3RvcmUyQHRlc3QuY29tIiwiaWF0IjoxNjY2ODQ1Njc0fQ.lWEjkf3kdFs_eG03XDO9phOZPXReWxmjCX2ssLpywt8"
        Then I send an authenticated POST request to "/api/file/image/upload" with an invalid image
        And the response status code should be 400
        And the response body should have an error message