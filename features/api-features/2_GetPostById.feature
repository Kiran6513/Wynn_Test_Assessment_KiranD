@api
Feature: Get the post by id from the json placeholder API

Background:
    Given API is initialized

  @smoke @regression
  Scenario: verify user is getting the valid post by passing the valid post id
    When the user send GET request to "/posts/1"
    Then the response status code should be 200
    And response body should have "userId" equal to 1
    And the response JSON should have non-empty "title" and "body" fields

  #As /posts/ also giving the valid response so unable to test with blank value so just check with null,invalid and non existing
  @regression
  Scenario Outline: verify user is not getting the valid post by passing the blank ,invalid or non existing post id
    When the user send GET request to "/posts/<postId>"
    Then the response status code should be 404
  Examples:
      | postId |
      |abc     |
      |999     |
      |  null  |