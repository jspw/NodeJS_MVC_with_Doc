const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// database.execute('SELECT * FROM products').
//     then((result) => {
//         console.log(result);
//     }).catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => console.log(error));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});

User.hasMany(Product);

User.hasOne(Cart);

Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });

Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);

User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });


sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        // console.log(result);
        return User.findByPk(1);

    })
    .then(user => {
        if (!user) {
            return User.create({
                username: "test",
                email: 'mh@g.com'
            });
        }

        return Promise.resolve(user);

    })
    .then(user => {
        // console.log(user);
        return user.createCart();
    }).then(cart => {
        app.listen(3001);
    })
    .catch(error => console.log(error));


