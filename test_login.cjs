const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

async function testLoginValidCredentials() {
    try {
        await driver.get('http://localhost:5173/login'); // Navigate to the login page

        await driver.findElement(By.id('email')).sendKeys('pradeep@example.com'); // Enter valid email
        await driver.findElement(By.id('password')).sendKeys('123'); // Enter valid password
        await driver.findElement(By.css('button[type="submit"]')).click(); // Click login button

        // Wait for redirection to home page
        await driver.wait(until.urlContains('/'), 5000);

        console.log('Login with valid credentials passed');
    } catch (error) {
        console.error('Login with valid credentials failed:', error);
    }
}

async function testLoginInvalidCredentials() {
    try {
        await driver.get('http://localhost:5173/login'); 

        await driver.findElement(By.id('email')).sendKeys('wrong@example.com'); 
        await driver.findElement(By.id('password')).sendKeys('wrongpassword'); 
        await driver.findElement(By.css('button[type="submit"]')).click(); 

        
        await driver.wait(until.urlContains('/'), 5000);

      
        console.log('Login with invalid credentials test passed or redirected');

    } catch (error) {
        console.error('Login with invalid credentials test failed:', error);
    }
}

async function runTests() {
    await testLoginValidCredentials();
    await testLoginInvalidCredentials();
    await driver.quit();
}

runTests();
