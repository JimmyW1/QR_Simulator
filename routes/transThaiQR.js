/**
 * Created by CuncheWang on 2018/12/10.
 */

var aes = require('../common/aes');
var db = require('../data/db');
var dbThaiQR = require('../data/ThaiQRDb');

exports.doPostProcessing = function (reqJson, res, next) {
    console.log("=============ThaiQR processing=================");
    var action = reqJson.action;
    console.log("action=" + action);

    if (action === 'register') {
        register(reqJson, res, next);
    } else if (action === 'inquiry') {
        inquiry(reqJson, res, next);
    }else if(action='pullslip'){
        pullInquiry(reqJson, res, next);
    }
};

function register(reqJson, res, next) {
    console.log("=============ThaiQR register=================");
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
    var responsePlainData = dbThaiQR.getThaiQRRegisterResponseJson(tid, mid);
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
    console.log("=============ThaiQR inquiry=================");
    var data = reqJson.data;

    var mid = data.mid;
    var tid = data.tid;
    var reference1 = data.reference1;
    var reference2 = data.reference2;
    var reference3 = data.reference3;

    console.log("mid=" + mid);
    console.log("tid=" + tid);
    console.log("reference1=" + reference1);
    console.log("reference2=" + reference2);
    console.log("reference3=" + reference3);

    // TODO check mid tid and so on.
    var responsePlainData = dbThaiQR.inquiryTransByQrcode(reference1, reference2, reference3, mid);
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
function pullInquiry(reqJson, res, next) {
    console.log("=============ThaiQR pullInquiry=================");
    var data = reqJson.data;

    var mid = data.mid;
    var tid = data.tid;
    var transRef = data.transRef;
    var sendingBank = data.sendingBank;
    var reference1 = data.reference1;
    var reference2 = data.reference2;
    var reference3 = data.reference3;

    console.log("mid=" + mid);
    console.log("tid=" + tid);

    console.log("transRef=" + transRef);
    console.log("sendingBank=" + sendingBank);
    console.log("reference1=" + reference1);
    console.log("reference2=" + reference2);
    console.log("reference3=" + reference3);

    // TODO check mid tid and so on.
    var responsePlainData = dbThaiQR.getPullInquiryTransData(mid,tid,transRef,sendingBank,reference1, reference2, reference3);
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