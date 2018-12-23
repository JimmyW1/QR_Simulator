/**
 * Created by CuncheWang on 2018/12/13.
 */

//=================================================================
//              generate response json data
//=================================================================
var currentQrCode = "";
var currentQrId = "";
var localIp = "";
var defaultQRId = "000000000000";
var defaultQrCode = "";

exports.setNewQrCode = function (qrId, qrcodeBase64, localIp) {
    currentQrId = qrId;
    currentQrCode = qrcodeBase64;
};

exports.setLocalIp = function (ip) {
    localIp = ip;
}
