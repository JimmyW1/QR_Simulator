/**
 * Created by wangcunche on 2018/12/23.
 */

var express = require('express');
var router = express.Router();
var url = require('url');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("======================images========================")
    var pathName = url.parse(req.url).pathname;
    console.log("pathname=" + pathName);
});

router.post('/', function(req, res, next) {
    console.log("======================images========================")
    var pathName = url.parse(req.url).pathname;
    console.log("pathname=" + pathName);
});

module.exports = router;
