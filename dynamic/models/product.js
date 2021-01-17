
const fs = require('fs');

const path = require('path');

const rootDir = require('../util/path');


const dataFile = path.join(
    rootDir,
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(dataFile, (err, fileContent) => {
        if (err) {
            cb([]);
        } else
            cb(JSON.parse(fileContent));
    });


};

module.exports = class Product {
    constructor(title, imgUrl, price, description) {
        this.id = Math.random().toString()
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;

    }

    save() {
        // products.push(this)

        // fs.readFile(dataFile, (err, fileContent) => {

        //     // console.log(fileContent);

        //     console.log(err);

        //     let products = [];

        //     if (!err) {
        //         products = JSON.parse(fileContent);
        //     }

        //     products.push(this);

        //     fs.writeFile(dataFile, JSON.stringify(products), (err) => {
        //         console.log(err);
        //     })

        // });


        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(dataFile, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })

    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}