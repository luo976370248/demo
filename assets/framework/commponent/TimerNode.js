cc.Class({
    extends: cc.Component,

    properties: {
        timer: 10,
    },

    onLoad() {
        this.node.getComponent(cc.Label).string = this.timer + "";
        this.schedule(this.updateTimer, 1);
    },

    updateTimer() {
        if (this.timer <= 0) {
            this.unschedule(this.updateTimer);
        }
        this.node.getComponent(cc.Label).string = this.timer + "";
        this.timer--;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
