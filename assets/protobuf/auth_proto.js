function guest_login() {
    var key = bb.db.guset_key; // 从本地获取，如果没有获取的自动生成32位的ukey
    if (!key) {
        key = bb.format.random_string(32);
    }

    bb.net.send_cmd(bb.stype.Auth, bb.cmd.Auth.GUEST_LOGIN, key);
}

module.exports = {
    guest_login: guest_login,
}