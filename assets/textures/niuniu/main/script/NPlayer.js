cc.Class({
    extends: cc.Component,

    properties: {
        card_pos_list: {
            visible: false,
            default: [],
        },
        index: 0,
    },
    
   
    onLoad () {
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
    },

    // 初始化用户数据
    initData() {
        if (bb.room.playerList[this.index]) {
            this._headNode.active = true;
            this['_nick'].getComponent(cc.Label).string = bb.room.playerList[this.index].nick;
            this['_gold'].getComponent(cc.Label).string = bb.room.playerList[this.index].gold;
    

            if (bb.room.gameState == 1) {
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
            } else {
                this["_state"].active = false;
            }

            cc.loader.load(bb.room.playerList[this.index].face, (err, texture) => {
                if (err) {
                    cc.log(err);
                } else {
                    var spriteFrame = new cc.SpriteFrame(texture);
                    this._head.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            });
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
        for (let i = 1; i <= 5; i++) {
            this['_card' + i].active = true; 
            this['_card' + i].setPosition(cc.p(0, 0));
            this['_card' + i].setScale(0.5);
        }

        for(let i = 1; i <= 5; i++) {
            let moveTo = cc.moveTo(0.1, this.card_pos_list[i-1]);
            let scaleTo = cc.scaleTo(0.1, 1);
            this['_card' + i].runAction(cc.spawn(moveTo, scaleTo));
        }
    },

    // 抢庄
    snatchBlank(rob) {
        this['_state'].active = true;
        if (rob == 2) {
            this['_state'].getComponent(cc.Label).string = "抢庄";
        } else if (rob == 1){
            this['_state'].getComponent(cc.Label).string = "不抢";
        } else if (rob == 3) {
            this['_state'].getComponent(cc.Label).string = "超级抢庄";
        }
        
    },

   
    // 抢庄结束
    


   
});
