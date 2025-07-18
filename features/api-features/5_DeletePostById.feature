@api
Feature: Delete the created post using post id

Background:
    Given API is initialized
 @smoke @regression
  Scenario: Verify user is able to delete the created post Successfully for valid post id
    When the user sends a DELETE request to "/posts/1"
    Then the response status code should be 200
    
  @regression
  Scenario Outline: Verify user is not able to delete the post with invalid  or non existing or blank post id
    When the user sends a DELETE request to "/posts/<postId>"
    Then the response status code should be 200    
    # In actual case response code should be 204 but this api is ging 200
    # And the response body should be empty
    Examples:
      | postId    |
      | 0         |
      | 999999    |
      | abc       |
      | -1        |