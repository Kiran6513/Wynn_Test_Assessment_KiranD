@api
Feature: Update an existing post

Background:
    Given API is initialized

@smoke @regression
Scenario: Verify user is able to update the existing post successfully using valid postid
    When the user sends a PUT request to "/posts/1" with the body "updatePostValid"
    Then the response status code should be 200
    And the response body "title" should be match from 'updatePostValid' json file
    And the response body "body" should be match from 'updatePostValid' json file
    And the response body "userId" should be match from 'updatePostValid' json file

 @regression
 Scenario Outline: Verify user is not able to update the existing post successfully using invalid, blank,non-existing postid
    When the user sends a PUT request to "/posts/<id>" with the body "updatePostValid"
    Then the response status code should be 500

    Examples:
      | id     |
      | 0      |
      | abc    |
      | -1     |
      | 99999  |