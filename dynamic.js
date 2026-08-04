const { chromium } = require('playwright');
const readline = require('readline');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();

    await page.goto('https://www.amazon.in');

    console.log('Page title:', await page.title());

    console.log('Press enter to close the browser...');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('', async () => {
        await browser.close();
        rl.close();
    });
})();