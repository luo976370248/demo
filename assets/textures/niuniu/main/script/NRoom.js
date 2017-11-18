const NConstant = require('./NConstant');

const NiuEventName = {
    "JOIN_ROOM_SUCCESS": "JOIN_ROOM_SUCCESS",
    "JOIN_ROOM_FAILE": "JOIN_ROOM_FAILE",
    "PLAYER_READY_SUCCESS": "PLAYER_READY_SUCCESS",
    "PLAYER_READY_FAILE": "PLAYER_READY_FAILE",
    "START_GAME": "START_GAME",
    "SNATCH_BLANK_START": "SNATCH_BLANK_START",
    "SNATCH_BLANK": "SNATCH_BLANK",
    "SNATCH_BLANK_RESULT": "SNATCH_BLANK_RESULT",
    "SELECT_MULTIPLE_START": "SELECT_MULTIPLE_START",
    "SELECT_MULTIPLE": "SELECT_MULTIPLE",
    "SELECT_MULTIPLE_RESULT": "SELECT_MULTIPLE_RESULT",
    "START_CALCULATE_CATTLE": "START_CALCULATE_CATTLE",
    "CALCULATE_CATTLE": "CALCULATE_CATTLE",
    "CALCULATE_CATTLE_RESULT": "CALCULATE_CATTLE_RESULT",
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
    blankUidlist: [], // 同等级的抢庄玩家
    playGameList: [], // 在游戏中的玩家列表
    blankUid: -1, // 庄家的UID
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
        this.playGameList = data[6];
        this.blankUid = data[7]
        this.playerList = [];
        data[4].forEach((item, index) => {
            if (item) {
                let p = {};
                p['uid'] = item[0];
                p['nick'] = item[1];
                p['sex'] = item[2];
                p['face'] = item[3];
                p['gold'] = item[4];
                p['multiple'] = item[5];
                p['ready'] = item[6];
                p['online'] = item[7];
                p['cardList'] = item[8];
                p['bate'] = item[9];
                this.playerList.push(p);
            } else {
                this.playerList.push(null);
            }

        });

        this.sortPlayerLocalSeat();
    
        NiuRoomModule.Event.addCache(NiuEventName.JOIN_ROOM_SUCCESS);
        // NiuRoomModule.Event.notifyEvent();
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
        NiuRoomModule.Event.addCache(NiuEventName.START_GAME);
        // NiuRoomModule.Event.notifyEvent(NiuEventName.START_GAME, data);
    },

    // 开始抢庄
    setStartRobZhuang(data) {
        this.gameState = NConstant.GAME_STATE.SNATCH_BLANK;
        NiuRoomModule.Event.addCache(NiuEventName.SNATCH_BLANK_START, data);
       //  NiuRoomModule.Event.notifyEvent(NiuEventName.SNATCH_BLANK_START, data);
    },

    // 抢庄
    setRobZhuang(data) {
        this.blank_list = data;
        NiuRoomModule.Event.notifyEvent(NiuEventName.SNATCH_BLANK, data);
    },

    // 抢庄结束
    setRobZhuangEnd(data) {
        // [庄家，同等级的抢庄玩家]
        this.blankUid = data[0];
        this.blankUidlist = data[1];
        NiuRoomModule.Event.addCache(NiuEventName.SNATCH_BLANK_RESULT);
    },

    // 开始选择倍数
    selectMultipleStart() {
        this.gameState = NConstant.GAME_STATE.SELECT_MULTIPLE;
        NiuRoomModule.Event.addCache(NiuEventName.SELECT_MULTIPLE_START);
    },

    // 选择倍数
    selectMultiple(body) {
        // [uid, 倍数]
        let p = bb.room.getPlayerInfoByUid(body[0])
        p['bate'] = body[2];
        NiuRoomModule.Event.addCache(NiuEventName.SELECT_MULTIPLE, body);
    },

    // 开始算牛
    startCalculateCattle() {
        this.gameState = NConstant.GAME_STATE.SUAN_NIU;
        
        NiuRoomModule.Event.addCache(NiuEventName.START_CALCULATE_CATTLE);
        // 
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