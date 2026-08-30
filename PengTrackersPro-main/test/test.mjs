import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('DefaultTest', () => {

    let driver;

    before(async ()=>{
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({
            implicit: 10000,
            pageLoad: 30000,
            script: 20000
        });
    })

    it('should go to localhost and try to login with wrong credentials', async () => {
        await driver.get('http://localhost:3000/');
        await driver.wait(until.elementLocated(By.id('show_login_modal_button')), 10000);
        await driver.findElement(By.id('show_login_modal_button')).click();
        await driver.findElement(By.id('login_username_field')).sendKeys('testguy');
        await driver.findElement(By.id('login_password_field')).sendKeys('password', Key.ENTER);
        // await driver.findElement(By.linkText('nehalist.io')).click();
        const url = await driver.getCurrentUrl()//getTitle();

        expect(url).to.equal('http://localhost:3000/home');
    });

    after(async () => {await driver.quit()});
});
