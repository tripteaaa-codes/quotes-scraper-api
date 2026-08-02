const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeQuotes() {
    try {
        const { data } = await axios.get('https://quotes.toscrape.com');

        const $ = cheerio.load(data);

        const quotes = [];

        $('.quote').each((i, el) => {
            const quote = $(el).find('.text').text();
            const author = $(el).find('.author').text();

            quotes.push({
                id: i + 1,
                quote,
                author
            });
        });

        fs.writeFileSync(
            "quotes.json", 
            JSON.stringify(quotes, null, 2),
            'utf-8'
        );

        console.log('Quotes saved to quotes.json');

    } catch (error) {
        console.log('Error:', error.message);
    }
}

scrapeQuotes();

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