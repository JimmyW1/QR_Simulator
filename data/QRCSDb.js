/**
 * Created by CuncheWang on 2018/12/13.
 */

var HashMap = require('../common/HashMap');
var qr = require('qr-image');
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

exports.getQRCSRegisterResponseJson = function (mid, tid) {
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
var currentQrId = "";
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
qrcsGenerateResponsePlainData.data.qrCodeID = "";
qrcsGenerateResponsePlainData.data.poi = "12";
qrcsGenerateResponsePlainData.data.qrCode = "";
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

    var qrContent = currentQrId + 1;
    var qrCodeBase64 = generateQRHexStr(qrContent);

    currentQrId = currentQrId + 1;
    qrcsGenerateResponsePlainData.data.qrCodeID = qrContent;
    qrcsGenerateResponsePlainData.data.qrCode = qrCodeBase64;

    return qrcsGenerateResponsePlainData;
};

exports.getIsNotResponseGenerateRequest = function () {
    return isNotResponseGenerateRequest;
}

//=================================================================
//              inquiry response json data
//=================================================================
// hash map to save trans record, key is qr code string.
var qrcsTransRecordMap = new HashMap.HashMap();

function qrcsResponseJson() {
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
    qrcsInquiryResponsePlainData.data[0].typeOfCard = "";

    return qrcsInquiryResponsePlainData;
}

exports.inquiryTransByQrcode = function (qrcode) {
    console.log(qrcsTransRecordMap.keys());
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
    var qrcsInquiryResponsePlainData = qrcsResponseJson();
    qrcsInquiryResponsePlainData.data[0].amount = amount;
    qrcsInquiryResponsePlainData.data[0].transactionId = transId;
    qrcsInquiryResponsePlainData.data[0].merchantPAN = merchantPan;
    qrcsInquiryResponsePlainData.data[0].authorizeCode = authorizeCode;

    var ramIndex = qrcode % 3;
    console.log(ramIndex);
    switch (ramIndex) {
        case 0:
            qrcsInquiryResponsePlainData.data[0].typeOfCard = "VISA";
            break
        case 1:
            qrcsInquiryResponsePlainData.data[0].typeOfCard = "MASTER";
            break
        case 2:
            qrcsInquiryResponsePlainData.data[0].typeOfCard = "UPI";
            break
        default:
            qrcsInquiryResponsePlainData.data[0].typeOfCard = "VISA";
            break
    }

    qrcsTransRecordMap.put(qrcode, qrcsInquiryResponsePlainData);
    console.log(qrcsTransRecordMap.keys());
};

function generateQRHexStr(qrCodeContent) {
    console.log("==============Alipay generate QR====================");
    try {
        // var img = qr.image(text,{size :10, type: 'png'});
        // img.pipe(fs.)
        // res.writeHead(200, {'Content-Type': 'image/png'});
        // img.pipe(res);

        var qrImage = qr.imageSync(qrCodeContent, {size:10, type:'png'});
        var qrImageBase64 = qrImage.toString('base64');
        console.log("qrImageBase64=" + qrImageBase64);
        return qrImageBase64;
        // var tmpImagePath = __dirname + '/tmp.png';
        // fs.writeFileSync(tmpImagePath, qrImage);

        // gm().in('-page', '+0+0')//-page是设置图片位置，所有的图片以左上为原点，向右、向下为正
        // // .in('data/images/.png')//底图，到这里第一张图就设置完了，要先设置参数，再设置图片
        //     .in('-resize', '350x350')//设置微信二维码图片的大小（等比缩放）
        //     // .in('-page', '+100+100')//设置微信二维码图片的位置
        //     .in(tmpImagePath)//二维码图
        //     .in('-page', '+145+145')//logo图位置
        //     .in(__dirname + '/logo/qr_card.png')//logo图
        //     .mosaic()//图片合成
        //     .write(path, function (err) {//图片写入
        //         if (!!err) {
        //             console.log(err);
        //         } else {
        //             console.log('ok');
        //         }});
    } catch (e) {
        // res.writeHead(414, {'Content-Type': 'text/html'});
        // res.end('<h1>414 Request-URI Too Large</h1>');
    }
}