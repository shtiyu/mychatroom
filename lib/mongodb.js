/**
 * Created by shtiyu on 17/2/16.
 */
let config     = require("config-lite");
let Mongolass  = require('mongolass');
let dbInstance = new Mongolass();

dbInstance.connect(config.mongodb);

exports.User = dbInstance.model('User', {
    name     : { type : 'string' },
    salt     : { type : 'string' },
    password : { type : 'string' },
    avatar   : { type : 'string' }
});
exports.User.index({ name : 1}, {unique : 1}).exec();

//当前在线列表
exports.Online = dbInstance.model('Online', {
    userid   : { type : Mongolass.Types.ObjectId },
    name     : { type : 'string'},
    socketid : { type : 'string'}
});
exports.Online.index({ name : 1 }, { unique : 1 }).exec();

exports.Sessions = dbInstance.model('sessions', {
    session : { type : 'string' },
    expires : { type : 'Date' }
});