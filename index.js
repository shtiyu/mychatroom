let express = require('express');
let session = require('express-session');
let flash   = require('connect-flash');
let config  = require('config-lite');
let router  = require('./router');
let pkg     = require('./package.json');
let mongoStore = require('connect-mongo')(session);
let formidable = require('express-formidable');
let path = require('path');
let app = express();


app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    key     : config.session.key,
    resave  : config.session.resave,
    secret  : config.session.secret,
    cookie  : { maxAge : 3600 * 1000},
    store   : new mongoStore({url : config.mongodb, ttl : 60 * 15}),
    saveUninitialized : config.session.saveUninitialized
}));

app.use(flash());
app.use(formidable({
    uploadDir : path.join(__dirname , '/public/uploads'),
    keepExtensions : true
}));

app.use(function(req, res, next){
    res.locals.errors = req.flash('errors').toString();
    res.locals.success = req.flash('success').toString();
    next();
});

router(app);


app.listen(config.port, function () {
    console.log(`${pkg.name} is now runing on port ${config.port}`);
});

