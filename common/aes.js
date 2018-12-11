/**
 * Created by wangcunche on 2018/12/8.
 */

var crypto = require('crypto');

exports.AesEncryptFunc = function (data, key, iv) {
    console.log("data:"+data)
    var cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    cipher.setAutoPadding(false);
    var fir = cipher.update(data, 'utf8', 'hex');
    var sec = cipher.final('hex');
    var total = fir + sec;
    var firbase64 = Buffer.from(total, 'hex').toString('base64');
    return firbase64;
};

exports.AesDecryptFunc = function (cryptedData, key, iv) {
    console.log("decrypt data=" + cryptedData)
    console.log("iv=[%s]", iv);
    var deCipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    deCipher.setAutoPadding(false);
    var dataHex = Buffer.from(cryptedData, 'base64').toString('hex');
    console.log("decrypt data hex=" + dataHex)
    var fir = deCipher.update(dataHex, 'hex', 'utf8');
    var sec = deCipher.final('utf8');
    var total = fir + sec;
    console.log("AesDecryptFunc result=" + new Buffer.from(total, 'utf8').toString('hex'));
    return total;
}

exports.AesZeroPaddingEncryptFunc = function (data, key, iv) {
    zeroPaddingData = zeroPadding(data);
    console.log("After zeroPadding, data=[" + zeroPaddingData.toString('hex') + "]")
    return this.AesEncryptFunc(zeroPaddingData, key, iv);
}

exports.AesRemoveZeroPaddingDecryptFunc = function (data, key, iv) {
    console.log("iv=[%s]", iv);
    var decryptedData = this.AesDecryptFunc(data, key, iv);
    var dataOut = removeZeroPadding(decryptedData);
    console.log("After remove zeroPadding, data=[" + dataOut.toString('hex') + "]")

    return dataOut;
}

function zeroPadding(data) {
    var finalLen = data.length;
    console.log("finalLen=" + finalLen);
    if (data.length % 16 != 0) {
        finalLen = data.length + (16 - data.length % 16);
    }
    console.log("finalLen=" + finalLen);
    var dataOut = Buffer.alloc(finalLen,'\0');
    console.log(dataOut.toString('hex'))
    new Buffer.from(data).copy(dataOut, 0, 0, data.length);
    console.log(dataOut.toString('hex'))
    return dataOut;
}

function removeZeroPadding(data) {
    for (var i = data.length - 1; i >= 0; i--) {
        console.log("data[%d] =[%s]", i, data[i])
        if (data[i] != '\0') {
            break;
        }
    }

    var dataOut = data.substring(0, i + 1);
    console.log("removeZeroPadding data=" + dataOut)
    return dataOut;
}
