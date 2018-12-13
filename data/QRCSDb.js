/**
 * Created by CuncheWang on 2018/12/13.
 */

var HashMap = require('../common/HashMap');
//=================================================================
//              register response json data
//=================================================================
var isFirstRegister = true;

var qrcsRegisterResponsePlainData = {
    "code":"0000",
    "message":"success",
    "data":{
        "mid":"",
        "tid":""
    }
};

exports.getThaiQRRegisterResponseJson = function (mid, tid) {
    if (isFirstRegister) {
        isFirstRegister = false;
        qrcsRegisterResponsePlainData.mid = mid;
        qrcsRegisterResponsePlainData.tid = tid;
        return qrcsRegisterResponsePlainData;
    } else {
        return {
            "code":"200",
            "message":"Terminal has been registered."
        }
    }
};

//=================================================================
//              generate response json data
//=================================================================
var isNotResponseGenerateRequest = false;
var currentQrCode = "";
var defaultQrCode = "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";
var qrcsGenerateResponsePlainData = {
    "code":"0000",
    "message":"success",
    "data":{
        "responseCode":"",
        "qrCodeType":"",
        "qrCodeID":"",
        "poi":"",
        "qrCode":"",
        "rawQRCode":"",
        "expiryTime":"",
        "amount":"",
        "currencyCode":"",
        "currencyName":"",
        "invoice":"",
        "merchantID":"",
        "merchantName":"",
        "terminalID":"",
        "terminalName":"",
        "channels":[
            {
                "channelCode":"MTC",
                "channelName":"MasterCard",
                "seqNo":"1"
            },
            {
                "channelCode":"VSA",
                "channelName":"VISA",
                "seqNo":"2"
            }
        ]
    }
};
qrcsGenerateResponsePlainData.data.responseCode = "000";
qrcsGenerateResponsePlainData.data.qrCodeType = "EM";
qrcsGenerateResponsePlainData.data.qrCodeID = "123456";
qrcsGenerateResponsePlainData.data.poi = "12";
qrcsGenerateResponsePlainData.data.qrCode = defaultQrCode;
qrcsGenerateResponsePlainData.data.rawQRCode = "rawQRCode";
qrcsGenerateResponsePlainData.data.expiryTime = "2018-08-14 09:52:39";
qrcsGenerateResponsePlainData.data.amount = "12.3";
qrcsGenerateResponsePlainData.data.currencyCode = "764";
qrcsGenerateResponsePlainData.data.currencyName = "Baht";
qrcsGenerateResponsePlainData.data.invoice = "123456";
qrcsGenerateResponsePlainData.data.merchantID = "1234567890";
qrcsGenerateResponsePlainData.data.merchantName = "TEST";
qrcsGenerateResponsePlainData.data.terminalID = "";
qrcsGenerateResponsePlainData.data.terminalName = "TEST";

exports.getQrcsGenerateQRResponseJson = function (tid) {
    qrcsGenerateResponsePlainData.data.terminalID = tid;
    if (currentQrCode === "") {
        qrcsGenerateResponsePlainData.data.qrCode = defaultQrCode;
    } else {
        qrcsGenerateResponsePlainData.data.qrCode = currentQrCode;
    }

    return qrcsGenerateResponsePlainData;
};

exports.setNewQrCode = function (qrcodeBase64) {
    currentQrCode = qrcodeBase64;
};

exports.getIsNotResponseGenerateRequest = function () {
    return isNotResponseGenerateRequest;
}

//=================================================================
//              inquiry response json data
//=================================================================
// hash map to save trans record, key is qr code string.
var qrcsTransRecordMap = new HashMap.HashMap();

var qrcsInquiryResponsePlainData = {
    "code":"0000",
    "message":"success",
    "data":[{
        "amount":"",
        "transactionId":"",
        "fastEasySlipNumber":"",
        "transactionDateandTime":"",
        "thaiQRTag":"",
        "merchantPAN":"",
        "consumerPAN":"",
        "currencyCode":"",
        "terminalId":"",
        "qrId":"",
        "merchantId":"",
        "traceNo":"",
        "authorizeCode":"",
        "paymentMethod":"",
        "transactionType":"",
        "typeOfCard":""
    }]
};
qrcsInquiryResponsePlainData.data[0].amount = "1.0";
qrcsInquiryResponsePlainData.data[0].transactionId = "1234567890";
qrcsInquiryResponsePlainData.data[0].fastEasySlipNumber = "123456";
qrcsInquiryResponsePlainData.data[0].transactionDateandTime = "2018-06-28T10:18:29.664+07:00";
qrcsInquiryResponsePlainData.data[0].thaiQRTag = "image_base64";
qrcsInquiryResponsePlainData.data[0].merchantPAN = "3203124558693101";
qrcsInquiryResponsePlainData.data[0].consumerPAN = "4307-12XX-XXXX-0402";
qrcsInquiryResponsePlainData.data[0].currencyCode = "764";
qrcsInquiryResponsePlainData.data[0].terminalId = "1234567890";
qrcsInquiryResponsePlainData.data[0].qrId = "1234567890";
qrcsInquiryResponsePlainData.data[0].merchantId = "1234567890";
qrcsInquiryResponsePlainData.data[0].traceNo = "123456";
qrcsInquiryResponsePlainData.data[0].authorizeCode = "123456";
qrcsInquiryResponsePlainData.data[0].paymentMethod = "QRCS";
qrcsInquiryResponsePlainData.data[0].transactionType = "AUTH";
qrcsInquiryResponsePlainData.data[0].typeOfCard = "VISA";

exports.inquiryTransByQrcode = function (qrcode) {
    if (qrcsTransRecordMap.containsKey(qrcode)) {
        return qrcsTransRecordMap.get(qrcode);
    } else {
        return {
            "code":"1000",
            "message":"Trans record not found."
        }
    }
};

exports.setQRCSTransData = function (qrcode, amount, transId, merchantPan, authorizeCode) {
    qrcsInquiryResponsePlainData.data[0].amount = amount;
    qrcsInquiryResponsePlainData.data[0].transactionId = transId;

    qrcsTransRecordMap.put(qrcode, inquiryResponsePlainData);
};
