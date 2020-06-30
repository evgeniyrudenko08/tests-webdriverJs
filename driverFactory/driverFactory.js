const config = require("config");
const browser = require('./availableBrowsers.enum');
const getChromeDriver = require('../driverSettings/chrome');

class DriverFactory { 
    constructor(browserName) {
        this._browser = browserName;
      }
    getDriver() {
        let driver;
        switch(this._browser) {
            case browser.CHROME:
                driver = getChromeDriver();  
                break;
        
            default:
                throw new Error (`Browser "${this._browser}" is not available`);
        }
        return driver;
    }
}
const driver = new DriverFactory(config.get("browserName")).getDriver();
module.exports = driver;
