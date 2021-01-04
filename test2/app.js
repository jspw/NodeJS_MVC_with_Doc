const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log("Into the midleware!");
//     // console.log(next.arguments);
//     next(); // this allows the request to  next middleware!
// });

// app.use('/shit', (req, res, next) => {
//     res.send("Only Shit");
// });

// app.use('/', (req, res, next) => {
//     console.log("Another middleware!");
//     res.send("holy shit");
//     // next();
// })

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));



// app.use('/product', (req, res, next) => {

//     console.log(req.body);

//     // res.send(req.body['title']);

//     res.redirect('/');

// });


const path = require('path');

const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use((req, res, next) => {
    // res.status(404).send("<h1>Page not fount</h1>");

    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));

});



app.listen(3000, () => {
    console.log('Server started on port');
});