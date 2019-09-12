var express = require('express');
var router = express.Router();
var db = require('../data/db');
var rsa = require('../common/rsa');
var fs = require('fs');

router.post('/', function (req, res, next) {
    console.log("=======================TMK=========================")
    console.log(req.body);
    var vendor_id = req.body.vendor_id;
    var tid = req.body.tid;
    var dataBase64 = req.body.data;
    console.log("vendor_id=" + vendor_id);
    console.log("tid=" + tid);
    console.log("data=" + dataBase64);

    if (tid.length != 8) {
        res.send({code:'101', message:'Tid len must be 8'});
        return;
    }

    var key = fs.readFileSync("./privkey.pem").toString('utf8');
    console.log("key =[%s]", key);
    var tek = rsa.RsaDecryptFunc(dataBase64, key);
    console.log("tek =[%s]", tek.toString('hex'));

    db.setTek(tid, tek,function () {
        db.getEncryptedTmkByTid(tid,function (encryptedTmk) {
            console.log("response",{code:'000', message:'SUCCESS', data:{key:encryptedTmk, key_index:db.getEncryptedTmkIndexByTid(tid), kcv:'null'}});
            res.send({code:'000', message:'SUCCESS', data:{key:encryptedTmk, key_index:db.getEncryptedTmkIndexByTid(tid), kcv:'null'}});
        });
    })
});

/* GET users listing. */
router.post('/loadTmk', function(req, res, next) {
  console.log("%s", req)
  res.send('respond w resource');
});

module.exports = router;
