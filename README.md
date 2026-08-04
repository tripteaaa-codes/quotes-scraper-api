# Amazon Laptop Price Tracker

A dynamic web scraping project built with **Node.js** and **Playwright**.

## Features

- Opens Amazon India automatically
- Searches for laptops
- Extracts product titles and prices
- Saves results to `laptops.json`
- Uses real Chrome browser automation

## Tech Stack

- Node.js
- Playwright
- JavaScript
- JSON

## Installation

```bash
npm install
npx playwright install
```

## Run

```bash
node priceTracker.js
```

## Output

The script generates:

```txt
laptops.json
```

containing the latest scraped laptop prices.

---

# Amazon Jewelry Feature Extractor

A Node.js + Playwright project that dynamically scrapes Amazon jewelry listings and extracts structured product features.

## Extracted Features

- Price
- Rating
- Jewelry Type
- Metal Type
- Gemstone Type
- Brand Name

## Tech Stack

- Node.js
- Playwright
- JavaScript
- Regular Expressions
- JSON

## Run

```bash
npm install
node jewelryTracker.js
