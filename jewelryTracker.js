const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();

    console.log('Opening Amazon...');

    await page.goto('https://amazon.in');

    console.log('Searching for jewelry...');

    await page.fill('#twotabsearchtextbox', 'silver pendant for women');

    await page.click('#nav-search-submit-button');

    await page.waitForSelector('[data-component-type="s-search-result"]');

    await page.waitForTimeout(4000);

    const jewelry = await page.$$eval(
        '[data-component-type="s-search-result"]',
        items => items.map(item => {

            const title =
                item.querySelector('h2 span')?.textContent?.trim() ||
                item.querySelector('a h2 span')?.textContent?.trim() ||
                item.querySelector('h2 a')?.textContent?.trim() ||
                item.querySelector('[data-cy="title-recipe"] span')?.textContent?.trim() ||
                'Not title';

            const price =
                item.querySelector('.a-price .a-offscreen')?.textContent?.trim() ||
                'No price';

            const rating =
                item.querySelector('.a-icon-alt')?.textContent?.trim() ||
                'No rating';

            const metal =
                title.match(/stainless steel|sterling silver|gold plated|silver plated|gold|silver|platinum|rose gold/i)?.[0] ||
                'Unknown';

            const gemstone =
                title.match(/diamond|zirconia|ruby|emerald|sapphire|pearl|crystal/i)?.[0] ||
                'Unknown';

            const type =
                title.match(/ring|necklace|earrings|bracelet|pendant/i)?.[0] ||
                'Unknown';

            const stopWords = [
                'Anti-Tarnish',
                'Gold-Tone',
                'Fashion',
                'Jewellary',
                'Elegant',
                'Stylish',
                'Silver',
                'Women',
                'Pendant',
                'Korean'
            ];

            let brand =
                title !== 'No title'
                    ? title.split(' ')[0]
                    : 'Unknown';

            if (stopWords.includes(brand)) {
                brand = 'Unknown';
            }

            return {
                brand,
                type,
                metal,
                gemstone,
                price,
                rating,
                title
            };
        })

            .filter(product =>
                product.title !== 'No title' &&
                product.price !== 'No price' &&
                (
                    product.type !== 'Unknown' ||
                    product.metal !== 'Unknown' ||
                    product.gemstone !== 'Unknown'
                )
            )
            .slice(0, 5)
    );

    console.log('\nExtracted Jewelry Features:\n');

    jewelry.forEach((item, index) => {
        console.log(`${index + 1}. ${item.title}`);
        console.log(`Brand: ${item.brand}`);
        console.log(`Type: ${item.type}`);
        console.log(`Metal: ${item.metal}`);
        console.log(`Gemstone: ${item.gemstone}`);
        console.log(`Price: ${item.price}`);
        console.log(`Rating: ${item.rating}`);
        console.log('----------------------------------');
    });

    fs.writeFileSync(
        'jewelry.json',
        JSON.stringify(jewelry, null, 2),
        'utf8'
    );

    console.log('\nJewelry data saved to jewelry.json');

    await browser.close();
})();

