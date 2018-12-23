/**
 * Created by CuncheWang on 2018/12/13.
 */

//=================================================================
//              order response json data
//=================================================================
var currentQrCode = "";
var currentQrId = "";
var localIp = "";
var defaultQRId = "000000000000";
var defaultQrCode = "";

var orderResponsePlainData = {
        "code":"0000",
        "message":"SUCCESS",
        "data":{
            "payment_id":"",
            "merchant_id":"",
            "amount":"",
            "currency":"",
            "partner_transaction_id":"",
            "terminal_id":"",
            "status":"SUCCESS",
            "notify_url":null,
            "funding_source":"",
            "qr_code":"",
            "transaction_ref":"2018010521001004420565690804",
            "acquirer":""
        }
    };
    orderResponsePlainData.data.payment_id = "18011107120791427930019489293098";
    // orderResponsePlainData.data.merchant_id = mid;
    // orderResponsePlainData.data.amount = amount;
    // orderResponsePlainData.data.currency = currency;
    // orderResponsePlainData.data.partner_transaction_id = partner_transaction_id;
    // orderResponsePlainData.data.terminal_id = tid;
    // orderResponsePlainData.data.notify_url = notify_url;
    // orderResponsePlainData.data.funding_source = funding_source;
    orderResponsePlainData.data.qr_code = "";
    // orderResponsePlainData.data.acquirer = acquirer;

exports.setNewQrCode = function (qrId, qrcodeBase64, localIp) {
    currentQrId = qrId;
    currentQrCode = qrcodeBase64;
};

exports.setLocalIp = function (ip) {
    localIp = ip;
}
