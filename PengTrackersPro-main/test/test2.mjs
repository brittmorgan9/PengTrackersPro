import { Builder, By, Key, until } from 'selenium-webdriver';
import 'chromedriver'
import { expect } from 'chai';

describe('DefaultTest', function() {
    let driver;
    this.timeout(30000);  // This will give 30 seconds to the before hook

    // Setup the driver before each test
    before(async function() {
        console.log('Initializing WebDriver...');
        try {
            // Increase timeout for the before hook (e.g., 30 seconds)

            driver = await new Builder().forBrowser('chrome').build();
            // Set the global timeouts
            await driver.manage().setTimeouts({
                implicit: 10000,  // Implicit wait for 10 seconds
                pageLoad: 30000,  // Page load timeout (in ms)
                script: 20000     // Script timeout (in ms)
            });
            console.log('WebDriver initialized successfully.');
            console.log('Timeouts set.');
        } catch (error) {
            console.error('Error initializing WebDriver:', error);
            throw error;
        }
    });

    it('should go to localhost and try to login with wrong credentials', async () => {
        await driver.get('http://localhost:3001/');
        await driver.wait(until.elementLocated(By.id('show_login_modal_button')), 10000);

        const loginButton = await driver.findElement(By.id('show_login_modal_button'));
        await loginButton.click();

        const usernameField = await driver.findElement(By.id('login_username_field'));
        const passwordField = await driver.findElement(By.id('login_password_field'));

        //TEST WRONG LOGIN
        await driver.wait(until.elementIsVisible(usernameField), 5000);
        await driver.wait(until.elementIsEnabled(passwordField), 5000);
        await usernameField.clear()
        await passwordField.clear() 
        await usernameField.sendKeys('testguy');
        await passwordField.sendKeys('password', Key.ENTER);

        // Wait for the alert to be present
        var alert = await driver.wait(until.alertIsPresent(), 5000);
        console.log("Wrong login details test passed!")
        // Optionally, accept the alert to proceed
        await alert.accept();

        //TEST TOO SHORT USERNAME
        await driver.wait(until.elementIsVisible(usernameField), 5000);
        await driver.wait(until.elementIsEnabled(passwordField), 5000);
        await usernameField.clear()        
        await passwordField.clear() 
        await usernameField.sendKeys('abc');
        await passwordField.sendKeys('password', Key.ENTER);

        // Wait for the alert to be present
        var alert = await driver.wait(until.alertIsPresent(), 5000);
        console.log("Too short username test passed!")
        // Optionally, accept the alert to proceed
        await alert.accept();
        

        //TOO SHORT PASSWORD TEST
        await driver.wait(until.elementIsVisible(usernameField), 5000);
        await driver.wait(until.elementIsEnabled(passwordField), 5000);
        await usernameField.clear()        
        await passwordField.clear() 
        await usernameField.sendKeys('username');
        await passwordField.sendKeys('abc', Key.ENTER);

        // Wait for the alert to be present
        var alert = await driver.wait(until.alertIsPresent(), 5000);
        console.log("Too short password test passed!")
        // Optionally, accept the alert to proceed
        await alert.accept();
        

        //CORRECT LOGIN TEST
        await driver.wait(until.elementIsVisible(usernameField), 5000);
        await driver.wait(until.elementIsEnabled(passwordField), 5000);
        await usernameField.clear()        
        await passwordField.clear() 
        await usernameField.sendKeys('testuser');
        await passwordField.sendKeys('password', Key.ENTER);

        await driver.wait(until.urlIs('http://localhost:3001/home'), 10000);

        const url = await driver.getCurrentUrl();
        expect(url).to.equal('http://localhost:3001/home');

        console.log("Correct login passed!")

        setInterval(()=>{driver.quit()}, 5000)
    });

    // Cleanup after tests
    after(async () => {
        console.log('Quitting WebDriver...');
        await driver.quit();
        console.log('WebDriver quit.');
    });
});
