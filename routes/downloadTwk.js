var express = require('express');
var router = express.Router();
var db = require('../data/db');
var rsa = require('../common/rsa');
var fs = require('fs');

router.post('/', function (req, res, next) {
    console.log("=======================TWK=========================")
    console.log(req.body);
    var vendor_id = req.body.vendor_id;
    var tid = req.body.tid;
    var key_index = req.body.key_index;
    console.log("vendor_id=" + vendor_id);
    console.log("tid=" + tid);
    console.log("key_index=" + key_index);

    var encryptedTwk = db.getEncryptedTwkByTid(tid);
    res.send({code:'000', message:'SUCCESS', data:{key:encryptedTwk, key_index:db.getEncryptedTwkIndexByTid(tid), kcv:'null'}});
});

module.exports = router;
