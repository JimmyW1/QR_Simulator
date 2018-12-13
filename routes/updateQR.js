/**
 * Created by CuncheWang on 2018/12/10.
 */

var express = require('express');
var router = express.Router();
var db = require('../data/db');
var rsa = require('../common/rsa');
var fs = require('fs');
var thaiQR = require('./transThaiQR');
var qrcs = require('./transQRCS');
var wechat = require('./transWechat');
var alipay = require('./transAlipay');

var aes = require('../common/aes');

router.post('/', function (req, res, next) {
    console.log("=======================UpdateQR=========================")
    console.log(req.body);
});

module.exports = router;

