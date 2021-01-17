const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    // console.log(products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    Product.fetchAll(
        products => {
            res.render('shop/product-list', { pageTitle: 'Products', products: products, path: '/products' });
        }
    );
};

exports.getProduct = (req, res, next) => {

    Product.findById(req.params.productId, product => {
        res.render('shop/product-detail', {
            path: '',
            product: product,
            pageTitle: product.title,
        });
    });

}


exports.getIndex = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: 'Shop',
        path: '/',

    });
}


exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
    });
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout Page',
        path: '/checkout',
    });
}