const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {

  constructor(title, price, description, imageUrl) {

    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;

  }

  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log(error));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find().toArray()
      .then(products => {
        // console.log(products);
        return products;

      })
      .catch(error => console.log(error));

  }

  static findById(id) {
    const db = getDb();
    return db.collection('products').find({
      _id: new mongodb.ObjectID(id)
    })
      .next()
      .then(product => {
        // console.log(product);
        return product;
      })
      .catch(error => console.log(error));
  }

}

module.exports = Product;
