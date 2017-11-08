const HallEvent = require('./HallEvent');
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    
    onLoad () {
        this.list = [];
        bb.ui.bindComponent(this);
    },

    _onBtnCloseTouchEnd(event) {
        bb.loader.destroy(this.node);
    },

    _onBtnKeyTouchEnd(sender) {
        if (parseInt(sender.$) < 10) {
            if (this.list.length < 6) {
                this.list.push(parseInt(sender.$));
            }
        } else if(parseInt(sender.$) == 11){
            return;
        } else if(parseInt(sender.$) == 12){
            if (this.list.length == 0) {
                return;
            }
            this['_lab' + (this.list.length)].getComponent(cc.Label).string = "__";
            this.list.splice(this.list.length - 1, 1);
        }

        this.list.forEach(function(item, index) {
            this['_lab' + (index + 1)].getComponent(cc.Label).string = item;
        }.bind(this));

        if (this.list.length == 6) {
            let roomid = this.list[0] * 100000;
            let roomidx = 100000;
            for (let i = 1; i < 6; i++){
                roomidx = roomidx / 10;
                roomid = roomid + roomidx * this.list[i];
            }
            bb['room'] = require('NRoom');
            HallEvent.getInstance().initObserver();

            bb.hall.joinNiuNiuRoom(roomid);
        }
    }

});
