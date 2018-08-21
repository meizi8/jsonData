var express = require('express');

var routes = express.Router();

var controller = require('../controller/controller.js');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var config = require('../config.js');
var api = require('../api.js');
routes.get(config.baseUrl,controller.index)
.post(api.fileUpload,multipartMiddleware,controller.fileUpload)
.get(api.delData,controller.delData)
.get(api.addData,controller.addData)
.get(api.delsArr,controller.delsArr)

module.exports = routes;