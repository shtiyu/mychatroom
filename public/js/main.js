/**
 * Created by shtiyu on 17/2/23.
 */
$(function() {

    var socket   = io();
    var flag 	 = true;
    var hideMode = 'OFF';
    var hideModeString = [
        'pwd', 'Permission denied (publickey,gssapi-keyex,gssapi-with-mic).', ' ssh data-backend01 ',
        'node index.js', 'telnet other-rmcq.8h2j7u.2001.use1.cache.amazonaws.com 6379', 'mysql -h uew.coa1oe2db2ubs.us-abst-1.3de.amazonaws.com -u netease',
        'tailf /data/site/oss/project/debug/qq/out.log', '/data/php/bin/php /data/live-data/app/analysis/index.php "ct=mail&ac=daily&site=1&timezone=UTC-8"',
        'tail -f /data/logs/nginx/oss.qq.access.log ', 'vim dataappadmin-baidu-com.conf', 'more  /data/logs/nginx/acc.sina.error.log |grep acc'
    ];

    var scrollTop = function(){
        $("body").scrollTop($("body")[0].scrollHeight);
    };

    var appendMsg = function(msg, msgClass){
        var append = $('<li>', {
            text : msg,
            class : msgClass,
        });

        $('#messages').append(append);
        scrollTop();
    };

    var currentTime = function(){
        var curDate = new Date();
        return curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate() + " " + curDate.getHours() + ":" + curDate.getMinutes() + ":" + curDate.getSeconds();
    };

    var pretendMsg = function(username, msg, type){

        var rand = Math.random();
        var leng = hideModeString.length - 1;
        var idx  = Math.ceil(rand * leng);
        var str  = hideModeString[idx];
        var addClass = '';
        if(type == 'my'){
            addClass = 'myMsg';
        }

        username = toTxt(username);
        msg 	 = toTxt(msg);

        if(hideMode == 'ON'){
            return "<li class='"+addClass+" js-hide-mode-msg'>"+username+" <span class='js-msg-ori hide'>"+msg+"</span><span class='js-msg-hide'>"+str+"</span></li>";
        }else{
            return "<li class='"+addClass+"'>"+username+" <span class='js-msg-ori'>"+msg+"</span><span class='js-msg-hide hide'>pwd</span></li>";
        }

    };

    var toTxt = function(str){
        var RexStr = /\<|\>|\"|\'|\&/g;
        str = str.replace(RexStr, function(MatchStr) {
            switch (MatchStr) {
                case "<":
                    return "&lt;";
                    break;
                case ">":
                    return "&gt;";
                    break;
                case "\"":
                    return "&quot;";
                    break;
                case "'":
                    return "&#39;";
                    break;
                case "&":
                    return "&amp;";
                    break;
                default:
                    break;
            }
        });
        return str;
    };

    var clean = function(){
        $('#messages').html('');
        return true;
    };

    var onlineUser = function(){
        socket.emit('online user', function(data){

            var msg = data.length +' user(s) online:';
            $.each(data, function(_k, _v){
                msg += _v['name'] + "//"
            });

            msg = msg.substring(0, msg.length - 2);

            appendMsg(msg, 'sysMsg')
        });

        return true;
    };

    var help = function(){
        var help = '\
		<li class="sysMsg">\
		Usage: cmd [options] [arguments]<br/>\
		Options:<br/>\
		-c&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clean the messages<br/>\
		-l&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show online list<br/>\
		-s&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;switch hideMode<br/>\
		-o&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logout<br/>\
		--help&nbsp;get this help<br/>\
		</li>';
        $('#messages').append(help);

        return true;
    };

    var switchHideMode = function(){
        if(hideMode == 'ON'){
            hideMode = "OFF";
        }else{
            hideMode = "ON";
        }

        appendMsg('HideMode '+hideMode, 'sysMsg');
        return true;
    };

    var logout = function(){
        window.location.href = '/signout';
    };

    var cmdFunction = function(cmd){

        cmd 	 = cmd.replace(/\s+/ig, ' ');
        var pos  = cmd.indexOf(' ', 5);

        if(pos > -1){
            cmd  = cmd.substring(0, pos);
        }

        var ret = false;
        switch(cmd){
            case 'cmd -c':
                ret = clean();
                break;
            case 'cmd -l':
                ret = onlineUser();
                break;
            case 'cmd -s':
                ret = switchHideMode();
                break;
            case 'cmd -o':
                ret = logout();
                break;
            case 'cmd --help':
                ret = help();
                break;
        }

        return ret;
    };

    $(window).blur(function(){
        flag = false;
    });
    $(window).focus(function(){
        document.title = "56.218.27.233";
        flag = true;
    });

    $('body').on('mouseover','.js-hide-mode-msg', function(){
        $(this).find('.js-msg-ori').removeClass('hide');
        $(this).find('.js-msg-hide').addClass('hide');
    }).on('mouseout','.js-hide-mode-msg', function(){
        $(this).find('.js-msg-hide').removeClass('hide');
        $(this).find('.js-msg-ori').addClass('hide');
    });

    $('form').submit(function(){
        var $m = $('#m');
        var oriMsg  = $m.val();

        if(oriMsg == "" || oriMsg == undefined){
            return false;
        }

        $m.val('');

        if(oriMsg.substring(0, 3) == 'cmd'){
            if(cmdFunction(oriMsg)) return false;
        }

        var time   = currentTime();
        var user   = "root_" + time + " # ";
        var append = pretendMsg(user, oriMsg, 'my');

        $('#messages').append(append);
        scrollTop();

        socket.emit('chat message', oriMsg);

        return false;
    });

    //初始化
    $('#m').trigger('focus');
    appendMsg('System Message:You can type in "cmd --help" for help.', 'sysMsg');

    socket.on('chat message', function(data){

        var msg    = data.message;
        var time   = data.time;
        var user   = data.nickname+"_"+time + " $ ";
        var append = pretendMsg(user, msg);

        $('#messages').append(append);
        scrollTop();
        if(flag == false){
            document.title = "You have new message(s)";
        }
    });

    socket.on('user join', function(data){
        if(data.nickname == undefined) return;
        $('#messages').append($('<li>').text(data.nickname + " login on ttys005; Online:"+data.userNum).addClass('sysMsg'));
    });

    socket.on('user leave', function(data){
        if(data.nickname == undefined) return;
        $('#messages').append($('<li>').text(data.nickname + " login out on ttys005; Online:"+data.userNum).addClass('sysMsg'));
    });

});