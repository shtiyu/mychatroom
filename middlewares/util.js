/**
 * Created by shtiyu on 17/2/16.
 */
let util = {

    randString : function(len){
        len = len || 32;
        let chat = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890';
        let maxLength  = chat.length;
        let randString = '';
        for(let i = 0; i < len; i++){
            randString += chat.charAt(Math.floor(Math.random() * maxLength));
        }

        return randString;

    },

    checkLogin : function (req, res, next) {

        if(!req.session.user){
            req.flash('errors', '未登录');
            return res.redirect('signin');
        }

        next();
    },

    checkNoLogin : function (req, res, next) {

        if(req.session.user){
            req.flash('已登录');
            return res.redirect('/');
        }

        next();
    },

    currentTime : function(){
        let curDate = new Date();
        return curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate() + " " + curDate.getHours() + ":" + curDate.getMinutes() + ":" + curDate.getSeconds();
    },

    currentDate : function () {
        let curDate = new Date();
        return curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate();
    }

};

module.exports = util;