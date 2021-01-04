const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();


router.get('/', (req, res, next) => {
    console.log('HOme..');
    console.log(req.body);
    // res.send("<h2>Thanks for adding product!</h2>");

    res.sendFile(path.join(rootDir, 'views', 'shop.html'));

})

module.exports = router;