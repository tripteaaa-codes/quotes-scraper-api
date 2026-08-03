const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

function getQuotes() {
    const data = fs.readFileSync('quotes.json', 'utf-8');
    return JSON.parse(data);
}

app.get('/quotes', (req, res) => {
    res.json(getQuotes());
});

app.get('/search', (req, res) => {
    const author = req.query.author;

    if(!author) {
        return res.status(400).json({
            message: "please provide an author name"
        });
    }

    const quotes = getQuotes();

    const results = quotes.filter(q => 
        q.author.toLowerCase().includes(author.toLowerCase())
    );

    res.json(results);
});

app.get('/random', (req, res) => {
    const quotes = getQuotes();

    const randomIndex = Math.floor(Math.random() * quotes.length);

    res.json(quotes[randomIndex]);
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});