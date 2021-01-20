const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      pageTitle: "Products",
      prods: products,
      path: '/products',
    });

  }).catch(error => console.log(error));
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

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      pageTitle: "Shop",
      prods: products,
      path: '/',
    });

  }).catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {

  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(cartProducts => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cartProducts: cartProducts
      });
    })
    .catch(error => console.log(error));

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  let fetchCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then(
      cart => {
        // console.log(cart);
        fetchCart = cart;
        return cart
          .getProducts({
            where: {
              id: prodId,
            }
          })
          .then(productdata => {
            let product;
            if (productdata.length > 0) {
              product = productdata[0];
            }
            if (product) {
              newQuantity = product.cartItem.quantity + 1;
            }
            return Product.findByPk(prodId);
          })
          .then(product => {
            return fetchCart.addProduct(product, {
              through: {
                quantity: newQuantity
              }
            });
          })
          .then(product => res.redirect('/cart'));
      }
    ).catch(error => console.log(error));
};

exports.postCartDeleteProduct = (req, res, next) => {

  const cartProductId = req.body.cartProductId;

  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({
        where: {
          id: cartProductId
        }
      })
    }).then(product => {

      return product[0].cartItem.destroy();

    }).then(result => {
      console.log("Cart Deleted!");
      res.redirect('/cart');

    })
    .catch(error => console.log(error));
};


exports.postOrders = (req, res, next) => {

  let fetchedcart;

  req.user
    .getCart()
    .then(cart => {
      fetchedcart = cart;
      return cart.getProducts()
    })
    .then(products => {
      // console.log(products);
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(products.map(
            product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            }
          ));
        }).catch(error => console.log(error));
    })
    .then(() => {
      return fetchedcart.setProducts(null);
    })
    .then(() => res.redirect('/orders'))
    .catch(error => console.log(error));
}

exports.getOrders = (req, res, next) => {

  req.user
    .getOrders({
      include: 'products'
    })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });

    }).catch(error => console.log(error));


};