/**
 * Created by CuncheWang on 2018/12/10.
 */

var express = require('express');
var router = express.Router();
var dbThaiQR = require('../data/ThaiQRDb');
var dbQRCS = require('../data/QRCSDb');
var dbAlipay = require('../data/AlipayDb');
var dbWechat = require('../data/WechatDb');

router.post('/', function (req, res, next) {
    console.log("=======================Savedata=========================");
    console.log(req.body);
    var scanType = req.body.scanType;
    console.log(req.body.scanType);
    if (scanType === "ThaiQR") {
        saveThaiQRData(req, res, next);
    } else if (scanType === "QRCS") {
        saveQRCSData(req, res, next);
    } else if (scanType === "Wechat") {
        saveWechatData(req, res, next);
    } else if (scanType === "Alipay") {
        saveAlipayData(req, res, next);
    }
    console.log("=======================end============================");
    res.send({"code":"0000", "message":"success"});
});

function saveThaiQRData(req, res, next) {
    var qrCode = req.body.qrCode;
    var amount = req.body.amount;
    var transId = req.body.transid;
    dbThaiQR.setThaiQRTransData(qrCode, amount, transId);
}

function saveQRCSData(req, res, next) {
    var qrCode = req.body.qrCode;
    var amount = req.body.amount;
    var transId = req.body.transid;
    var merchantPan = req.body.merchantpan;
    var authorizeCode = req.body.authorizecode;
    dbQRCS.setQRCSTransData(qrCode, amount, transId, merchantPan, authorizeCode);
}

function saveWechatData(req, res, next) {
}

function saveAlipayData(req, res, next) {
    var qrCode = req.body.qrCode;
    dbAlipay.setAlipayTransData(qrCode);
}

module.exports = router;

// ThaiQR register
// {"action":"register","api_version":"2.0","data":{"mid":"010000000000250796","partnerCode":"AVF","terminalType":"22","tid":"A00001"},"service":"tag30","sub_vendor_id":"verifone","vendor_id":"Verifone"}
// {"vendor_id":"Verifone","tid":"A00001","key_index":"57","data":"n7BasPnuzBYQxroXnGVxMgYOUU2JHY1wJaZIYGg5aGjH0MZ69/JZGEIbsk48V5m7heREnvTMEvyM3XRRKgqMMurZhUod5cwuFbS+snwkDysrrlVIw8KokyqCxazOkgh5PUUOwnSfvw24WJVHfJ1G9irHT9nBuOroM5W1QgaZN1umSnTzvDhidey5H5UMqsPh9PttST6dkAEqvvA0Wm6iKHEcW2WyJjCvwxR1c2AiaBGXX5SpKynMx+oAzr1FQQkzDBtUN8d9L9M/f+zAEviVrA=="}

// ThaiQR inquiry
// {"action":"inquiry","api_version":"2.0","data":{"mid":"123132131","tid":"A00001","reference1":"18013007155260040607","reference2":"","reference3":"FUJFC001010000080695"},"service":"tag30","sub_vendor_id":"verifone","vendor_id":"Verifone"}
// {"vendor_id":"Verifone", "tid":"A00001", "key_index":"57", "data":"72erhdlEE6ZhbzadJnK7tB4Xw3Egk/fIzf1vEGh0TMQshtJptLzZfEqdMDvcG1lm4uW0AFREydqbVFlg7V/6mNAyAHfr/dHdhdMH6sXAKap+ZzKppbQPqY7HuGoGP8I9d+gsNnfNUw2g4uX6I01xBrs4R03KbX2aeSOygMkYphHl0aFdt/9PIoG1fDB4jJtruaYPCPb5u22KQRWlfCM+KUaOhtOfDRX1YKCZDbcO2FIvebfPqYOjIa6WoIJ05geq1W/VQ1DY7NS8RYydVnTOlneNK09GDTTWLb0+Mi0Fs0HV68bSC9RVjG/pxQw4zG5s"}

// QRCS register
// {"action":"register","api_version":"2.0","data":{"mid":"010000000000250796","partnerCode":"AVF","terminalType":"22","tid":"A00001"},"service":"qrcs","sub_vendor_id":"verifone","vendor_id":"Verifone"}
// {"vendor_id":"Verifone","tid":"A00001","key_index":"57","data":"n7BasPnuzBYQxroXnGVxMgYOUU2JHY1wJaZIYGg5aGjH0MZ69/JZGEIbsk48V5m7heREnvTMEvyM3XRRKgqMMurZhUod5cwuFbS+snwkDysrrlVIw8KokyqCxazOkgh5PUUOwnSfvw24WJVHfJ1G9irHT9nBuOroM5W1QgaZN1tjidkO/Q7ef7MLlDtx6Bo5JtmDYExWzlRdVKMfjsjTAKFVkV9JE5XlPAXZi7uWsum2UCt57SipwQTQS4oQu2xuta/Y/98EGInqAJx1jlLY9A=="}

// QRCS generate
// {"action":"generate","api_version":"2.0","data":{"mid":"010000000000250796","invoice":"123456","amount":"22","tid":"A00001"},"service":"qrcs","sub_vendor_id":"verifone","vendor_id":"Verifone"}
// {"vendor_id":"Verifone","tid":"A00001","key_index":"57","data":"wFVP9vzOstlTR408w+PMGion8Hhmk5PPMgH11R0JEomgF3xYYToxaJ1Tw/SjGOMdJ5c8+Uw/8aixqloKItAQLeaLbJhuLMouOtBYB2FEtZ6j2xw7TMqAZvHV0+5FOa4eCP4nD8103Hns90C7RVu4HoRIejza0rBukcss0XkY5lqPvPVIo8e4IvKTfskpyECXdqNW8MlV5mF+F2O33mz0Pvtht6S6uT7B+6o257vXYyxYwnd+UhGyBH5DeyncnSm1"}

// QRCS inquiry
// {"action":"inquiry","api_version":"2.0","data":{"mid":"010000000000250796","qrid":"1234567890","tid":"A00001"},"service":"qrcs","sub_vendor_id":"verifone","vendor_id":"Verifone"}
// {"vendor_id":"Verifone","tid":"A00001","key_index":"57","data":"72erhdlEE6ZhbzadJnK7tB4Xw3Egk/fIzf1vEGh0TMQshtJptLzZfEqdMDvcG1lm2YnDDIPaKyqbTV6kdEhybuTeSMiK9bsxxNyB+WBz66gEHrIamlyF1RDtPokrmagGbZR8uYT1K9lpJmTMdyocKl8fAKj6bCLJFYFCkNrS4Vpy2pljN2/bB4bKlcLiRi+gThLVzhqUVLcrWznzTFxU8Y2bdihZYq1xDibHWOEMJ8oyCUFI70cNyFiJJtaCaLGd"}
