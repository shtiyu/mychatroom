/**
 * Created by shtiyu on 17/2/23.
 */
let onlineModel  = require('../models/online');
let currentTime  = require('../middlewares/util').currentTime;

module.exports = function (io) {

    io.on('connection', function(socket){


        let userInfo = socket.request.session.user;

        if(!userInfo){
            socket.disconnect(true);
            return false;
        }

        let socketid = socket.id;
        let userid   = userInfo._id;
        let nickname = userInfo.name; //用户名

        //进入房间
        onlineModel.enter(userid, nickname, socketid).then(function(){
            onlineModel.count().then(function(result){
                return io.sockets.emit('user join', {userNum: result, nickname : nickname});
            });
        }).catch(function (e) {
            console.log(e.message);
        });

        //离开房间
        socket.on('disconnect', function () {
            onlineModel.exit(userid).then(function () {
                onlineModel.count().then(function (result) {
                    return socket.broadcast.emit('user leave', {userNum : result, nickname : nickname})
                });
            }).catch(function (e) {
                console.log(e.message);
            })
        });

        //收到消息
        socket.on('chat message', function (msg) {

            let time = currentTime();

            if(nickname == undefined){
                return false;
            }

            socket.broadcast.emit('chat message', {nickname: nickname, message : msg, time : time});

        });

        //查询当前在线列表
        socket.on('online user', function (callback) {

            onlineModel.list().then(function (result) {
                callback(result);
            }).catch(function(e){
                console.log(e.message);
            });

        });


    });

};