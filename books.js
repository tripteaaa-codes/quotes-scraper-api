const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapePage(page) {
    const url = `https://books.toscrape.com/catalogue/page-${page}.html`;

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const books = [];

    $('article.product_pod').each((i, el) => {
        const title = $(el).find('h3 a').attr('title');

        const price = $(el)
            .find('.price_color')
            .text()
            .replace('£', '').trim()
            .trim();

        books.push({
            title,
            price: parseFloat(price)
        });
    });

    return books;
}

async function scrapeAllBooks() {
    let allBooks = [];

    for (let page = 1; page <= 50; page++) {
        console.log(`Scraping page ${page}...`);

        const books = await scrapePage(page);

        allBooks = allBooks.concat(books);
    }

    const expensiveBooks = allBooks.filter(book => book.price > 50);

    console.log(`Books above £50: ${expensiveBooks.length}`);

    fs.writeFileSync(
        'all-books.json',
        JSON.stringify(allBooks, null, 2),
        'utf8'
    );

    console.log(`Saved ${allBooks.length} books`);
}

scrapeAllBooks();