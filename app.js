var express = require('express');

var app = express();
//静态资源目录
app.use('/node_modules', express.static('node_modules'));
app.use('/jsonData/static', express.static('views/static'));
app.use('/jsonData/adsfile/img', express.static('adsfile/img'));

//渲染引擎
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');

//路由
app.use(require('./router/router.js'));


app.listen(8080,function  () {
    console.log('监听8080端口');
})