const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();

    await page.goto('https://www.amazon.in');

    await page.fill('#twotabsearchtextbox', 'laptop');

    await page.waitForTimeout(3000);

    const title = await page.$$eval(
        'h2 span',
        elements => elements.slice(0, 5).map(el => el.innerText)
    );

    console.log('Top 5 result:\n');

    title.forEach((title, index) =>{
        console.log(`${index + 1}. ${title}`);
    });

    await browser.close();
})();