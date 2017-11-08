const LoginEvent = require('./LoginEvent');
var PERSIST_COUNT = 0;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad () {
        bb.ui.bindComponent(this); 
        bb.db.init();
        // 增加一个常驻节点
        this.init_persist();
        LoginEvent.getInstance().initEvent();
    },

    init_persist() {
        if (PERSIST_COUNT >= 1) {
            return;
        }

        var scene = cc.director.getScene();
        var node = new cc.Node('PERSIST_NODE');

        node.addComponent('MemoryDetector'); 
        node.addComponent('SceneDetector');

        scene.addChild(node);
        cc.game.addPersistRootNode(node);
        PERSIST_COUNT++;
    },

    _onBtnVisitorTouchEnd() {
        console.log('游客登录');
        bb.auth.guest_login();
        // bb.scene.getInstance().runScene('hall')
    },

    _onBtnLoginTouchEnd() {
        console.log('微信登录');
    },
});
