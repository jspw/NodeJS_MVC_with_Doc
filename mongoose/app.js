const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

  // User.findById('6009cf76a05f8926f0c6cf14')
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));

  User.findOne().then(user => {
    req.user = user;
    next();
  }).catch(error => console.log(error));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://test:test123@cluster0.xu3te.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {

    console.log("Mongoose Connected to MongoDB");

    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'test',
          email: 'test@g.co',
          cart: {
            items: []
          }
        });

        user.save()
          .then(result => console.log("User Created!"))
          .catch(error => console.log(error));
      } else console.log("User already created!");
    });

    app.listen(3001);
  })
  .catch(error => console.log(error));