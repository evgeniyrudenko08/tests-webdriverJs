const AbstractPage = require("./abstract.page");
const { By, Key, until } = require('selenium-webdriver');
const driver = require("../driverSettings/chrome");

class ResultPage extends AbstractPage {
    constructor() {
        super();
        if (new.target === ResultPage) {
            Object.freeze(this);
        }
    }

    async getAllLocationByCountOfFlyght(count) {
        await driver.wait(until.urlContains("Flight-Information"), 10000, "The new page is not opened");
        let obj = {};
        for (let i = 0; i <= count; i++) {
            let jsFrom = `document.querySelector("body > main > div > div> section.flightSummaryContainer > div> div.flex-card.flex-tile.details.OD${i}> div > div > div.dateAndOD.cf > div.odPair > div:nth-child(2)")`;
            let jsTo = `document.querySelector("body > main > div > div > section.flightSummaryContainer > div> div.flex-card.flex-tile.details.OD${i}> div > div > div.dateAndOD.cf > div.odPair > div:nth-child(4)")`;
            let fromLocation = await this.findElementByJsQuery(jsFrom);
            let toLocation = await this.findElementByJsQuery(jsTo);
            let fromLocationText = await fromLocation.getText();
            let toLocationText = await toLocation.getText();
            obj[fromLocationText] = toLocationText;
        }

        return obj;
    }
}

module.exports = new ResultPage();