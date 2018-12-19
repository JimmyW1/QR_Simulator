/**
 * Created by CuncheWang on 2018/12/10.
 */

var aes = require('../common/aes');
var db = require('../data/db');
var dbQRCS = require('../data/QRCSDb');

exports.doPostProcessing = function (reqJson, res, next) {
    console.log("=============QRCS processing=================");
    var action = reqJson.action;
    console.log("action=" + action);

    if (action === 'register') {
        register(reqJson, res, next);
    } else if (action === 'generate') {
        generate(reqJson, res, next);
    } else if (action === 'inquiry') {
        inquiry(reqJson, res, next);
    }
};

function register(reqJson, res, next) {
    console.log("=============QRCS register=================");
    var data = reqJson.data;

    var terminalType = data.terminalType;
    var mid = data.mid;
    var tid = data.tid;
    var partnerCode = data.partnerCode;

    console.log("terminalType=" + terminalType);
    console.log("mid=" + mid);
    console.log("tid=" + tid);
    console.log("partnerCode=" + partnerCode);

    // TODO check mid tid and so on.
    var responsePlainData = dbQRCS.getQRCSRegisterResponseJson(mid, tid);

    console.log("responsePlainData=[%s]", JSON.stringify(responsePlainData));
    var tidTwk = db.getPlainTwkByTid(tid);
    console.log("tidTwk=" + tidTwk);
    var responseEncryptData = aes.AesZeroPaddingEncryptFunc(JSON.stringify(responsePlainData), tidTwk, "00000000000000000000000000000000");
    var index = db.getEncryptedTwkIndexByTid(tid);

    var responseJson = {"key_index": "", "data": ""};
    responseJson.key_index = index;
    responseJson.data = responseEncryptData;
    res.send(responseJson);
}

function generate(reqJson, res, next) {
    console.log("=============QRCS generate=================");
    var data = reqJson.data;

    var mid = data.mid;
    var tid = data.tid;
    var amount = data.amount;
    var invoice = data.invoice;

    console.log("mid=" + mid);
    console.log("tid=" + tid);
    console.log("amount=" + amount);
    console.log("invoice=" + invoice);

    // TODO check mid tid and so on.
    var responsePlainData = dbQRCS.getQrcsGenerateQRResponseJson(tid);

    console.log("responsePlainData=[%s]", JSON.stringify(responsePlainData));
    var tidTwk = db.getPlainTwkByTid(tid);
    console.log("tidTwk=" + tidTwk);
    var responseEncryptData = aes.AesZeroPaddingEncryptFunc(JSON.stringify(responsePlainData), tidTwk, "00000000000000000000000000000000");
    var index = db.getEncryptedTwkIndexByTid(tid);

    var responseJson = {"key_index": "", "data": ""};
    responseJson.key_index = index;
    responseJson.data = responseEncryptData;
    res.send(responseJson);
}

function inquiry(reqJson, res, next) {
    console.log("=============QRCS inquiry=================");
    var data = reqJson.data;

    var mid = data.mid;
    var tid = data.tid;
    var qrid = data.qrid;

    console.log("mid=" + mid);
    console.log("tid=" + tid);
    console.log("qrid=" + qrid);

    // TODO check mid tid and so on.
    var responsePlainData = dbQRCS.inquiryTransByQrcode(qrid);

    console.log("responsePlainData=[%s]", JSON.stringify(responsePlainData));
    var tidTwk = db.getPlainTwkByTid(tid);
    console.log("tidTwk=" + tidTwk);
    var responseEncryptData = aes.AesZeroPaddingEncryptFunc(JSON.stringify(responsePlainData), tidTwk, "00000000000000000000000000000000");
    var index = db.getEncryptedTwkIndexByTid(tid);

    var responseJson = {"key_index": "", "data": ""};
    responseJson.key_index = index;
    responseJson.data = responseEncryptData;
    res.send(responseJson);
}
