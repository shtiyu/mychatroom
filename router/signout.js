/**
 * Created by shtiyu on 17/2/22.
 */
let app = require('express');
let Router = app.Router();
let checkLogin = require('../middlewares/util').checkLogin;

Router.get('/', checkLogin, function (req, res, next) {
    req.session.user = null;
    res.redirect('/signin');
});

module.exports = Router;