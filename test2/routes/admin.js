const express = require('express');

const rootDir = require('../util/path');


const path = require('path');

const router = express.Router();


router.get('/add-product', (req, res, next) => {
    // res.send('<form action="/admin/product" method = "POST" > <input type="text" name = "title" > <button type="submit" >Add</button> </form>');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

});

router.post('/product', (req, res, next) => {

    console.log(req.body['title']);

    // res.send(req.body['title']);

    res.redirect('/');

});

module.exports = router;