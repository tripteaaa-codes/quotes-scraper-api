const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/quotes', (req, res) => {
    try {
        const data = fs.readFileSync('quotes.json', 'utf8');
        const quotes = JSON.parse(data);

        res.json(quotes);

    } catch (error) {
        res.status(500).json({
            message: 'Error reading quotes file'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});