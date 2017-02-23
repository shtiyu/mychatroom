/**
 * Created by shtiyu on 17/2/23.
 */
let online = require('../lib/mongodb').Online;

//用户加入聊天室
online.enter = function (userid, name) {
    return online.create({ userid : userid, name : name}).exec();
};

online.count = function(){
    return online.count().exec();
};

//用户退出聊天室
online.exit = function (userid) {
    return online.remove({userid : userid}).exec();
};

module.exports = online;