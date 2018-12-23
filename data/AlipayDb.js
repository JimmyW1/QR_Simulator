/**
 * Created by CuncheWang on 2018/12/13.
 */

var HashMap = require('../common/HashMap');
var util = require('sprintf-js');

//=================================================================
//              order response json data
//=================================================================
var currentQrId = 0;
var currentPaymentId = 0;
var paymentIdMap = new HashMap.HashMap();
var qrCodeMap = new HashMap.HashMap();
var localIp = "";

function TransRecord(paymentId, qrCode) {
    var record = {
        paymentId: "",
        qrCode:"",
        status:""
    };

    record.paymentId = paymentId;
    record.qrCode = qrCode;
    record.status = "INIT";

    return record;
}

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

exports.getOrderResponseJson = function (tid, mid, partner_trans_id, amount, currency, acquirer) {
    console.log("====================Alipay getOrderResponseJson==============================");
    var paymentId = currentPaymentId + 1;
    currentPaymentId++;
    orderResponsePlainData.data.payment_id = util.sprintf("188%029d", paymentId);
    console.log("getOrderResponseJson paymentId=" + orderResponsePlainData.data.payment_id)
    orderResponsePlainData.data.merchant_id = mid;
    orderResponsePlainData.data.amount = amount;
    orderResponsePlainData.data.currency = currency;
    orderResponsePlainData.data.partner_transaction_id = partner_trans_id;
    orderResponsePlainData.data.terminal_id = tid;
    orderResponsePlainData.data.notify_url = "";
    orderResponsePlainData.data.funding_source = "ALIPAY";

    var qrCodeId = currentQrId + 1;
    currentQrId++;
    var qrCodeContent = "Alipay" + util.sprintf("%06d", qrCodeId);
    console.log("qrCodeContent=" + qrCodeContent);
    var qrCodeUrl = "http://" + localIp + "/images/" + qrCodeContent + ".png";
    console.log("qrCodeUrl=" + qrCodeUrl);
    orderResponsePlainData.data.qr_code = qrCodeUrl;
    orderResponsePlainData.data.acquirer = acquirer;

    var path = __dirname + "/images/" + qrCodeContent + ".png"
    generateQR(path, qrCodeContent);

    var transRecord = new TransRecord(orderResponsePlainData.data.payment_id, qrCodeContent);
    paymentIdMap.put(orderResponsePlainData.data.payment_id, transRecord);
    qrCodeMap.put(qrCodeContent, transRecord);

    return orderResponsePlainData;
};

var qr = require('qr-image')
var fs = require('fs');
var gm = require('gm');

function generateQR(path, qrCodeContent) {
    console.log("==============Alipay generate QR====================")
    try {
        // var img = qr.image(text,{size :10, type: 'png'});
        // img.pipe(fs.)
        // res.writeHead(200, {'Content-Type': 'image/png'});
        // img.pipe(res);

        var qrImage = qr.imageSync(qrCodeContent, {size:10, type:'png'});
        var tmpImagePath = __dirname + '/tmp.png';
        fs.writeFileSync(tmpImagePath, qrImage);

        gm().in('-page', '+0+0')//-page是设置图片位置，所有的图片以左上为原点，向右、向下为正
            // .in('data/images/.png')//底图，到这里第一张图就设置完了，要先设置参数，再设置图片
            .in('-resize', '350x350')//设置微信二维码图片的大小（等比缩放）
            // .in('-page', '+100+100')//设置微信二维码图片的位置
            .in(tmpImagePath)//二维码图
            .in('-page', '+145+145')//logo图位置
            .in(__dirname + '/logo/ic_alipay.png')//logo图
            .mosaic()//图片合成
            .write(path, function (err) {//图片写入
                if (!!err) {
                    console.log(err);
                } else {
                    console.log('ok');
                }});
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
}

exports.setLocalIp = function (ip) {
    localIp = ip;
}
