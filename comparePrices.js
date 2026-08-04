const fs = require('fs');

const current = JSON.parse(
    fs.readFileSync('laptop.json', 'utf8')
);

const products = current.products;

const oldProducts = [
    {
        title: current[0].title,
        price: '₹80,000'
    }
];

current.forEach(product => {

    const old = oldProducts.find(
        p => p.title === product.title
    );

    if(old) {

        const oldPrice = Number (
            old.price.replace(/[₹,]/g, '')
        );

        const newPrice = Number (
            product.price.replace(/[₹,]/g,'')
        );

        const difference = oldPrice - newPrice;

        if (newPrice < oldPrice) {
            console.log(`Price dropped!`);
            console.log(`old: ₹${oldPrice}`);
            console.log(`New: ₹${newPrice}`);
            console.log(`Saved: ₹${difference}`)
        } else {
            console.log('No price drop.');
        }
    }
});