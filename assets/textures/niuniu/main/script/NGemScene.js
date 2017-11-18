const NGameEvent = require("./NGameEvent");
const NConstant = require('./NConstant');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad () {
        bb.ui.bindComponent(this); 

        // 加载资源
        NGameEvent.getInstance().initEvent(this);
        bb.room.Event.is_cache = true;
        bb.loader.loadRes("niuniu/Player/Player5", cc.Prefab, function(prefab) {
            let new_node = cc.instantiate(prefab);
            this.node.addChild(new_node);
            new_node.children.forEach((item, index) => {
                this[`_player${index + 1}`] = item;
            })
            this.initRoom();
        }.bind(this));
    
    },
    initRoom() {
        if (bb.room.gameState == NConstant.GAME_STATE.INIT && !bb.room.playerList[0].ready) {
            this['_btnReady'].active = true;
        }

        if (bb.room.gameState == NConstant.GAME_STATE.SNATCH_BLANK && bb.room.playerList[0].multiple < 1) {
            this.startRobZhuang();
        }

        if (bb.room.gameState == NConstant.GAME_STATE.SELECT_MULTIPLE && bb.room.playerList[0].bate < 0) {
            this.selectMultipleStart();
            
        }

        bb.room.Event.notifyCache("初始化房间后");
    },

    // 有玩家进入房间
    joinRoom() {
        for (let i = 1; i <= bb.room.player_count; i++) {
            this['_player' + i].getComponent('NPlayer').initData();
        }
    
        if (bb.room.gameState == NConstant.GAME_STATE.INIT && bb.room.playerList[0].state == 1) {
            this['_btnReady'].active = true;
        }

        if (bb.room.gameState == NConstant.GAME_STATE.SNATCH_BLANK && bb.room.playerList[0].multiple < 1) {
            this.startRobZhuang();
        }

        if (bb.room.gameState == NConstant.GAME_STATE.SELECT_MULTIPLE && bb.room.playerList[0].bate < 0) {
            this.selectMultipleStart();
        }

        bb.room.Event.notifyCache("有玩家进入后");
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
        this.scheduleOnce(() => {
            bb.room.Event.notifyCache("执行发牌动画");
        }, 2);
       
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
        bb.room.Event.notifyCache("startRobZhuang");
    },

    robZhuang(uid, rob) {
        let idx = bb.room.getPlayerSeatByUid(uid);
        if (idx != -1) {
             this['_player' + (idx + 1)].getComponent('NPlayer').snatchBlank(rob);
        }

        if (idx == 0) {
            this.node.getChildByName('RobZhuang').active = false;
        }
    },

    robZhuangResult() {
        // 播放抢庄的动画
        bb.room.Event.is_cache = true;
        let playerNodeList1 = [];
        let playerNodeList2 = [];
        let flag = false;
        bb.room.blankUidlist.forEach(uid => {
            let seat = bb.room.getPlayerSeatByUid(uid);
            if (uid == bb.room.blankUid || flag) {
                flag = true;
                playerNodeList1.push(this[`_player${seat + 1}`]);
            } else {
                playerNodeList2.push(this[`_player${seat + 1}`]);
            }
           
        })

        playerNodeList1 = playerNodeList1.concat(playerNodeList2);

        this.blankActionId = 0;
        
        this.schedule(function(){
            this.showBlankAction(playerNodeList1);
        }.bind(this), 0.3, 4 * playerNodeList1.length);

        this.scheduleOnce(() => {
            playerNodeList1[0].getComponent('NPlayer').showBlankAction(false);
            playerNodeList1[0].getComponent('NPlayer').showIconZhuang(true);
            bb.room.Event.notifyCache("抢庄结果结束动画");
        }, playerNodeList1.length * 5 * 0.3);
    },

    showBlankAction(playerNodeList1) {
        if (this.blankActionId > playerNodeList1.length - 1) {
            this.blankActionId = 0;
        }
        playerNodeList1.forEach(item => item.getComponent('NPlayer').showBlankAction(false));
        playerNodeList1[this.blankActionId].getComponent('NPlayer').showBlankAction(true);
        this.blankActionId++;
    },

    // 开始下注
    selectMultipleStart() {
        this.node.getChildByName('RobZhuang').active = false;

        for(let i = 1; i <= 5; i++) {
            this[`_player${i}`].getComponent('NPlayer').initState();
        }

        if (bb.room.blankUid == bb.room.playerList[0]['uid']) {
            bb.room.Event.notifyCache("开始下注");
            return;
        }

        let bataNode = this.node.getChildByName('Bet');
        if (bataNode) {
            bataNode.active = true;
        } else {
            bb.loader.loadRes('niuniu/Bet/Bet', cc.Prefab, function(prefab) {
                let new_node = cc.instantiate(prefab);
                this.node.addChild(new_node);
            }.bind(this));
        }
        bb.room.Event.notifyCache("开始下注");
    },

    selectMultiple(uid, bate) {
        let idx = bb.room.getPlayerSeatByUid(uid);
        if (idx != -1) {
             this['_player' + (idx + 1)].getComponent('NPlayer').snatchBate(bate);
        }
    },

    startCalculateCattle() {
        this.node.getChildByName('Bet').active = false;
        let calculateNode = this.node.getChildByName('CalculateCattle');
        if (calculateNode) {
            calculateNode.active = true;
        } else {
            bb.loader.loadRes('niuniu/CalculateCattle/CalculateCattle', cc.Prefab, function(prefab) {
                let new_node = cc.instantiate(prefab);
                this.node.addChild(new_node);
            }.bind(this));
        }
        bb.room.Event.notifyCache("开始算牛");
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