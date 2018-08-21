var controller = module.exports;
var url = require('url')
var config = require('../config')
var fs = require('fs')
var path = require('path');

controller.index = function (req, res) {
    var query = url.parse(req.url, true).query;
    area = query.area;
    fs.readFile(path.join(__dirname+config.jsonPath + area + '.json'), 'utf8', function (err, data) {
        console.log(path.join(__dirname+config.jsonPath + area + '.json'));
        if (err) {
            fs.writeFileSync(path.join(__dirname+config.jsonPath + area + '.json'), '{}');
            data = '{}';
        }
        var json = JSON.parse(data);
        date = query.date;
        if (json[date]) {
            res.render('index', {
                listData: json[date].pageList,
                date: date
            })
        } else {
            res.render('index', {
                listData: [],
                date: date
            })
        }

    });
}
controller.fileUpload = function (req, res, next) {
    var area = req.body.area;
    var date = req.body.date;
    if(!req.files.file.type.indexOf('image/')==0){
        res.end(JSON.stringify({
            code:10020,
            err:'不是图片'
        }))
    }else {
        var type = '.' + req.files.file.type.split('/')[1];
        var fileName = new Date().getTime();
    }

    try {
        fs.statSync(path.join(__dirname+config.imgPath+date))
    } catch (error) {
        fs.mkdirSync(path.join(__dirname+config.imgPath+date));
    }

    fs.rename(req.files.file.path,path.join(__dirname+config.imgPath+date+'/'+fileName+type),function(err){
        if(err){
          console.log(err);;
        }else{
            res.end(JSON.stringify({
                code:0,
                success:'图片上传成功',
                data:fileName+type
            }))
        }
     })
}

controller.delData = function (req, res) {
    var area = req.query.area;
    fs.readFile(path.join(__dirname+config.jsonPath + area + '.json'), 'utf-8', function (err, data) {
        if (err) {
            res.render('error', {
                err
            })
        } else {
            var json = JSON.parse(data);
            // var dataArr = json[req.query.date].pageList;
            var delIndex = req.query.delIndex;
            
            json[req.query.date].pageList.splice(delIndex, 1);
            console.log(json);

            fs.writeFile(path.join(__dirname+config.jsonPath + area + '.json'), JSON.stringify(json), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.end(JSON.stringify({
                        code: 0
                    }))
                }
            });
        }
    })
}
controller.addData = function  (req,res) {
    console.log(req.query);
    var title = req.query.title;
    var fileName = req.query.fileName;
    var area = req.query.area;
    var date = req.query.date;
    fs.readFile(path.join(__dirname+config.jsonPath+area+'.json'), 'utf-8', function  (err,data) {
        if(err){
            console.log(err);
        }else {
            var json = JSON.parse(data);
            if(!json[date]){
                json[date]={'pageList':[]};    
            }
            json[date].pageList.push({
			    "title":title,
			    "value":fileName
            })
            fs.writeFile(path.join(__dirname+config.jsonPath+area+'.json'), JSON.stringify(json),  function  (err) {
                if(err) console.log(err);
                res.end(JSON.stringify({
                    code:0,
                    success:'添加成功'
                }))
            })

        }
    })
}
controller.delsArr = function  (req,res) {
    console.log(req.query);
    var area = req.query.area;
    var date = req.query.date;
    var delArr = req.query.delArr;
    fs.readFile(path.join(__dirname+config.jsonPath+area+'.json'), 'utf-8',function  (err,data) {
        if(err){console.log(err);}
        var json = JSON.parse(data);
        if(json[date]){
            var arr = json[date].pageList;
            for(var i=delArr.length-1;i>=0;i--){
                arr.splice(delArr[i],1);
            }
            fs.writeFile(path.join(__dirname+config.jsonPath+area+'.json'), JSON.stringify(json), function  (err) {
                if(err) {console.log(err);}
                res.end(JSON.stringify({
                    code:0
                }))
            })
        }
    })
}