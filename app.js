var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var downloadTmk = require('./routes/downloadTmk');
var downloadTwk = require('./routes/downloadTwk');
var encryptedJson = require('./routes/encryptedJson');
var saveData = require('./routes/savedata');
var updateQR = require('./routes/updateQR');

var app = express();
var http = require('http');
var https = require('https');
var fs = require("fs");

var db = require('./data/db');
var aes = require('./common/aes.js');

// db.setTek("A00001", "99999999999999999999999999999999");
// var decryptedData = aes.AesRemoveZeroPaddingDecryptFunc(db.getTid1EncryptedTmk(), '99999999999999999999999999999999', "00000000000000000000000000000000");
// console.log("decryptedData=" + decryptedData);

//
// var rsa = require('./common/rsa');
// var encryptedData = 'fXztwngaz1Zv4a9c7Z/zI0jsV7GwVzGXHEtfwuY3DAXRmpvBwkCl4A4eCQPeK8sPJlHi8pyzXfJvIJiyUhxHVwKyBycXUvZJ1Una3afH6WDyD9DMKWuktyJQbPIJz/asGAZEqsKetf1WH/Z8Iiu1FApPfC7azKpVnvSOjCB7PZipPTFnls1Gc9C04341bxje3G5WeSYmvNlHexeBGf/LTUoqbFGAcj3BKlsCp1c7FhU0DXJ1xRFKN9Ggb4EB2aSGlG0p1KuBtiOgBuX6XnGQ9azP48IJP83kiWpDpwmMfRK5NvAFiNzdoYM+o8N5e+2L5Bmj9WYOqx4fxMmR9HqUaw==';
// var key = fs.readFileSync(path.join(__dirname, "./privkey.pem")).toString('utf8');
// var data = rsa.RsaDecryptFunc(encryptedData, key);
// console.log("data =[%s]", data);

var privateKey = fs.readFileSync(path.join(__dirname, "./privkey.pem"));
var certificate = fs.readFileSync(path.join(__dirname, "./cacert.pem"));

var credentials = {key:privateKey, cert:certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
// var httpsServer = https.createServer(app);

var port = 8080;
var portSSL = 8001;

httpServer.listen(port, function () {
    console.log("Http server is running on local host:%s", port);
});

httpsServer.listen(portSSL, function () {
    console.log("Https server is running on local host:%s", portSSL);
});

app.get('/', function (req, res) {
    if (req.protocol === 'https') {
      res.status(200).send('This is https server');
    } else {
      res.status(200).send('This is http server');
    }
});

var qr = require('qr-image')
var fs = require('fs');
var gm = require('gm');
var text = "11111111111111111111111";
try {
    // var img = qr.image(text,{size :10, type: 'png'});
    console.log(")))))))))))))))))))))))))))))")
    // img.pipe(fs.)
    // res.writeHead(200, {'Content-Type': 'image/png'});
    // img.pipe(res);

    var imgValue = qr.imageSync(text, {size:10, type:'png'});
    console.log(imgValue);
    fs.writeFileSync("1.png", imgValue)

    gm()
        .in('-page', '+0+0')//-page是设置图片位置，所有的图片以左上为原点，向右、向下为正
        // .in('data/images/.png')//底图，到这里第一张图就设置完了，要先设置参数，再设置图片
        .in('-resize', '500x500')//设置微信二维码图片的大小（等比缩放）
        // .in('-page', '+100+100')//设置微信二维码图片的位置
        .in('data/images/1.png')//二维码图
        .in('-page', '+145+145')//logo图位置
        .in('data/logo/ic_alipay.png')//logo图
        .mosaic()//图片合成
        .write('final.png', function (err) {//图片写入
            if (!!err) {
                console.log(err);
            } else {
                console.log('ok');
            }});
} catch (e) {
    res.writeHead(414, {'Content-Type': 'text/html'});
    res.end('<h1>414 Request-URI Too Large</h1>');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/keySign/loadTmk', downloadTmk);
app.use('/keySign/loadTwk', downloadTwk);
app.use('/gateway/encryptedJson', encryptedJson);
app.use('/saveData', saveData);
app.use('/updateQR', updateQR);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
