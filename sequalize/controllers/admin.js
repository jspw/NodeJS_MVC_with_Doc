const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
 
  req.user.getProducts()
  .then((products) => {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      prods: products,
      path: '/admin/products'
    });

  }).catch(error => console.log(error));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    // userId :req.user.id
  }).then(result => {
    return res.redirect('/admin/products');
  }).catch(err => console.log(err));

};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId.toString();
  Product.findAll({
    where: {
      id: prodId,
    }
  }).then(product => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      product: product[0],
      path: '/products',
    });
  }).catch((error => console.log(error)));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findAll({
    where: {
      id: prodId,
    }
  }).then(product => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
    });
  }).catch((error => console.log(error)));

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;


  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    }).then(result => {
      console.log("Product Updated");
      res.redirect('/admin/products');
    }).catch(error => console.log(error));


};

exports.postDeleteProduct = (req, res, next) => {

  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then(
      product => product.destroy()
    )
    .then(result => res.redirect('/admin/products'))
    .catch(error => console.log(error));

};