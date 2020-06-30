const AbstractPage = require("./abstract.page");
const { By } = require('selenium-webdriver');
const driver = require("../driverSettings/chrome");

class SearchPage extends AbstractPage {
    constructor() {
        super();
        if (new.target === SearchPage) {
            Object.freeze(this);
        }
    }

    async selectAllFlightWithNoCost(count) {
        for (let i = 0; i <= count; i++) {
            await driver.sleep(1000);
            await driver.findElement(By.css(`ul[id="flightModuleList"]>li>div> div> div> div > div> button`)).click();
            await driver.findElement(By.css(`#basic-economy-tray-content-1 > div > div > div > button`)).click();
        }
    }
}

module.exports = new SearchPage();