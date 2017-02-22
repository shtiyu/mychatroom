/**
 * Created by shtiyu on 17/2/16.
 */
let express = require('express');
let Router = express.Router();
let checkNoLogin = require('../middlewares/util').checkNoLogin;
let userModel = require('../models/user');

Router.get('/', checkNoLogin, function(req, res, next){

    res.render('signin');

});

Router.post('/', checkNoLogin, function (req, res, next) {

    let nickname = req.fields.nickname;
    let password = req.fields.password;

    userModel.login(nickname, password, function (state, message, data) {
        if(state == false){
            req.flash('errors', message);
            return res.redirect('back');
        }

        delete data.password;
        delete data.salt;

        req.session.user = data;
        return res.redirect('/');
    });

});


module.exports = Router;