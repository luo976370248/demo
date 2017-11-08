
cc.Class({
    extends: cc.Component,
    properties: {
    },

    isGetServerInfo: false,

    onLoad() {
        // 发送一个http请求，获取网关服务器地址
        this.getServerInfo();
    },

    getServerInfo() {

        bb.http.get('http://127.0.0.1:10001', '/server_info', null, function (err, ret) {
            if (err) {
                if (this.isGetServerInfo) {
                    return;
                }
                this.scheduleOnce(this.getServerInfo.bind(this), 3);
                return;
            }
            this.isGetServerInfo = true;
            var data = JSON.parse(ret);
            this.connectToServer(data);
        }.bind(this));
    },

    connectToServer(data) {
        this.unschedule(this.getServerInfo.bind(this))
        console.log("ws://" + data.host + ":" + data.ws_port + "/ws");
        websocket.connect("ws://" + data.host + ":" + data.ws_port + "/ws", 1); // 1是json 协议，2是二进制协议
    }
});
