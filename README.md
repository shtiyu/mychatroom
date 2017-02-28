# mychatroom
NodeJS + Mongodb + Sockect.io 聊天室，实现如下功能:<br>
* 注册
* 登录（多处登录会互踢）
* 聊天
* 隐藏模式，开启隐藏模式后，接收和发送消息会变成Linux语句，当鼠标移上去时，才会显示真实消息内容

## 安装
* git clone https://github.com/shtiyu/mychatroom.git
* cd mychatroom
* npm install

## 启动
* 启动Mongodb，默认端口27017(配置位于：config/default.js)
* node index.js

## 预览
* http://localhost:3002

## 用到的技术/框架
* [Nodejs](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [EJS](http://www.embeddedjs.com/)
* [Mongodb](https://docs.mongodb.com/manual/reference/)
* [Socket.io](http://socket.io)
