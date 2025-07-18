# BDD Automation Framework – Playwright + Cucumber + TypeScript

This is an end-to-end BDD automation framework for both **Web UI** and **API testing**
- [Playwright]- End-to-end testing framework
- [TypeScript] - Typed superset of JavaScript
- [Cucumber]- Behavior-Driven Development (BDD) tool
- [Node.js] - JavaScript runtime environment
- Custom HTML Reporting - For detailed test execution reports

## 📂 Project Structure

BDD-PLAYWRIGHT-UI-API-AUTOMATION/
│
├── features/ # BDD feature files
│ ├── api-features/ # API related feature files
│ ├── stepDefination/ # Step definition files (Cucumber)
        ├──apiSteps  #Steps implementations of API feature files.
        ├──hooks  #hook where pre and post step mentioned
        ├──uiSteps  #Steps implementations of UI feature files.
│ └── ui-features/ # UI related feature files
│
├── src/ # Source files (page objects, utilities, config)
│ ├── APIPageObject/ # API specific page objects
│ ├── config/ # Configuration files (environment, constants)
│ ├── UIHelper/PageObject/ # UI specific page objects
│ ├── Utils/ # Utility/helper files (browser manager, base page)
│
├── testData/ # Test data files
│
├── cucumber.js # Cucumber CLI config file
├── generate-html-report.js # Custom script for generating HTML reports
├── package.json # Project dependencies and scripts
├── package-lock.json # Dependency lock file
├── playwright.config.ts # Playwright configuration
└── tsconfig.json # TypeScript configuration

# 📦 Installation Steps
### 1. Clone or Unzip
git clone <repo-url>

### 2. Install Dependencies
cd project folder
npm install
npx playwright install

## plugin for cucumber 
1.Go to plungin in visaul studio
2.Search for cucumber/cucumber Gherkin Full Supoort
3.Install


## 🧪 Test Execution

npm run test

I have mentioned the different tags in the feature file so that if you want to run only 
ui test then mentioned @ui and for api @api and for execution on all test cases mentioned @regression
make this changes in package.json file in script section mentioed below

 "test": "cucumber-js --tags=@regression",

 ## 📊 Test Reports

### HTML Report:
After execution, an HTML report is generated in the `reports/` folder

you can open it using below command after test execution it will open the report for you which contain the list of scenarios along with there status

npm run report 

Total 27 scenario are present and out of that 1 test is failing because application is not working as expected for drag and drop functionality



## 🧪 Feature
 Feature file is wrtten in gherkin language(BDD apporach) for both UI and API in different folder 

 features/api-features
 features/ui-features


 ## 🧪 StepDefinations
 Step defination contain the implamentations of the feature files which is present in the feature folder

 ## 🧠 Cucumber Hooks

 Hooks file is important if you wanted to do the pre and post condifition setup before or after executing the testing scenario, so in hook.ts I have added code to open , close the browser attached the screenshot to the failed test cases and videos as well

 ##TestData
 Test Data folder contain files which I have uploaded into ui application 

 
## ⚙️ Customization

- API  and UI Base URLs can be stored in `config/env.ts`
- You can easily add more page objects under page obect folder for both UI and API
- New API or UI features can be added under the `features` folder


## ✅ Dependencies

- [Playwright](https://playwright.dev/)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [TypeScript](https://www.typescriptlang.org/)
- [cucumber-html-reporter]
