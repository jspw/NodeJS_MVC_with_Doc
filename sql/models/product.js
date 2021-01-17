const database = require('../util/database');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    return database.execute('INSERT INTO products (title,imageUrl,price,description)  VALUES (?,?,?,?) ', [
      this.title, this.imageUrl, this.price, this.description
    ]);

  }

  static deleteById(id) {

  }

  static fetchAll() {
    return database.execute('SELECT * FROM products');
  }

  static findById(id) {
    return database.execute("SELECT * FROM products WHERE id = ?", [id]);
  }
};
