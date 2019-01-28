/**
 * Created by CuncheWang on 2018/12/13.
 */

var HashMap = require('../common/HashMap');

//=================================================================
//              register response json data
//=================================================================
var isFirstRegister = true;

var registerResponsePlainData = {
    "code":"0000",
    "message":"success",
    "data":{
        "mid":"",
        "tid":""
    }
};

exports.getThaiQRRegisterResponseJson = function (tid, mid) {
    if (isFirstRegister) {
        isFirstRegister = false;
        registerResponsePlainData.mid = mid;
        registerResponsePlainData.tid = tid;
        return registerResponsePlainData;
    } else {
        return {
            "code":"200",
            "message":"Terminal has been registered."
        }
    }
};

//=================================================================
//              inquiry response json data
//=================================================================
// hash map to save trans record, key is qr code reference1.
var thaiQRTransRecordMap = new HashMap.HashMap();

function responseJson() {
    var inquiryResponsePlainData = {
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

    inquiryResponsePlainData.data[0].billPaymentRef1 = "";
    inquiryResponsePlainData.data[0].billPaymentRef2 = "";
    inquiryResponsePlainData.data[0].billPaymentRef3 = "";
    inquiryResponsePlainData.data[0].amount = "2.34";
    inquiryResponsePlainData.data[0].currencyCode = "0740";
    inquiryResponsePlainData.data[0].payeeProxyId = "010554812224911";
    inquiryResponsePlainData.data[0].payeeProxyType = "BILLERID";
    inquiryResponsePlainData.data[0].payeeAccountNumber = "";
    inquiryResponsePlainData.data[0].payerProxyId = "";
    inquiryResponsePlainData.data[0].payerProxyType = "";
    inquiryResponsePlainData.data[0].payerAccountNumber = "1114965677";
    inquiryResponsePlainData.data[0].sendingBankCode = "014";
    inquiryResponsePlainData.data[0].receivingBankCode = "014";
    inquiryResponsePlainData.data[0].transactionId = "2550eab8ffc875324eabbd6e3a28e2ad";
    inquiryResponsePlainData.data[0].fastEasySlipNumber = "";
    inquiryResponsePlainData.data[0].transactionDateandTime = "2017-11-17T18:53:22.000+07:00";
    inquiryResponsePlainData.data[0].thaiQRTag = "";
    inquiryResponsePlainData.data[0].merchantId = "";
    inquiryResponsePlainData.data[0].merchantPAN = "";
    inquiryResponsePlainData.data[0].consumerPAN = "";
    inquiryResponsePlainData.data[0].confirmId = "18021903191915389340";

    return inquiryResponsePlainData;
}

exports.inquiryTransByQrcode = function (reference1, reference2, reference3, mid) {
    var qrcode = reference1;
    console.log("inquiry key=" + qrcode);
    console.log(thaiQRTransRecordMap.containsKey(qrcode));
    console.log(thaiQRTransRecordMap.keys());
    if (thaiQRTransRecordMap.containsKey(qrcode)) {
        var inquiryResponsePlainData = thaiQRTransRecordMap.get(qrcode);
        inquiryResponsePlainData.data[0].billPaymentRef1 = reference1;
        inquiryResponsePlainData.data[0].billPaymentRef2 = reference2;
        inquiryResponsePlainData.data[0].billPaymentRef3 = reference3;
        inquiryResponsePlainData.data[0].merchantId = mid;
        return inquiryResponsePlainData;
    } else {
        return {
            "code":"1000",
            "message":"Trans record not found."
        }
    }
};

exports.setThaiQRTransData = function (qrcode, amount, transId) {
    // How to get reference1 , please ref QR PromptPay docment.
    var ref1StartIndex = 6 + 6 + 2 + 20 + 19 + 6;
    var refrence1 = qrcode.substr(ref1StartIndex, 20);
    console.log("setThaiQRTransData refrence1=[%s]", refrence1);

    var inquiryResponsePlainData = responseJson();
    inquiryResponsePlainData.data[0].amount = amount;
    inquiryResponsePlainData.data[0].transactionId = transId;
    thaiQRTransRecordMap.put(refrence1, inquiryResponsePlainData);
    console.log(thaiQRTransRecordMap.keys());
};
function responsePullInquiryJson() {
    console.log("responsePlainData=[%s]", "kd;lfk");
    var inquiryResponsePlainData = {
        "res_code": "0000",
        "res_desc": "success",
        "data": [
            {
                "payeeProxyId": "311040039475100",
                "payeeProxyType": "BILLERID",
                "payeeAccountNumber": "0141111111111",
                "payerProxyId": null,
                "payerProxyType": "BANKAC",
                "payerAccountNumber": "xxxx-xx641-3",
                "sendingBankCode": "014",
                "receivingBankCode": "014",
                "amount": "2.0100",
                "transactionId": "71700057055273000044",
                "fastEasySlipNumber": null,
                "transactionDateandTime": "2018-11-23T07:48:31.000+00:00",
                "billPaymentRef1": "71700057055273000044",
                "billPaymentRef2": "",
                "billPaymentRef3": "AIN71700057",
                "thaiQRTag": null,
                "currencyCode": "764",
                "paymentMethod": "BILLERID",
                "transactionType": null
            }
        ]
    };
    console.log("responsePlainData=[%s]", JSON.stringify(inquiryResponsePlainData));
    inquiryResponsePlainData.data[0].billPaymentRef1 = "";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].billPaymentRef1);
    inquiryResponsePlainData.data[0].billPaymentRef2 = "";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].billPaymentRef2);
    inquiryResponsePlainData.data[0].billPaymentRef3 = "";
    console.log("responsePlainData=[%s]",   inquiryResponsePlainData.data[0].billPaymentRef3);
    inquiryResponsePlainData.data[0].amount = "2.34";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].amount);
    inquiryResponsePlainData.data[0].currencyCode = "0740";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].currencyCode);
    inquiryResponsePlainData.data[0].payeeProxyId = "311040039475100";
    console.log("responsePlainData=[%s]", "kd;lfk");
    inquiryResponsePlainData.data[0].payeeProxyType = "BILLERID";
    console.log("responsePlainData=[%s]", inquiryResponsePlainData.data[0].payeeProxyType);
    inquiryResponsePlainData.data[0].payeeAccountNumber = "";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].payeeAccountNumber);
    inquiryResponsePlainData.data[0].payerProxyId = "";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].payerProxyId);
    inquiryResponsePlainData.data[0].payerProxyType = "";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].payerProxyType);
    inquiryResponsePlainData.data[0].payerAccountNumber = "1114965677";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].payerAccountNumber);
    inquiryResponsePlainData.data[0].sendingBankCode = "014";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].sendingBankCode);
    inquiryResponsePlainData.data[0].receivingBankCode = "014";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].receivingBankCode);
    inquiryResponsePlainData.data[0].transactionId = "2550eab8ffc875324eabbd6e3a28e2ad";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].transactionId);
    inquiryResponsePlainData.data[0].fastEasySlipNumber = "";
    console.log("responsePlainData=[%s]",  inquiryResponsePlainData.data[0].fastEasySlipNumber);
    inquiryResponsePlainData.data[0].transactionDateandTime = "2017-11-17T18:53:22.000+07:00";
    console.log("responsePlainData=[%s]", inquiryResponsePlainData.data[0].transactionDateandTime);
    inquiryResponsePlainData.data[0].thaiQRTag = "";
    console.log("responsePlainData=[%s]", inquiryResponsePlainData.data[0].transactionDateandTime);
    console.log("responsePlainData=[%s]", inquiryResponsePlainData);
    return inquiryResponsePlainData;
}
/*
*    var mid = data.mid;
 var tid = data.tid;
 var transRef = data.transRef;
 var sendingBank = data.sendingBank;
 var reference1 = data.reference1;
 var reference2 = data.reference2;
 var reference3 = data.reference3;
* */
exports.getPullInquiryTransData = function (mid,tid,transRef,sendingBank,reference1, reference2, reference3) {
    // How to get reference1 , please ref QR PromptPay docment.
    console.log("mid=" + mid+ tid+ transRef+ sendingBank+ reference1);
    var inquiryResponsePlainData = responsePullInquiryJson();
    console.log("mid=" + mid+ tid+ transRef+ sendingBank+ reference1);
    inquiryResponsePlainData.data[0].transactionId = transRef;
    inquiryResponsePlainData.data[0].billPaymentRef1 = reference1;
    inquiryResponsePlainData.data[0].billPaymentRef2 = reference2;
    inquiryResponsePlainData.data[0].billPaymentRef3 = reference3;
    inquiryResponsePlainData.data[0].sendingBankCode = sendingBank;
    console.log("responsePlainData=[%s]", JSON.stringify(inquiryResponsePlainData));
    return inquiryResponsePlainData;
};

