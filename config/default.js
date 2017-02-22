/**
 * Created by shtiyu on 17/2/16.
 */
module.exports = {

    port : 3002,
    session : {
        secret : 'mysecretkey',
        key    : 'chatroom',
        resave : true,
        saveUninitialized : true
    },
    mongodb : 'mongodb://localhost:27017/chatroom'
};