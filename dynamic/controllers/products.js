const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {

    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};


exports.postAddProducts = (req, res, next) => {
    // console.log(req.body);
    // products.push({ title: req.body.title });
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};


exports.getProducts = (req, res, next) => {
    // console.log(products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    Product.fetchAll(
        products => {
            res.render('shop', { pageTitle: 'Shop', products: products, path: '/' });
        }
    );


};