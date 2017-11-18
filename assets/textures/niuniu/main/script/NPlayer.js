const NConstant = require('./NConstant');

cc.Class({
    extends: cc.Component,

    properties: {
        card_pos_list: {
            visible: false,
            default: [],
        },
        index: 0,
    },


    onLoad() {
        bb.ui.bindComponent(this);
        this.initUI();
        this.initData();
    },

    initUI() {
        for (let i = 1; i <= 5; i++) {
            this.card_pos_list.push(this['_card' + i].getPosition());
            this['_card' + i].active = false;
        }
        this["_state"].active = false;
        this._headNode.active = false;
        this["_iconZhuang"].active = false;
        this["_iconBlank"].active = false;
        this["_labscore"].active = false;
        
    },

    // 初始化用户数据
    initData() {
        if (bb.room.playerList[this.index]) {
            this._headNode.active = true;
            this['_nick'].getComponent(cc.Label).string = bb.room.playerList[this.index].nick;
            this['_gold'].getComponent(cc.Label).string = bb.room.playerList[this.index].gold;

            cc.loader.load(bb.room.playerList[this.index].face, (err, texture) => {
                if (err) {
                    cc.log(err);
                } else {
                    var spriteFrame = new cc.SpriteFrame(texture);
                    this._head.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            });

            switch (bb.room.gameState) {
                case NConstant.GAME_STATE.INIT:
                    this.initGameInit();
                    break;
                case NConstant.GAME_STATE.SNATCH_BLANK:
                    this.initGameSnatchBlank();
                    break;
                case NConstant.GAME_STATE.SELECT_MULTIPLE:
                    this.initGameMultiple();
                    break;
            }
        
           
        }
    },


    // 初始化玩家准备阶段
    initGameInit() {
        this["_state"].active = true;
        if (bb.room.playerList[this.index].ready) {
            this['_state'].getComponent(cc.Label).string = "已准备";
        } else {
            if (this.index != 0) {
                this['_state'].getComponent(cc.Label).string = "未准备";
            } else {
                this["_state"].active = false;
            }
        }
    },

    // 初始化玩家 抢庄阶段
    initGameSnatchBlank() {
        this["_state"].active = false;
        switch (bb.room.playerList[this.index].multiple) {
            case NConstant.SNATCH_BLANK.BLANK:
                this["_state"].active = true;
                this['_state'].getComponent(cc.Label).string = "抢庄";
                this.showCaradBack();
                break;
            case NConstant.SNATCH_BLANK.NOT_BLANK:
                this["_state"].active = true;
                this['_state'].getComponent(cc.Label).string = "不抢";
                this.showCaradBack();
                break;
            case NConstant.SNATCH_BLANK.SUPER_BLANK:
                this["_state"].active = true;
                this['_state'].getComponent(cc.Label).string = "超级抢庄";
                this.showCaradBack();
                break;
            default:
                let idx = bb.room.playGameList.indexOf(bb.room.playerList[this.index]['uid']);
                if (idx >= 0) {
                    this.showCaradBack();
                }
                break;
        }
    },

    // 初始化玩家 下注阶段
    initGameMultiple() {
        this["_labscore"].active = false;
        if (!bb.room.playerList[this.index].bate) {
            return;
        }

        if (bb.room.playerList[this.index].bate > 0) {
            this["_labscore"].active = true;
            this['_labscore'].getComponent(cc.Label).string = "X" + bb.room.playerList[this.index].bate;
            this.showCaradBack();
        } else {
            this.showCaradBack();
        }
        
    },

    // 显示牌背
    showCaradBack() {
        let player = bb.room.playerList[this.index];
        let isGamePlayer = bb.room.playGameList.indexOf(player['uid']);
        if (isGamePlayer < 0) {
            return;
        }

        for (let i = 1; i <= 5; i++) {
            this['_card' + i].active = true;
        }
    },

    // 准备
    setReady(ready) {
        if (ready) {
            this['_state'].active = true;
            this['_state'].getComponent(cc.Label).string = "已准备";
        }
    },

    initState() {
        this['_state'].active = false;
    },

    // 发牌
    sendCardAction() {
        if (!bb.room.playerList[this.index]) {
            return;
        }
        if (!bb.room.playerList[this.index].ready) {
            return;
        }

        let player = bb.room.playerList[this.index];
        let isGamePlayer = bb.room.playGameList.indexOf(player['uid']);
        if (isGamePlayer < 0) {
            return;
        }


        for (let i = 1; i <= 5; i++) {
            this['_card' + i].active = true;
            this['_card' + i].setPosition(cc.p(0, 0));
            this['_card' + i].setScale(0.5);
        }

        for (let i = 1; i <= 5; i++) {
            let moveTo = cc.moveTo(0.1, this.card_pos_list[i - 1]);
            let scaleTo = cc.scaleTo(0.1, 1);
            this['_card' + i].runAction(cc.spawn(moveTo, scaleTo));
        }
    },

    // 抢庄
    snatchBlank(rob) {
        this['_state'].active = true;
        if (rob == NConstant.SNATCH_BLANK.BLANK) {
            this['_state'].getComponent(cc.Label).string = "抢庄";
        } else if (rob == NConstant.SNATCH_BLANK.NOT_BLANK) {
            this['_state'].getComponent(cc.Label).string = "不抢";
        } else if (rob == NConstant.SNATCH_BLANK.SUPER_BLANK) {
            this['_state'].getComponent(cc.Label).string = "超级抢庄";
        }

    },

    // 下注
    snatchBate(bate) {
        this['_labscore'].active = true;
        this['_labscore'].getComponent(cc.Label).string = bate + "分";
    },


    // 抢庄结束
    showBlankAction(flag) {
        this["_iconBlank"].active = flag;
    },

    showIconZhuang(flag) {
        this["_iconZhuang"].active = flag;
    }




});
