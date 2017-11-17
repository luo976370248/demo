cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    
    onLoad() {
        bb.ui.bindComponent(this); 
    },

    _onItemRobTouchEnd(sender) {
        switch(parseInt(sender.$)) {
            case 1: // 不抢
                bb['niu_proto'].snatchBlank(1);
                break;
            case 2: // 抢庄
                bb['niu_proto'].snatchBlank(2);
                break;
            case 3: // 超级抢庄
                bb['niu_proto'].snatchBlank(3);
                break;
        }
        this.node.active = false;
    }
});
