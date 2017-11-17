const HallEvent = require("HallEvent");
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad () {
        bb.ui.bindComponent(this);
        bb['niu_proto'] = require('niu_proto'); 
        bb['room'] = require('NRoom');
        HallEvent.getInstance().initObserver();
    },

    _onBtnReturnTouchEnd(sender) {
        bb.loader.destroy(this.node);
    },

    joinGoldRoom(level){
        cc.log('进入金币场');
        bb["niu_proto"].joinNiuNiuGoldZone(level);
    },

    _onBtnSessionTouchEnd(sender) {
        sender.getComponent(cc.Button).interactable = false;
        cc.log(sender.$)
        switch(parseInt(sender.$)) {
            case 1:
            case 2:
            case 3:
            case 4:
                this.joinGoldRoom(sender.$);
                break;
            case 5:
            case 6:
                cc.log("暂时未开放");
                break;
            default:
                cc.log("未知按键");
                break;
        }
    },
});
