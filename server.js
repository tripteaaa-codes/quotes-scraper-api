const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

function getQuotes() {
    return JSON.parse(
        fs.readFileSync('quotes.json', 'utf8')
    );
}

function getBooks() {
    return JSON.parse(
        fs.readFileSync('all-books.json', 'utf8')
    );
}

app.get('/quotes', (req, res) => {
    res.json(getQuotes());
});

app.get('/search', (req, res) => {
    const author = req.query.author;

    if (!author) {
        return res.status(400).json({
            message: 'Please provide an author name'
        });
    }

    const results = getQuotes().filter(q =>
        q.author.toLowerCase().includes(author.toLowerCase())
    );

    res.json(results);
});

app.get('/random', (req, res) => {
    const quotes = getQuotes();
    const randomIndex = Math.floor(Math.random() * quotes.length);

    res.json(quotes[randomIndex]);
});

app.get('/books', (req, res) => {
    res.json(getBooks());
});

app.get('/books/expensive', (req, res) => {
    const expensive = getBooks().filter(book => book.price > 50);

    res.json(expensive);
});


app.get('/books/search', (req, res) => {
    const title = req.query.title;

    if(!title) {
        return res.status(400).json({
            message: 'Please provide a book title'
        });
    }

    const results = getBooks().filter(book =>
        book.title.toLowerCase().includes(title.toLowerCase())
    );

    res.json(results);
});
app.get('/books/stats', (req, res) => {
    const books = getBooks();

    const prices = books.map(book => book.price);

    const average = 
        prices.reduce((sum, price) => sum + price, 0) / prices.length;

    res.json({
        totalBooks: books.length,
        cheapestBooks: Math.min(...prices),
        mostExpensiveBooks: Math.max(...prices),
        averagePrice: (average.toFixed(2))
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});