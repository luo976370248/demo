const HallEvent =require('HallEvent');
cc.Class({
    extends: cc.Component,

    properties: {
        d_inning: 0, // 局数
        d_number: 0, // 人数
        d_cost: 0, // 房费支付
        d_banker: 0, // 庄家选择
        d_multiple: 0, // 倍数
    },

   

    onLoad() {
        bb.ui.bindComponent(this);
        this.initNiuNiuUI();
    },

    initNiuNiuUI() {
        this.d_inning = 0;
        this.d_number = 0;
        this.d_room = 0;
        this.d_banker = 0;
        this.d_multiple = 0;
    },

    // _btnClose _onBtnVisitorTouchEnd
    _onBtnCloseTouchEnd(event) {
        bb.loader.destroy(this.node);
    },

    // 局数选择
    _onInningTouchEnd(event) {
        this.d_inning = event.$;
    },

    // 人数选择
    _onNumberTouchEnd(event) {
        this.d_number = event.$;
    },

    // 支付选择
    _onRoomTouchEnd(event) {
        this.d_cost = event.$;
    },

    // 庄家选择
    _onBankerTouchEnd(event) {
        this.d_banker = event.$;
    },

    // 倍数选择
    _onMultipleTouchEnd(event) {
        this.d_multiple = event.$;
    },

    makeSuer() {
        // this.d_inning = 0;
        // this.d_number = 0;
        // this.d_room = 0;
        // this.d_banker = 0;
       // this.d_multiple = 0;
    },
    
    createNiuNiuRoom() {
        var data = [];
        data[0] = 0;
        data[1] = this.d_inning;
        data[2] = this.d_number;
        data[3] = this.d_cost;
        data[4] = this.d_banker;
        data[5] = this.d_multiple;
        bb['room'] = require('NRoom');
        HallEvent.getInstance().initObserver();
        bb.hall.createNiuNiuRoom(data);
       
    },

    _onBtnCreateRoomTouchEnd() {
        this.createNiuNiuRoom();
    }

  
});
