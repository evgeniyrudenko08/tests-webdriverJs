const driver = require("../driverSettings/chrome");
const { By } = require('selenium-webdriver');

module.exports = class AbstractPage {
    constructor() {
        if (new.target === AbstractPage) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    async waitForProgressBar() {
        for (let i = 0; i < 40; i++) {
            const progressBar = await driver.findElement(By.id("pi-interstitial"));
            let style = await progressBar.getAttribute("style");
            if (style === "display: none;") {
                break;
            }
            await driver.sleep(1000);
        }
    }

    async switchToNewTab() {
        for (let i = 0; i < 10; i++) {
            const allTabs = await driver.getAllWindowHandles();
            if (allTabs.length > 1) {
                await driver.sleep(1000);
                await driver.switchTo().window(allTabs[1]);
                break;
            }
        }
    }

    async findElementByJsQuery(jsPath) {
        return await driver.executeScript(`return ${jsPath}`);
    }
}
