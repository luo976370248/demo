cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    
    onLoad() {
        bb.ui.bindComponent(this); 
    },

    _onItemBateTouchEnd(sender) {
        this.node.active = false;
        bb['niu_proto'].snatchBate(parseInt(sender.$));
        
    }
});
