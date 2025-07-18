@api
Feature: Get all the post from the json placeholder API

Background:
    Given API is initialized

  @smoke @Regression
  Scenario: verify user is able to fetch all the post 
    When the user send GET request to "/posts"
    Then the response status code should be 200
    And the response should contain a list of 100 posts
    And each post should have an id and a title

@regression
Scenario: Verify user is getting error when fetching post from invalid endpoints
     When the user send GET request to "/post"
    Then the response status code should be 404
