/**
 * Created by shtiyu on 17/2/27.
 */
let sessions    = require('../lib/mongodb').Sessions;
let onlineModel = require('./online');

//查询用户是否登录
sessions.checkOnline = function (sessID) {
    return sessions.findOne({ "_id" : sessID}).exec()
};

//踢掉已经登录的用户
sessions.kickUser = function (userid) {
    return sessions.remove({ "session.user._id" : userid }).exec().then(function () {
        return onlineModel.exit(userid);
    });
};

module.exports = sessions;