
const HallEvent = cc.Class({
    properties: {
        eventManager: null,
    },

    statics: {
        getInstance() {
            if (!this.eventManager) {
                this.eventManager = new HallEvent();
            }
            return this.eventManager;
        },
    },

    initObserver() {
         //注册 事件
         bb.room.Event.addObserver(this);
    },

    initEvent() {
        var services_handlers = {};
        services_handlers[bb.stype.NiuNiu] = this.on_niuniu_server_return.bind(this);
        bb.net.register_serivces_handler(services_handlers);
    },

    // 登录验证入口函数
    on_niuniu_server_return(stype, ctype, body) {
        switch (ctype) {
            case bb.cmd.NiuNiu.JOIN_ROOM:
                bb.room.setJoinRoom(body);
                break;
            // case bb.cmd.Auth.RELOGIN:
            //     console.log("你的用户在另一个终端登录");
            //     break;
        }
    },

    onMsgEvent(event, data) {
        switch(event) {
            case bb.room.EventName.JOIN_ROOM_SUCCESS: {
                // 绑定协议
                bb['niu_proto'] = require('niu_proto');
                bb.scene.getInstance().runScene("niugame");
                break;
            }
        }
    }
   
});

module.exports = HallEvent;
