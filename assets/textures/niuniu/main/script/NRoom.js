
const NiuEventName = {
    "JOIN_ROOM_SUCCESS": "JOIN_ROOM_SUCCESS",
    "JOIN_ROOM_FAILE": "JOIN_ROOM_FAILE",
}

const NiuEvent = cc.Class({
    extends: bb.event,
});


var NiuRoomModule = {
    room_id : -1,
    play_count : -1,
    player_count : -1,
    cost : -1,
    banks: -1,
    multiple: -1,
    playerList: [],
    // [状态码，房间号，局数，人数，付费方式，庄家，倍数选择 玩家信息]
    // [玩家uid， 玩家昵称，玩家性别，玩家头像， 玩家金币，玩家房卡， 玩家状态， 玩家是否在线]
    setJoinRoom(data) {
        if (data[0] != bb.respones.OK) {
            NiuRoomModule.Event.notifyEvent(NiuEventName.JOIN_ROOM_FAILE);
        }

        this.room_id = data[1];
        this.play_count = data[2];
        this.player_count = data[3];
        this.cost = data[4]
        this.banks = data[5];
        this.multiple = data[6];

        data[7].forEach((item, index) => {
            if (item) {
                let p = {};
                p['uid'] = item[0];
                p['nick'] = item[1];
                p['sex'] = item[2];
                p['face'] = item[3];
                p['gold'] = item[4];
                p['room_card'] = item[5];
                p['state'] = item[6];
                p['online'] = item[7];
                this.playerList.push(p);
            } else {
                this.playerList.push(null);
            }
          
         });

         NiuRoomModule.Event.notifyEvent(NiuEventName.JOIN_ROOM_SUCCESS);
    }
}

NiuRoomModule.EventName = NiuEventName;
NiuRoomModule.Event = new NiuEvent();

module.exports = NiuRoomModule;