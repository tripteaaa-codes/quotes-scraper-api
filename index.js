const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapePage(url) {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const quotes = [];

    $('.quote').each((i, el) => {
        quotes.push({
            quote: $(el).find('.text').text(),
            author: $(el).find('.author').text()
        });
    });

    return quotes;
}

async function scrapeAllPages() {
    let allQuotes = [];

    for (let page = 1; page <= 3; page++) {
        const url = `https://quotes.toscrape.com/page/${page}/`;

        console.log(`Scraping page ${page}...`);

        const quotes = await scrapePage(url);

        allQuotes = allQuotes.concat(quotes);
    }

    fs.writeFileSync(
        "quotes.json",
        JSON.stringify(allQuotes, null, 2),
        'utf-8'
    );

    console.log(`Saved ${allQuotes.length} quotes`);
}

scrapeAllPages();

// const axios = require('axios');
// const cheerio = require('cheerio');

// async function scrapeBooks() {
//     const { data } = await axios.get('https://books.toscrape.com');

//     const $ = cheerio.load(data);

//     $('article.product_pod h3 a').each((i, el) => {
//         console.log(`${i + 1}. ${$(el).attr('title')}`);
//     });
// }

// scrapeBooks();