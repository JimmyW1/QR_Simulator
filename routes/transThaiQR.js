/**
 * Created by CuncheWang on 2018/12/10.
 */

var aes = require('../common/aes');
var db = require('../data/db');

exports.doPostProcessing = function (reqJson, res, next) {
    console.log("=============ThaiQR processing=================");
    var action = reqJson.action;
    console.log("action=" + action);

    if (action === 'register') {
        register(reqJson, res, next);
    } else if (action === 'inquiry') {
        inquiry(reqJson, res, next);
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
    var responsePlainData = {
        "code":"0000",
        "message":"success",
        "data":{
            "mid":"",
            "tid":""
        }
    };
    responsePlainData.mid = mid;
    responsePlainData.tid = tid;

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
    console.log("=============ThaiQR register=================");
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
    var responsePlainData = {
        "code": "0000",
        "message": "success",
        "data": [
            {
                "billPaymentRef1": "",
                "billPaymentRef2": "",
                "billPaymentRef3": "",
                "amount": "",
                "currencyCode": "",
                "payeeProxyId": "",
                "payeeProxyType": "",
                "payeeAccountNumber": "",
                "payerProxyId": "",
                "payerProxyType": "",
                "payerAccountNumber": "",
                "sendingBankCode": "",
                "receivingBankCode": "",
                "transactionId": "",
                "fastEasySlipNumber": "",
                "transactionDateandTime": "",
                "thaiQRTag": "",
                "merchantId": "",
                "merchantPAN": "",
                "consumerPAN": "",
                "confirmId": ""
            }
        ]
    };
    responsePlainData.data[0].billPaymentRef1 = reference1;
    responsePlainData.data[0].billPaymentRef2 = reference2;
    responsePlainData.data[0].billPaymentRef3 = reference3;
    responsePlainData.data[0].amount = "2.34";
    responsePlainData.data[0].currencyCode = "0740";
    responsePlainData.data[0].payeeProxyId = "010554812224911";
    responsePlainData.data[0].payeeProxyType = "BILLERID";
    responsePlainData.data[0].payeeAccountNumber = "";
    responsePlainData.data[0].payerProxyId = "";
    responsePlainData.data[0].payerProxyType = "";
    responsePlainData.data[0].payerAccountNumber = "1114965677";
    responsePlainData.data[0].sendingBankCode = "014";
    responsePlainData.data[0].receivingBankCode = "014";
    responsePlainData.data[0].transactionId = "2550eab8ffc875324eabbd6e3a28e2ad";
    responsePlainData.data[0].fastEasySlipNumber = "";
    responsePlainData.data[0].transactionDateandTime = "2017-11-17T18:53:22.000+07:00";
    responsePlainData.data[0].thaiQRTag = "";
    responsePlainData.data[0].merchantId = mid;
    responsePlainData.data[0].merchantPAN = "";
    responsePlainData.data[0].consumerPAN = "";
    responsePlainData.data[0].confirmId = "18021903191915389340";

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
