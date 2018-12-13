/**
 * Created by CuncheWang on 2018/12/10.
 */

var express = require('express');
var router = express.Router();
var dbQRCS = require('../data/QRCSDb');


router.post('/', function (req, res, next) {
    console.log("=======================UpdateQR=========================")
    console.log(req.body);
    var qrCodeBase64 = req.body.qrCode;
    dbQRCS.setNewQrCode(qrCodeBase64);
    res.send({"code":"0000", "message":"success"});
});

module.exports = router;

