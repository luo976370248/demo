function createNiuNiuRoom(data) {
    // // [游戏类型，局数，几人房，付费方式，庄家选择，倍数]
    bb.net.send_cmd(bb.stype.NiuNiu, bb.cmd.NiuNiu.CREATE_ROOM, data);
}

function joinNiuNiuRoom(roomid) {
    // // [游戏类型，局数，几人房，付费方式，庄家选择，倍数]
    bb.net.send_cmd(bb.stype.NiuNiu, bb.cmd.NiuNiu.JOIN_ROOM, roomid);
}

module.exports = {
    createNiuNiuRoom: createNiuNiuRoom,
    joinNiuNiuRoom: joinNiuNiuRoom,
}