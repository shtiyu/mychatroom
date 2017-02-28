/**
 * Created by shtiyu on 17/2/23.
 */
let online = require('../lib/mongodb').Online;

//用户加入聊天室
online.enter = function (userid, name, socketid) {
    return online.create({ userid : userid, name : name, socketid : socketid}).exec();
};

online.count = function(){
    return online.count().exec();
};

//用户退出聊天室
online.exit = function (userid) {
    return online.remove({userid : userid}).exec();
};

online.exitBySocketID = function (socketid) {
    return online.remove({socketid : socketid}).exec();
};

//在线列表
online.list = function () {
    return online.find({}, {name : 1}).exec();
};


module.exports = online;