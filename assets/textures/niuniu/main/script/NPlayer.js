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
        this._headNode.active = false;
        
    },

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
        }
    }

   
});
