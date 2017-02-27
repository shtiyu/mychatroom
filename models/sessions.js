/**
 * Created by shtiyu on 17/2/27.
 */
let sessions = require('../lib/mongodb').Sessions;

//查询用户是否登录
sessions.find = function (userid) {
    return sessions.find({ "session.user._id" : userid}).exec()
};

//踢掉已经登录的用户
sessions.kickUser = function (userid) {
    return sessions.remove({ "session.user._id" : userid }).exec();
};

module.exports = sessions;