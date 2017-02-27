/**
 * Created by shtiyu on 17/2/16.
 */
let user = require('../lib/mongodb').User;
let sha1 = require('sha1');
let sessions = require('../models/sessions');

user.createUser = function(newUser){
    return user.create(newUser).exec();
};

//用户登录
user.login = function(nickname, password, callback){

    user.findOne({name : nickname}).exec().then(function(result){

        if(!result){
            return callback(false, '用户名或密码错误。');
        }

        let dbPsw   = result.password;
        let salt    = result.salt;
        let userPsw = sha1(password + salt);

        if(dbPsw !== userPsw){
            return callback(false, '用户名或密码错误。');
        }

        //T掉已经在线的用户
        sessions.kickUser(result._id).then(function(){
            return callback(true, 'ok', result);
        });

    }).catch(function(e){
        return callback(false, e.message);
    });

};

module.exports = user;