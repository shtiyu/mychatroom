/**
 * Created by shtiyu on 17/2/28.
 */
let fs    = require('fs');
let path  = require('path');
let util  = require('../middlewares/util');
let debug = {

    log : function (msg, filePath) {
        if(!filePath){
            filePath = path.join(DIR_ROOT, 'logs', "system_error_"+util.currentDate()+".log");
        }

        msg = "[" + util.currentTime() +"]" + msg + "\r\n";

        let writeStream = fs.createWriteStream(filePath, { flags : 'a', defaultEncoding : 'utf8'} );
        writeStream.write(msg);
    }

};
module.exports = debug;