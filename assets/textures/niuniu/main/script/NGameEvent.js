const NGameEvent = cc.Class({
    properties: {
        eventManager: null,
        target: null,
    },

    statics: {
        getInstance() {
            if (!this.eventManager) {
                this.eventManager = new NGameEvent();
            }
            return this.eventManager;
        },
    },

    initEvent(target) {
        //注册 事件
        bb.user.Event.addObserver(this);
        this.target = target;
        var services_handlers = {};
        services_handlers[bb.stype.NiuNiu] = this.on_niu_server_return.bind(this);
        bb.net.register_serivces_handler(services_handlers);
    },

    // 登录验证入口函数
    on_niu_server_return(stype, ctype, body) {
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
                // 刷新UI界面
                this.target.joinRoom();
                break;
            }
            case bb.room.EventName.JOIN_ROOM_FAILE: {
                // 玩家登录失败
                break;
            }
        }
    }
   
});

module.exports = NGameEvent;
