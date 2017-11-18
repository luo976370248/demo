function joinNiuNiuGoldZone(level) {
    bb.net.send_cmd(bb.stype.NiuNiu, bb.cmd.NiuNiu.ENTER_ZONE, level);
}
function ready() {
    //
    bb.net.send_cmd(bb.stype.NiuNiu, bb.cmd.NiuNiu.READY, 1);
}

function snatchBlank(data) {
    // // [是否抢庄]
    bb.net.send_cmd(bb.stype.NiuNiu, bb.cmd.NiuNiu.SNATCH_BLANK, [data]);
}

function snatchBate(data) {
    // // [是否抢庄]
    bb.net.send_cmd(bb.stype.NiuNiu, bb.cmd.NiuNiu.SELECT_MULTIPLE, [data]);
}


module.exports = {
    joinNiuNiuGoldZone: joinNiuNiuGoldZone,
    ready: ready,
    snatchBlank: snatchBlank,
    snatchBate: snatchBate,
}