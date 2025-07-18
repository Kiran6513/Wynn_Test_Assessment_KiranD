// generate-html-report.js
const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Browser": "Chrome",
    "Platform": process.platform,
    "Executed": "Test Environment"
  }
};

reporter.generate(options);
