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
        //  services_handlers[bb.stype.HALL] = this.on_niu_server_return.bind(this);
        bb.net.register_serivces_handler(services_handlers);
        bb.room.Event.addObserver(this);
    },

    // 登录验证入口函数
    on_niu_server_return(stype, ctype, body) {
        switch (ctype) {
            case bb.cmd.NiuNiu.JOIN_ROOM:
                bb.log.info('[牛牛] 收到服务器 进入房间 的消息');
                bb.room.setJoinRoom(body);
                break;
            case bb.cmd.NiuNiu.READY:
                bb.log.info('[牛牛] 收到服务器 准备 的消息')
                bb.room.setUserReady(body);
                break;
            case bb.cmd.NiuNiu.GAME_BEGIN:
                bb.log.info('[牛牛] 收到服务器 开始游戏 的消息')
                bb.room.setStartGame(body);
                break;
            case bb.cmd.NiuNiu.SNATCH_BLANK_START:
                bb.log.info('[牛牛] 收到服务器 开始抢庄 的消息')
                bb.room.setStartRobZhuang();
                break;
            case bb.cmd.NiuNiu.SNATCH_BLANK:
                bb.log.info('[牛牛] 收到服务器 抢庄 的消息')
                bb.room.setRobZhuang(body);
                break;
            case bb.cmd.NiuNiu.SNATCH_BLANK_END:
                bb.room.setRobZhuangEnd(body);
                bb.log.info('[牛牛] 收到服务器 抢庄结果 的消息')

                break;
            case bb.cmd.NiuNiu.SELECT_MULTIPLE_START:
                bb.log.info('[牛牛] 收到服务器 开始倍数选择 的消息')
                bb.room.selectMultipleStart();
                break;
            case bb.cmd.NiuNiu.SELECT_MULTIPLE:
                bb.log.info('[牛牛] 收到服务器 倍数选择 的消息')
                bb.room.selectMultiple(body);
                break;
            case bb.cmd.NiuNiu.SELECT_MULTIPLE_END:
                bb.log.info('[牛牛] 收到服务器 倍数选择完成 的消息');
                bb.room.selectMultipleResult(body);
                break;
            case bb.cmd.NiuNiu.START_CALCULATE_CATTLE:
                bb.log.info('[牛牛] 收到服务器 开始算牛 的消息')
                bb.room.startCalculateCattle();
                break;
            case bb.cmd.NiuNiu.CALCULATE_CATTLE:
                bb.log.info('[牛牛] 收到服务器 计算有没有牛 的消息')
                break;
            case bb.cmd.NiuNiu.CALCULATE_CATTLE_RESULT:
                bb.log.info('[牛牛] 收到服务器 算牛阶段完成 的消息')
                break;
            case bb.cmd.NiuNiu.GAME_RESULT:
                bb.log.info('[牛牛] 收到服务器 游戏结果 的消息')

                break;
            case bb.cmd.NiuNiu.GAME_RESTART:
                bb.log.info('[牛牛] 收到服务器 游戏重新开始 的消息');

                break;

        }
    },

    onMsgEvent(event, data) {
        switch (event) {
            case bb.room.EventName.JOIN_ROOM_SUCCESS: {
                // 刷新UI界面
                this.target.joinRoom();
                break;
            }
            case bb.room.EventName.JOIN_ROOM_FAILE: {
                // 玩家登录失败
                break;
            }
            case bb.room.EventName.PLAYER_READY_SUCCESS: {
                // 玩家准备成功
                this.target.setReady(data[0], data[1]);
                break;
            }
            case bb.room.EventName.PLAYER_READY_FAILE: {
                // 玩家准备失败
                break;
            }
            case bb.room.EventName.START_GAME: {
                this.target.startGame();
                break;
            }
            case bb.room.EventName.SNATCH_BLANK_START: {
                // 开始抢庄
                this.target.startRobZhuang();
                break;
            }
            case bb.room.EventName.SNATCH_BLANK: {
                // 抢庄
                this.target.robZhuang(data[0], data[1]);
                break;
            }
            case bb.room.EventName.SNATCH_BLANK_RESULT: {
                // 抢庄
                this.target.robZhuangResult();
                break;
            }
            case bb.room.EventName.SELECT_MULTIPLE_START: {
                this.target.selectMultipleStart();
                break;
            }
            case bb.room.EventName.SELECT_MULTIPLE: {
                this.target.selectMultiple(data[0], data[1]);
                break;
            }
            case bb.room.EventName.START_CALCULATE_CATTLE: {
                this.target.startCalculateCattle();
                break;
            }

            // case bb.room.EventName.SELECT_MULTIPLE: {
            //     this.target.selectMultiple(data[0], data[1]);
            //     break;
            // }


            // 
        }

    }

});

module.exports = NGameEvent;
