const fs = require('fs');

const books = JSON.parse(
    fs.readFileSync('all-books.json', 'utf-8')
);  

console.log(`Total books: ${books.length}`);

const prices = books.map(book => book.price);

const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);

const expensiveBooks = books.find(book => book.price === maxPrice);
const cheapBooks = books.find(book => book.price === minPrice);

const average = 
    prices.reduce((sum, price) => sum + price, 0) / prices.length;

    console.log('\n Most expensive:');
    console.log(expensiveBooks);

    console.log('\n Cheapest:');
    console.log(cheapBooks);

    console.log(`\n Average price: £${average.toFixed(2)}`);