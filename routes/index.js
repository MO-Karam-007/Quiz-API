var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        msg: 'welcome, Follow next links to register',
        
        
    });
});

module.exports = router;
