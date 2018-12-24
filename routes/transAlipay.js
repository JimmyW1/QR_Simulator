/**
 * Created by CuncheWang on 2018/12/10.
 */


var aes = require('../common/aes');
var db = require('../data/db');
var dbAlipay = require('../data/AlipayDb');

exports.doPostProcessing = function (reqJson, res, next) {
    console.log("=============Alipay processing=================");
    var action = reqJson.action;
    console.log("action=" + action);

    if (action === 'order') {
        order(reqJson, res, next);
    } else if (action === 'sale') {
        sale(reqJson, res, next);
    } else if (action === 'inquiry') {
        inquiry(reqJson, res, next);
    }else if (action==='cancel'){
        cancel(reqJson, res, next);
    }
};

function order(reqJson, res, next) {
    console.log("=============Alipay order=================");
    var data = reqJson.data;

    var mid = data.merchant_id;
    var tid = data.terminal_id;
    var partner_transaction_id = data.partner_transaction_id;
    var funding_source = data.funding_source;
    var amount = data.amount;
    var currency = data.currency;
    var notify_url = data.notify_url;
    var acquirer=data.acquirer;
    var ref1 = data.ref1;
    var ref2 = data.ref2;
    var ref3 = data.ref3;
    var ref4 = data.ref4;


    console.log("mid=" + mid);
    console.log("tid=" + tid);
    console.log("partner_transaction_id=" + partner_transaction_id);
    console.log("funding_source=" + funding_source);
    console.log("amount=" + amount);
    console.log("currency=" + currency);
    console.log("acquirer=" + acquirer);

    var responsePlainData = dbAlipay.getOrderResponseJson(tid, partner_transaction_id, amount, currency, acquirer);
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

function sale(reqJson, res, next) {
    console.log("=============Alipay sale=================");

    var data = reqJson.data;

    var mid = data.merchant_id;
    var tid = data.terminal_id;
    var partner_transaction_id = data.partner_transaction_id;
    var funding_source = data.funding_source;
    var amount = data.amount;
    var currency = data.currency;
    var auth_code=data.auth_code;

    console.log("mid=" + mid);
    console.log("tid=" + tid);
    console.log("partner_transaction_id=" + partner_transaction_id);
    console.log("funding_source=" + funding_source);
    console.log("amount=" + amount);
    console.log("currency=" + currency);
    console.log("auth_code=" + auth_code);

    // TODO check mid tid and so on.
    var responsePlainData = {
        "code":"0000",
        "message":"SUCCESS",
        "data":{
            "status":"",
            "buyer_user_id":"",
            "buyer_login_id":"",
            "amount":"",
            "amount_cny":"303",
            "currency":"THB",
            "exchange_rate":"202028",
            "payment_id":"18010508141257639318231758646279",
            "partner_transaction_id":"18010508141275824305",
            "ref_transaction_id":"2018010521001004420565690804",
            "terminal_id":"",
            "merchant_id":"",
            "funding_source":""
        }
    };
    responsePlainData.data.status = "APPROVED";
    responsePlainData.data.buyer_user_id = "2088122901560424";
    responsePlainData.data.buyer_login_id = "int*@service.*";
    responsePlainData.data.merchant_id = mid;
    responsePlainData.data.amount = amount;
    responsePlainData.data.currency = currency;
    responsePlainData.data.partner_transaction_id = partner_transaction_id;
    responsePlainData.data.terminal_id = tid;

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
    console.log("=============Alipay inquiry=================");
    var data = reqJson.data;
    var mid = data.merchant_id;
    var tid = data.terminal_id;
    var funding_source = data.funding_source;
    var payment_id = data.payment_id;
    console.log("mid=" + mid);
    console.log("tid=" + tid);
    console.log("funding_source=" + funding_source);
    console.log("payment_id=" + payment_id);
    console.log("data=" + data);

    var responsePlainData = dbAlipay.inquiryTransByPaymentId(mid, tid, payment_id, funding_source);
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

function cancel(reqJson, res, next) {
    console.log("=============Alipay cancel=================");
    var data = reqJson.data;
    /*
     * {
     "terminal_id":"7490001",
     "merchant_id":"001000000000010",
     "funding_source":"ALIPAY",
     "partner_transaction_id":"18010508141275824305",
     "paymnet_id":"18010508141257639318231758646279",
     "acquirer":"TH000"
     }
     * */
    var mid = data.merchant_id;
    var tid = data.terminal_id;
    var funding_source = data.funding_source;
    var payment_id = data.payment_id;
    var acquirer = data.acquirer;
    var partner_transaction_id = data.partner_transaction_id;
    console.log("mid=" + mid);
    console.log("tid=" + tid);
    console.log("funding_source=" + funding_source);
    console.log("payment_id=" + payment_id);
    console.log("acquirer=" + acquirer);
    console.log("partner_transaction_id=" + partner_transaction_id);
    console.log("data=" + data);

    // TODO check mid tid and so on.
    var responsePlainData = {
        "code":"0000",
        "message":"SUCCESS",
        "data":{
        "status":"VOIDED",
            "amount":"1500",
            "payment_id":"",
            "partner_transaction_id":"",
            "ref_transaction_id":"2018010521001004420565690804",
            "terminal_id":"",
            "merchant_id":"",
            "funding_source":"ALIPAY"
    }
    };
    console.log("===========1======");
    responsePlainData.data.payment_id = payment_id;
    responsePlainData.data.merchant_id = mid;
    responsePlainData.data.terminal_id = tid;
    responsePlainData.data.partner_transaction_id=partner_transaction_id;
    responsePlainData.data.funding_source = funding_source;
    console.log("===========1======");


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

