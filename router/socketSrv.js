/**
 * Created by shtiyu on 17/2/23.
 */
let onlineModel  = require('../models/online');

module.exports = function (io) {

    io.on('connection', function(socket){

        let userInfo = socket.request.session.user;

        if(!userInfo){
            return false;
        }


        let userid   = userInfo._id;
        let nickname = userInfo.name; //用户名

        //进入房间
        onlineModel.enter(userid, nickname).then(function(){
            onlineModel.count().then(function(result){
                return socket.emit('user join', {userNum: result, nickname : nickname});
            });
        }).catch(function (e) {
            console.log(e.message);
        });

        socket.on('disconnect', function () {
            onlineModel.exit(userid).then(function () {
                onlineModel.count().then(function (result) {
                    return socket.emit('user leave', {userNum : result, nickname : nickname})
                });
            }).catch(function (e) {
                console.log(e.message);
            })
        });

        //离开房间
        // socket.on('disconnect', function(){
        //     Promise.all([
        //         onlineModel.exit(userid),
        //         onlineModel.count()
        //     ]).then(function (result) {
        //         return socket.emit('user leave', {userNum : result[1], nickname : nickname})
        //     }).catch(function (e) {
        //         console.log(e.message);
        //     });
        // })

    });

};