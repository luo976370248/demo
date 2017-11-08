const NGameEvent = require("./NGameEvent");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad () {
        bb.ui.bindComponent(this); 
        NGameEvent.getInstance().initEvent(this);
    },

    // 有玩家进入房间
    joinRoom() {
        for (let i = 1; i < bb.room.player_count; i++) {
            this['_player' + i].getComponent('NPlayer').initData();
        }
    }
});