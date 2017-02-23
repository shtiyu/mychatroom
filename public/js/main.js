/**
 * Created by shtiyu on 17/2/23.
 */
$(function() {

    var socket = io();


    socket.on('user join', function(data){
        if(data.nickname == undefined) return;
        $('#messages').append($('<li>').text(data.nickname + " login on ttys005; Online:"+data.userNum).addClass('sysMsg'));
    });

    socket.on('user leave', function(data){
        if(data.nickname == undefined) return;
        $('#messages').append($('<li>').text(data.nickname + " login out on ttys005; Online:"+data.userNum).addClass('sysMsg'));
    });

});