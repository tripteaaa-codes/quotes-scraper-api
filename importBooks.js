require('dotenv').config();

const mongoose = require('mongoose');
const fs = require('fs');
const Book = require('./models/Book');

async function importBooks() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected');

        const books = JSON.parse(
                fs.readFileSync('all-books.json', 'utf-8')
        );

        await Book.deleteMany();

        await Book.insertMany(books);

        console.log(`${books.length} books imported`);

        mongoose.connection.close();
    } catch (error) {
        console.log(error.message);
    }
}

importBooks();