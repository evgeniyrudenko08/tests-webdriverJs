const AbstractPage = require("./abstract.page");
const { By } = require('selenium-webdriver');
const driver = require("../driverSettings/chrome");

class MainGrid extends AbstractPage {
    constructor() {
        super();
        this._flightButtonId = By.id("primary-header-flight");
        if (new.target === MainGrid) {
            Object.freeze(this);
        }
    }

    async clickFlightsButton() {
        await driver.findElement(this._flightButtonId).click();
    }
}

module.exports = new MainGrid();