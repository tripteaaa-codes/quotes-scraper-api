require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/books', async (req, res) => {
    const books = await Book.find();

    res.json(books);
});

app.get('/books/expensive', async (req, res) => {
    const books = await Book.find({
        price: { $gt: 50 }
    });

    res.json(books);
});


app.get('/books/search', async (req, res) => {
    const title = req.query.title;

    const books = await Book.find({
        title: { $regex: title, $options: 'i' }
    });

    res.json(books);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});