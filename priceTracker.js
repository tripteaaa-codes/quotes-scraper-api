const { chromium } = require('playwright');
const fs = require('fs');

(async () => {

    const browser = await chromium.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();

    await page.goto('https://www.amazon.in');

    await page.fill('#twotabsearchtextbox', 'laptop');

    await page.click('#nav-search-submit-button');

    await page.waitForSelector('[data-component-type="s-search-result"]');

    await page.waitForTimeout(5000);

    const products = await page.$$eval(
        '[data-component-type="s-search-result"]',
        items => items.slice(0, 5).map(item => {

            const title =
                item.querySelector('h2 span')?.innerText || 'No title';

            const priceElement =
                item.querySelector('.a-price .a-offscreen') ||
                item.querySelector('.a-price-whole') ||
                item.querySelector('span.a-price');

            const price = priceElement
                ? priceElement.textContent.trim()
                : 'No price';

            return { title, price };
        })
    );

    console.log('\nTop 5 laptop results:\n');

    products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.title}`);
        console.log(`Price: ${product.price}`);
        console.log('---------------------------');
    });

    const data = {
        search: 'laptop',
        searchedAt: new Date().toISOString(),
        totalProducts: products.length,
        products
    };

    fs.writeFileSync(
        'laptop.json',
        JSON.stringify(products, null, 2),
        'utf8'
    );

    console.log('\nData saved to laptop.json');

    await browser.close();

})();