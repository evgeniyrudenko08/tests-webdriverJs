const AbstractPage = require("./abstract.page");
const { By, Key, until} = require('selenium-webdriver');
const driver = require("../driverSettings/chrome");

class FlightsPage extends AbstractPage {
    constructor() {
        super();
        this._multicityButtonId = By.id("flight-type-multi-dest-label-flp");
        this._firstFlyingFromId = By.id("flight-origin-flp");
        this._firstFlyingToId = By.id("flight-destination-flp");
        this._firstDateId = By.id("flight-departing-single-flp");
        this._secondFlyingFrom = By.id("flight-2-origin-flp");
        this._secondFlyingTo = By.id("flight-2-destination-flp");
        this._secondDateId = By.id("flight-2-departing-flp");
        this._addAnotherFlightButton = By.id("add-flight-leg-flp");
        this._searchButton = By.css("#gcw-flights-form-flp>div:nth-child(23)>label>button");
        if (new.target === FlightsPage) {
            Object.freeze(this);
        }
    }

    async waitForMulticityButton() {
        await driver.wait(until.elementLocated(this._multicityButtonId), 5000, "The multicity button is not visible");
    }

    async clickMulticityButton() {
        const multiCityButton = await driver.findElement(this._multicityButtonId);
        await multiCityButton.click();
    }

    async setFlyingFromFirst(city) {
        const cityAFrom = await driver.findElement(this._firstFlyingFromId);
        await cityAFrom.sendKeys(city);
        await cityAFrom.sendKeys(Key.TAB);
    }

    async setFlyingToFirst(city) {
        const cityBTo = await driver.findElement(this._firstFlyingToId);
        await cityBTo.sendKeys(city);
        await cityBTo.sendKeys(Key.ENTER);
    }

    async setFirstFlightDate(date) {
        const date1 = await driver.findElement(this._firstDateId);
        await driver.actions().click(date1).sendKeys(date).perform();
    }

    async setTwoAdultsAndTwoChildrenWithAge() {
        await driver.findElement(By.xpath(".//select[@id='flight-adults-flp']/option[2]")).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath(".//select[@id='flight-children-flp']/option[3]")).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath(".//select[@id='flight-age-select-1-flp']/option[3]")).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath(".//select[@id='flight-age-select-2-flp']/option[4]")).click();
    }

    async setFlyingFromSecond(city) {
        const cityBFrom = await driver.findElement(this._secondFlyingFrom);
        await cityBFrom.sendKeys(city);
        await cityBFrom.sendKeys(Key.ENTER);
    }

    async setFlyingToSecond(city) {
        const cityCTo = await driver.findElement(this._secondFlyingTo);
        await cityCTo.sendKeys(city);
        await cityCTo.sendKeys(Key.ENTER);
    }

    async setSecondFlightDate(date) {
        const date2 = await driver.findElement(this._secondDateId);
        await driver.actions().click(date2).sendKeys(date).perform();
    }

    async addThirdFlightWithDate(city1, city2, date) {
        const addAnotherFlightButton = await driver.findElement(this._addAnotherFlightButton);
        await addAnotherFlightButton.click();
        const cityCFrom = await driver.findElement(By.id("flight-3-origin-flp"));
        await cityCFrom.sendKeys(city1);
        await cityCFrom.sendKeys(Key.ENTER);
        const cityATo = await driver.findElement(By.id("flight-3-destination-flp"));
        await cityATo.sendKeys(city2);
        await cityATo.sendKeys(Key.ENTER);
        const date3 = await driver.findElement(By.id("flight-3-departing-flp"));
        await driver.actions().click(date3).sendKeys(date).perform();
    }

    async clickSearchButton() {
        await driver.findElement(this._searchButton).click();
        await this.waitForProgressBar();
    }

    async getResults() {
        const flights = await driver.findElements(By.css(`ul[id="flightModuleList"]>li`));
        return flights.length;
    }

    async getLowestPriceResult() {
        const lowestPrice = await driver.findElement(By.css(`ul[id="flightModuleList"]>li>div> div> div> div > div> div> span`));
        return await lowestPrice.getText();
    }
}

module.exports = new FlightsPage();