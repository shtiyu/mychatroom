let checkLogin = require('../middlewares/util').checkLogin;


module.exports = function(app){

    app.get('/', checkLogin, function(req, res, next){
        res.render('index');
    });

    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));


};