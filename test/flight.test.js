const driver = require("../driverSettings/chrome");
const config = require("config");
const url = config.get("url");
const MainGrid = require("./../pages/mainGrid.page");
const FlightsPage = require("./../pages/flights.page");
const SearchPage = require("./../pages/search.page");
const ResultPage = require("./../pages/result.page");

describe('Found flights in orbitz.com', () => {

    beforeEach(async () => {
        jest.setTimeout(80000);
        await driver.get(`${url}`);
        await driver.manage().window().setRect({ height: 1056, width: 1936, x: -8, y: -8 });
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('E2E test to check flights for multiply countries', async () => {
        await MainGrid.clickFlightsButton();
        await FlightsPage.waitForMulticityButton();
        await FlightsPage.clickMulticityButton();

        const cityA = "New York (NYC-All Airports)";
        await FlightsPage.setFlyingFromFirst(cityA);

        const cityB = "Washington (WAS-All Airports)";
        await FlightsPage.setFlyingToFirst(cityB);

        const date1 = '10/02/2020';
        await FlightsPage.setFirstFlightDate(date1);
        await FlightsPage.setTwoAdultsAndTwoChildrenWithAge();

        await FlightsPage.setFlyingFromSecond(cityB);
        const cityC = "San Diego (SAN-All Airports)";
        await FlightsPage.setFlyingToSecond(cityC);

        const date2 = '10/10/2020';
        await FlightsPage.setSecondFlightDate(date2);
        const date3 = '10/14/2020';
        await FlightsPage.addThirdFlightWithDate(cityC, cityA, date3);

        await FlightsPage.clickSearchButton();
        const numberOfFlights = await FlightsPage.getResults();
        const lowestPrice = await FlightsPage.getLowestPriceResult();
        console.log(`Found ${numberOfFlights} available flights`);
        console.log(`Lowest price is ${lowestPrice}`);

        await SearchPage.selectAllFlightWithNoCost(3);
        await SearchPage.switchToNewTab();

        const getAllCities = await ResultPage.getAllLocationByCountOfFlyght(2);
        const expectedCities = {
            'New York (JFK)': 'Baltimore (BWI)',
            'Baltimore (BWI)': 'San Diego (SAN)',
            'San Diego (SAN)': 'New York (JFK)'
        };
        expect(getAllCities).toStrictEqual(expectedCities);
    });
});



