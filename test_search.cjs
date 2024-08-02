const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

async function testSearchFunctionality() {
    try {
        await driver.get('http://localhost:5173'); 

     
        await driver.wait(until.elementLocated(By.id('inputSearch')), 10000);
        const searchInput = driver.findElement(By.id('inputSearch'));
        await searchInput.sendKeys('Inception'); 

        
        const searchButton = driver.findElement(By.css('button[type="submit"]'));
        await searchButton.click();

   
        await driver.wait(async function () {
            const results = await driver.findElements(By.css('.card'));
            return results.length > 0; 
        }, 50000); 

        
        await driver.wait(until.elementLocated(By.css('.card-wrapper')), 10000);

        const results = await driver.findElements(By.css('.card'));
        if (results.length > 0) {
            console.log('Search functionality passed. Results are displayed.');
        } else {
            console.log('Search functionality failed. No results found.');
        }
    } catch (error) {
        console.error('Search functionality test failed:', error);
    } finally {
        await driver.quit();
    }
}

testSearchFunctionality();
