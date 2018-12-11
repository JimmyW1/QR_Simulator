/**
 * Created by wangcunche on 2018/12/8.
 */

var aes = require('../common/aes');

var tid1 = "A00001";
var tid2 = "A00002";
var tid3 = "A00003";
var tid4 = "A00004";

var tid1RegisterStatus = false;
var tid2RegisterStatus = false;
var tid3RegisterStatus = false;
var tid4RegisterStatus = false;

// when tid is A0001, use below key group
var tid1Tek = "";
// terminal 1 plain tmk value, 32 bytes. ascii
var tid1Tmk = "11111111111111111111111111111111";
var tid1EnryptedTmk = "";
// terminal 1 plain twk value, 32 bytes. ascii
var tid1Twk = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
// terminal 1 encrypted twk value, 32 bytes. base64
var tid1TwkEncrypted = "RjzvDd9ZFY117iC5fK5ebrgRxNvYv+BzUnn/PDIEeMo=";

// when tid is A0002, use below key group
var tid2Tek = "";
// terminal 2 plain tmk value, 32 bytes.
var tid2Tmk = "22222222222222222222222222222222";
var tid2EnryptedTmk = "";
// terminal 2 plain twk value, 32 bytes.
var tid2Twk = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
// terminal 2 encrypted twk value, 32 bytes.
var tid2TwkEncrypted = "mxB7eE7O336+BkmPqbE31CZCY6RNiAdMPpXenqjg2Jc=";

// when tid is A0003, use below key group
var tid2Tek = "";
// terminal 3 plain tmk value, 32 bytes.
var tid3Tmk = "33333333333333333333333333333333";
var tid3EnryptedTmk = "";
// terminal 3 plain twk value, 32 bytes.
var tid3Twk = "cccccccccccccccccccccccccccccccc";
// terminal 3 encrypted twk value, 32 bytes.
var tid3TwkEncrypted = "vpyMM9iOEvaNUdP6BAHvEe9ar7wj+6XEjYMUlire3q8=";

// when tid is A0004, use below key group
var tid4Tek = "";
// terminal 4 plain tmk value, 32 bytes.
var tid4Tmk = "44444444444444444444444444444444";
var tid4EnryptedTmk = "";
// terminal 4 plain twk value, 32 bytes.
var tid4Twk = "dddddddddddddddddddddddddddddddd";
// terminal 4 encrypted twk value, 32 bytes.
var tid4TwkEncrypted = "26TpVUq3kvtInIaWQdT44yefeMmQ7tPQj6xn/tCaCk4=";

exports.setTek = function (tid, tek) {
    if (tid === tid1) {
        tid1Tek = tek;
        // tid1EnryptedTmk = aes.AesEncryptFunc(tid1Tmk, tek, "00000000000000000000000000000000");
        tid1EnryptedTmk = aes.AesZeroPaddingEncryptFunc(tid1Tmk, tek, "00000000000000000000000000000000");
        console.log("encrypted tid1 tmk=" + tid1EnryptedTmk);
    } else if (tid === tid2) {
        tid2Tek = tek;
        tid2EnryptedTmk = aes.AesEncryptFunc(tid2Tmk, tek, "00000000000000000000000000000000");
        console.log("encrypted tid2 tmk=" + tid2EnryptedTmk);
    } else if (tid === tid3) {
        tid3Tek = tek;
        tid3EnryptedTmk = aes.AesEncryptFunc(tid3Tmk, tek, "00000000000000000000000000000000");
        console.log("encrypted tid3 tmk=" + tid3EnryptedTmk);
    } else {
        tid4Tek = tek;
        tid4EnryptedTmk = aes.AesEncryptFunc(tid4Tmk, tek, "00000000000000000000000000000000");
        console.log("encrypted tid4 tmk=" + tid4EnryptedTmk);
    }
};

exports.getRegisterStatusByTid = function (tid) {
    if (tid === tid1) {
        return tid1RegisterStatus;
    } else if (tid === tid2) {
        return tid2RegisterStatus;
    } else if (tid === tid3) {
        return tid3RegisterStatus;
    } else {
        return tid4RegisterStatus;
    }
}

exports.setRegisterStatusByTid = function (tid, status) {
    if (tid === tid1) {
        tid1RegisterStatus = status;
    } else if (tid === tid2) {
        tid2RegisterStatus = status;
    } else if (tid === tid3) {
        tid3RegisterStatus = status;
    } else {
        tid4RegisterStatus = status;
    }
}

exports.getEncryptedTmkByTid = function (tid) {
    if (tid === tid1) {
        return tid1EnryptedTmk;
    } else if (tid === tid2) {
        return tid2EnryptedTmk;
    } else if (tid === tid3) {
        return tid3EnryptedTmk;
    } else {
        return tid4EnryptedTmk;
    }
};

exports.getEncryptedTmkIndexByTid = function (tid) {
    if (tid === tid1) {
        return 10;
    } else if (tid === tid2) {
        return 11;
    } else if (tid === tid3) {
        return 12;
    } else {
        return 13;
    }
};

exports.getEncryptedTwkIndexByTid = function (tid) {
    if (tid === tid1) {
        return 10;
    } else if (tid === tid2) {
        return 11;
    } else if (tid === tid3) {
        return 12;
    } else {
        return 13;
    }
};


exports.getEncryptedTwkByTid = function (tid) {
    if (tid === tid1) {
        return tid1TwkEncrypted;
    } else if (tid === tid2) {
        return tid2TwkEncrypted;
    } else if (tid === tid3) {
        return tid3TwkEncrypted;
    } else {
        return tid4TwkEncrypted;
    }
};

exports.getPlainTwkByTid = function (tid) {
    if (tid === tid1) {
        return tid1Twk;
    } else if (tid === tid2) {
        return tid2Twk;
    } else if (tid === tid3) {
        return tid3Twk;
    } else {
        return tid4Twk;
    }
};

exports.getTid1EncryptedTmk = function () {
    return tid1EnryptedTmk;
}
exports.getTid1EncryptedTwk = function () {
    return tid1TwkEncrypted;
}
exports.getTid2EncryptedTmk = function () {
    return tid2EnryptedTmk;
}
exports.getTid2EncryptedTwk = function () {
    return tid2TwkEncrypted;
}
exports.getTid3EncryptedTmk = function () {
    return tid3EnryptedTmk;
}
exports.getTid3EncryptedTwk = function () {
    return tid3TwkEncrypted;
}
exports.getTid4EncryptedTmk = function () {
    return tid4EnryptedTmk;
}
exports.getTid4EncryptedTwk = function () {
    return tid4TwkEncrypted;
}
