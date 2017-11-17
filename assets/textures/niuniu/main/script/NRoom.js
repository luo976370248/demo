
const NiuEventName = {
    "JOIN_ROOM_SUCCESS": "JOIN_ROOM_SUCCESS",
    "JOIN_ROOM_FAILE": "JOIN_ROOM_FAILE",
    "PLAYER_READY_SUCCESS": "PLAYER_READY_SUCCESS",
    "PLAYER_READY_FAILE": "PLAYER_READY_FAILE",
    "START_GAME": "START_GAME",
    "SNATCH_BLANK_START": "SNATCH_BLANK_START",
    "SNATCH_BLANK": "SNATCH_BLANK",
}

const NiuEvent = cc.Class({
    extends: bb.event,
});


var NiuRoomModule = {
    room_id: -1,
    play_count: -1,
    player_count: -1,
    cost: -1,
    banks: -1,
    multiple: -1,
    playerList: [],
    blank_list: [],

    // 进入房间
    setJoinRoom(data) {
        if (data[0] != bb.respones.OK) {
            NiuRoomModule.Event.notifyEvent(NiuEventName.JOIN_ROOM_FAILE);
        }
        // [状态码，底数，人数，房间类型， 玩家信息，游戏的状态]
        this.bate = data[1];
        this.player_count = data[2];
        this.room_type = data[3]
        this.gameState = data[5];
        this.playerList = [];
        data[4].forEach((item, index) => {
            if (item) {
                let p = {};
                p['uid'] = item[0];
                p['nick'] = item[1];
                p['sex'] = item[2];
                p['face'] = item[3];
                p['gold'] = item[4];
                p['room_card'] = item[5];
                p['ready'] = item[6];
                p['online'] = item[7];
                this.playerList.push(p);
            } else {
                this.playerList.push(null);
            }

        });

        this.sortPlayerLocalSeat();
    
        NiuRoomModule.Event.notifyEvent(NiuEventName.JOIN_ROOM_SUCCESS);
    },

    // 准备
    // [uid, ready]
    setUserReady(data) {
        let p = this.getPlayerInfoByUid(data[0]);
        if (p) {
            p['ready'] = data[1];
            NiuRoomModule.Event.notifyEvent(NiuEventName.PLAYER_READY_SUCCESS, data);
        } else {
            NiuRoomModule.Event.notifyEvent(NiuEventName.PLAYER_READY_FAILE, data);
        }
    },

    // 游戏开始
    setStartGame(data) {
        this.gameState = 2;
        NiuRoomModule.Event.notifyEvent(NiuEventName.START_GAME, data);
    },

    setStartRobZhuang(data) {
        this.gameState = 3;
        NiuRoomModule.Event.notifyEvent(NiuEventName.SNATCH_BLANK_START, data);
    },

    setRobZhuang(data) {
        this.blank_list = data;
        NiuRoomModule.Event.notifyEvent(NiuEventName.SNATCH_BLANK, data);
    },

    getPlayerInfoByUid(uid) {
        for (let i = 0; i < this.playerList.length; i++) {
            let p = this.playerList[i];
            if (p && p['uid'] == uid) {
                return p;
            }
        }
        return null;
    },

    getPlayerSeatByUid(uid) {
        for (let i = 0; i < this.playerList.length; i++) {
            let p = this.playerList[i];
            if (p && p['uid'] == uid) {
                return i;
            }
        }
        return -1;
    },

    sortPlayerLocalSeat() {
        var my_index;
        this.playerList.forEach((item, index) => {
            if (item && bb.user['uid'] === item['uid']) {
                my_index = index;
            }
        });

        var new_player_seats = [];
        for (var i = my_index; i < this.playerList.length; i++) {
            new_player_seats.push(this.playerList[i]);
        }

        for (var i = 0; i < my_index; i++) {
            new_player_seats.push(this.playerList[i]);
        }
        this.playerList = new_player_seats;
    }
}

NiuRoomModule.EventName = NiuEventName;
NiuRoomModule.Event = new NiuEvent();

module.exports = NiuRoomModule;