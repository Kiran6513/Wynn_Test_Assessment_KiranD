// module.exports = {
//     default: `--require-module ts-node/register --require features/stepDefination/**/*.ts --format progress --format json:reports/cucumber-report.json features`
//   };

  module.exports = {
    default: {
      require: ['features/stepDefination/**/*.ts'],
      // format: ['html:reports/cucumber-report.html'],
      format:['json:reports/cucumber-report.json'],
      paths: ['features/**/*.feature'],
      requireModule: ['ts-node/register']
    }
  };
  