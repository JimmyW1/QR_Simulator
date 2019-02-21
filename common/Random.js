/**
 * Created by wangcunche on 2018/12/23.
 */

var crypto = require('crypto');

// // 异步
// crypto.randomBytes(16, function(ex, buf) {
//     if (ex) throw ex;
//     var token = buf.toString('hex');
//     console.log(‘randomcode: %s', token);
// });
// // 同步
// try {
//     console.log(‘randomcode: %s', token);
// } catch (ex) {
//     // handle error
// }
//
exports.getRandomHexStrSync = function (len) {
    var buf = crypto.randomBytes(len);
    var token = buf.toString('hex');
    var randomHexStr = token.substr(0, len);
    console.log("randomHexStr=" + randomHexStr);

    return randomHexStr;
}
