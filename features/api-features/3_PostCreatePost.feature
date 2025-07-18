@api
Feature: Create a new post 

Background:
    Given API is initialized

@smoke @regression
 Scenario: Verify user is able to create a new post with all valid date
    When the user send a POST request to "/posts" with body "createPostValid"
    Then the response status code should be 201
    And the response body "title" should be match from 'createPostValid' json file
    And the response body "body" should be match from 'createPostValid' json file
    And the response body "userId" should be match from 'createPostValid' json file

@regression
Scenario Outline: Verify user is unable to create a post with invalid or missing fields
When the user send a POST request to "/posts" with body "<requestBody>"
Then the response status code should be <expectedStatus>

Examples:
    | requestBody                     | expectedStatus |
    | createPostWithEmptyBody         | 201            | 
    | createPostEmptyTitle            | 201            |
    |  createPostEmptyBody            | 201            |
    | createPostMissingUserId         | 201            |
    | createPostMissingInvalidUserId  | 201            |
