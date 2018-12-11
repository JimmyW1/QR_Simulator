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

    var key = fs.readFileSync("./privkey.pem").toString('utf8');
    var tek = rsa.RsaDecryptFunc(dataBase64, key);
    console.log("tek =[%s]", tek.toString('hex'));

    db.setTek(tid, tek)
    var encryptedTmk = db.getEncryptedTmkByTid(tid);

    res.send({code:'000', message:'SUCCESS', data:{key:encryptedTmk, key_index:db.getEncryptedTmkIndexByTid(tid), kcv:'null'}});
});

/* GET users listing. */
router.post('/loadTmk', function(req, res, next) {
  console.log("%s", req)
  res.send('respond w resource');
});

module.exports = router;
