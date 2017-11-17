const NGameEvent = require("./NGameEvent");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad () {
        bb.ui.bindComponent(this); 

        // 加载资源
        NGameEvent.getInstance().initEvent(this);
        // this.scheduleOnce(() => {
        //     this.sendCardAction();
        // }, 4);
        this.initRoom();
        // this.startGame();
    },
    initRoom() {
        if (bb.room.gameState == 1 && !bb.room.playerList[0].ready) {
            this['_btnReady'].active = true;
        }
    },

    // 有玩家进入房间
    joinRoom() {
        for (let i = 1; i < bb.room.player_count; i++) {
            this['_player' + i].getComponent('NPlayer').initData();
        }
        if (bb.room.gameState == 1 && bb.room.playerList[0].state == 1) {
            this['_btnReady'].active = true;
        }
    },

    // 玩家准备
    setReady(uid, ready) {
       let idx = bb.room.getPlayerSeatByUid(uid);
       if (idx != -1) {
            this['_player' + (idx + 1)].getComponent('NPlayer').setReady(ready);
            if (idx == 0) {
                this['_btnReady'].active = false;
            }
       }
    },

    // 开始游戏
    startGame() {
        for (let i = 1; i < bb.room.player_count; i++) {
            this['_player' + i].getComponent('NPlayer').initState();
        }
        this['_iconStartGame'].active = true;
        let r1 = cc.rotateTo(0.3, -30);
        let r2 = cc.rotateTo(0.3, 0);
        let r3 = cc.rotateTo(0.3, 30);
        let c1 = cc.callFunc(() => {
            this['_iconStartGame'].active = false;
            this.sendCardAction();
        });
        this['_iconStartGame'].runAction(cc.sequence([r1, r2, r3, r2, c1]));
    },

    // 执行发牌动画
    sendCardAction() {
        cc.log('执行发牌的动画');
        for (let i = 1; i < bb.room.player_count; i++) {
            this['_player' + i].getComponent('NPlayer').sendCardAction();
        }
    },

     // 开始抢庄
     startRobZhuang() {
        let robZhuang = this.node.getChildByName('RobZhuang');
        if (robZhuang) {
            robZhuang.active = true;
        } else {
            bb.loader.loadRes('niuniu/RobZhuang/RobZhuang', cc.Prefab, function(prefab) {
                let new_node = cc.instantiate(prefab);
                this.node.addChild(new_node);
            }.bind(this));
        }
    },

    robZhuang(uid, rob) {
        let idx = bb.room.getPlayerSeatByUid(uid);
        if (idx != -1) {
             this['_player' + (idx + 1)].getComponent('NPlayer').snatchBlank(rob);
        }
    },

    robZhuangEnd(data) {

    },

    _onBtnReadyTouchEnd(sender) {
        bb['niu_proto'].ready();
    },

    _onBtnLeftMenuTouchEnd(sender) {
        bb.loader.loadRes('niuniu/LeftMenu/LeftMenu', cc.Prefab, function(prefab) {
            let new_node = cc.instantiate(prefab);
            this.node.addChild(new_node);
        }.bind(this));
    }
});