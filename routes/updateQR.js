/**
 * Created by CuncheWang on 2018/12/10.
 */

var express = require('express');
var router = express.Router();
var dbQRCS = require('../data/QRCSDb');

var i = 0;

router.post('/', function (req, res, next) {
    if (i++ % 10 === 0) {
        console.log("=======================UpdateQR=========================")
        console.log(req.body);
    }

    var qrId = req.body.qrId;
    var qrCodeBase64 = req.body.qrCode;
    dbQRCS.setNewQrCode(qrId, qrCodeBase64);
    res.send({"code":"0000", "message":"success"});
});

module.exports = router;

