/**
 * Created by wangcunche on 2018/12/23.
 */

var express = require('express');
var router = express.Router();
var url = require('url');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("======================images========================")
    console.log("url=" + req.originalUrl.toString());
    var url = req.originalUrl.toString();
    var imagePath = __dirname + "/../data" + url + ".png";
    console.log("imageName=" + imagePath);

    res.writeHead(200, {'Content-Type': 'image/png'});
    var fileStream = fs.createReadStream(imagePath);
    fileStream.on('data', function (data) {
        res.write(data, 'binary');
    });
    fileStream.on('end', function () {
        res.end();
    });
});

router.post('/', function(req, res, next) {
    console.log("======================images========================")
    var pathName = url.parse(req.url).pathname;
    console.log("pathname=" + pathName);
});

module.exports = router;
