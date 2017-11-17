const BACK_HALL = "1";
const CARD_DES = "2";
const EXCHANGE_DISK = "3";
const USER_SETTING = "4";
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad() {
        bb.ui.bindComponent(this);
    },

    _onBtnitem(sender) {
        switch (sender.$) {
            case BACK_HALL:
                break;
            case CARD_DES:
                break;
            case EXCHANGE_DISK:
                break;
            case USER_SETTING:
                break;
        }
    }



});
