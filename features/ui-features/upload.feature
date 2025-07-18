 @ui
 Feature: UI Testing with Playwright and POM

 Background: 
      Given the user load the application
      And user is on the file upload page

@smoke @regression
Scenario: Open homepage and verify title
  Then the page title should contain "The Internet"
  And the user close the application

@smoke @regression
Scenario Outline: Verify user is able to upload the file successfully with different extension
   When the user upload the file "<fileName>"
   Then the user should see the message "File Uploaded!"
   And  the user should see the file name "<fileName>"

   Examples:
       | fileName | 
       |sample.txt|
       |sample.docx|

@smoke @regression @dragAndDrop
Scenario Outline: Verify user is able to upload the file successfully using drag and drop
   When the user upload the file "<fileName>" using drag and drop
   Then the user should see the message "File Uploaded!"
   And  the user should see the file name "<fileName>"

   Examples:
       | fileName | 
       |sample.txt|

@regression
Scenario: Verify user is getting error message when uploading without selecting file
When the user click on the upload button
Then the user should see the error message

#application should not allw to load the exe file but this api is allowing 
@regression
Scenario: User uploads a file with an invalid extension
  When the user upload the file "sample.json"
  Then the user should see the message "File Uploaded!"
   And  the user should see the file name "sample.json"

#There are more scenario for this feature but as the application is not doing working on this feature
#Scenario : Verify user is able to choose mutiple file for upload
#Scenario : Verify application should not allow file of more than 10 MB