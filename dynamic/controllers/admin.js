const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {

    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};


exports.postAddProducts = (req, res, next) => {
    // console.log(req.body);
    // products.push({ title: req.body.title });
    const product = new Product(req.body.title,req.body.imgUrl,req.body.price,req.body.description);
    product.save();
    res.redirect('/');
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll(
        (products) => {
            res.render('admin/products', { pageTitle: 'Admin Products', products: products, path: '/admin/products' });
        }
    );
}