const HallEvent = require('./HallEvent');
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad () {
        bb.ui.bindComponent(this); 
        this.initUI();
        HallEvent.getInstance().initEvent();
    },

    initUI() {
        this._labUid.getComponent(cc.Label).string = bb.user.uid + "";
        this._labUnick.getComponent(cc.Label).string = bb.user.nick + "";
        this._labGem.getComponent(cc.Label).string = bb.user.room_card + "";
        this._labGold.getComponent(cc.Label).string = bb.user.gold + "";

        cc.loader.load(bb.user.uface, (err, texture) => {
            if (err) {
                cc.log(err);
            } else {
                var spriteFrame = new cc.SpriteFrame(texture);
                this._head.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
    },

    _onBtnCreateRoomTouchEnd(sender) {
        bb.loader.loadRes('hall/createRoom/CreateRoom', cc.Prefab, function(prefab) {
            let new_node = cc.instantiate(prefab);
            this.node.addChild(new_node);
        }.bind(this));
    },

    _onBtnJoinRoomTouchEnd(sender) {
        bb.loader.loadRes('hall/joinRoom/JoinRoom', cc.Prefab, function(prefab) {
            let new_node = cc.instantiate(prefab);
            this.node.addChild(new_node);
        }.bind(this));
    },

    _onBtnGoldNiuNiuTouchEnd(sender) {
        bb.loader.loadRes('hall/selectSession/selectNiuSession', cc.Prefab, function(prefab) {
            let new_node = cc.instantiate(prefab);
            this.node.addChild(new_node);
        }.bind(this));
    }
  
});
