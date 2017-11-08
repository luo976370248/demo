const KEY = {
    'GUEST_KEY': 'guest_key'
}

const db = {
    guset_key: null,

    init() {
        if (cc.sys.localStorage.getItem(KEY.GUEST_KEY) || cc.sys.localStorage.getItem(KEY.GUEST_KEY) !== '-1') {
            this.guset_key = cc.sys.localStorage.getItem(KEY.GUEST_KEY);
        } else {
            this.guset_key = null;
        }
    },

    setGusetKey(ukey) {
        cc.sys.localStorage.setItem(KEY.GUEST_KEY, ukey);
    }
}

module.exports = db;