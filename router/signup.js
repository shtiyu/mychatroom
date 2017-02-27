/**
 * Created by shtiyu on 17/2/16.
 */
let express = require('express');
let Router  = express.Router();
let sha1 = require('sha1');
let util = require('../middlewares/util');
let modUser = require('../models/user');
let fs = require('fs');

Router.get('/', util.checkNoLogin, function(req, res, next){
    res.locals.title = '注册';
    res.render('signup');
});

Router.post('/', function (req, res, next) {

    let name   = req.fields.nickname;
    let psw    = req.fields.password;
    let repsw  = req.fields.repassword;
    let avatar = req.files.avatar;

    try{
        if(name.length < 1 || name.length > 10){
            throw new Error('昵称在1到10个字符之间');
        }

        if(psw.length < 6){
            throw new Error('密码长度应该在6字符以上');
        }

        if(psw !== repsw){
            throw new Error('密码两次输入不一致');
        }

        if(!avatar.name){
            throw new Error("请上传头像");
        }

    }catch(e){
        fs.unlink(avatar.path);
        req.flash('errors', e.message);
        return res.redirect('signup');
    }

    //生成salt
    let salt = util.randString(8);
    let password = sha1(psw + salt);
    let avatarPath = avatar.path.split('/').pop();

    //入库
    let newUser = {
        name : name,
        salt : salt,
        password : password,
        avatar : avatarPath
    };

    modUser.createUser(newUser).then(function(result){

        let user = result['ops'][0];
        delete user['password'];
        delete user['salt'];

        req.session.user = user;
        req.flash('success', '注册成功');
        res.redirect('/');

    }).catch(function(e){
        fs.unlink(avatar.path);


        if(e.message.match('E11000 duplicate key')){
            req.flash('errors', '用户名被占用');
            return res.redirect('/signup');
        }

        next(e);
    });



});


module.exports = Router;