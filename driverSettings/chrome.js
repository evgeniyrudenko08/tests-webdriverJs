const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromePath = require('chromedriver').path;

function getChromeDriver() {
   const service = new chrome.ServiceBuilder(chromePath).build();
   chrome.setDefaultService(service);
   const driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
   return driver;
}

const driver = getChromeDriver();
module.exports = driver;