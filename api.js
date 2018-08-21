const config = require('./config')
const baseUrl = config.baseUrl + '/api';
api = {
    fileUpload:baseUrl + '/fileUpdate',
    delData:baseUrl + '/delData',
    addData:baseUrl + '/addData',
    delsArr:baseUrl + '/delsArr'
}
// console.log(api.fileUpload);
module.exports = api;