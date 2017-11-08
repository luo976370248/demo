const UserEventName = {
    "LOGIN_SUCCESS": "LOGIN_SUCCESS",
    "LOGIN_FAILE": "LOGIN_FAILE",
}

const UserEvent = cc.Class({
    extends: bb.event,
});


var UserModule = {
    nick: null,
    uid: null,
    usex: 0,
    uface: null,
    gold: 0,
    room_card: 0,

    setLoginUserInfo(data) {
        if (data.status != bb.respones.OK) {
            UserModule.Event.notifyEvent(UserEventName.LOGIN_FAILE);
            return;
        }
        this.nick = data['unick'];
        this.uid = data['uid'];
        this.uface = data['uface'];
        this.room_card = data['uroomCard'];
        this.ugold = data['ugold'];

        bb.db.setGusetKey(data['ukey']);
        UserModule.Event.notifyEvent(UserEventName.LOGIN_SUCCESS);
    }
}

UserModule.EventName = UserEventName;
UserModule.Event = new UserEvent();

module.exports = UserModule;