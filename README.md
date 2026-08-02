# Quotes Scraper API

A simple web scraping project built with **Node.js**, **Express**, **Axios**, and **Cheerio**.

## Features

- Scrapes quotes from `https://quotes.toscrape.com`
- Extracts quote text and author names
- Saves data to `quotes.json`
- Serves the scraped data through a REST API

## Tech Stack

- Node.js
- Express
- Axios
- Cheerio

## Installation

```bash
npm install
```

## Run the Scraper

```bash
node index.js
```

This creates `quotes.json`.

## Start the API

```bash
node server.js
```

Server runs at:

```txt
http://localhost:3000
```

## API Endpoint

### Get all quotes

```http
GET /quotes
```

Example:

```txt
http://localhost:3000/quotes
```
