/**
 * Created by wangcunche on 2018/12/8.
 */

var crypto = require('crypto');

exports.RsaEncryptFunc = function (data, key) {

};

exports.RsaDecryptFunc = function (encryptedData, key) {
    console.log("data len=%d", encryptedData.length)
    var decryptedData = crypto.privateDecrypt({key: key, padding:crypto.constants.RSA_PKCS1_PADDING}, Buffer.from(encryptedData, "base64"));
    return decryptedData;
};
