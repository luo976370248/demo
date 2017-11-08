function _isNull(texture) {
    if (texture) {
        if (texture.bk_retain == undefined || texture.bk_retain == null) {
            texture.bk_retain = 1;
            return false;
        } else {
            return true;
        }

    }
    return false;
}

var key_map = {};

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        // 加载新场景触发的事件
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.before_scene_loading);

        // 运行新场景之后所触发的事件
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.after_scene_launch);

    },

    before_scene_loading(event, detail) {
        // 引用计数减一
        key_map = {};
        var dependAssets = event.currentTarget._scene.dependAssets;
        if (dependAssets && dependAssets.length > 0) {
            for (var i = 0; i < dependAssets.length; i++) {
                if (cc.loader._cache[dependAssets[i]] && cc.loader._cache[dependAssets[i]].is_static) {
                    key_map[i] = dependAssets[i];
                    delete dependAssets[i];
                }

                if (_isNull(cc.loader._cache[dependAssets[i]])) {
                    cc.loader._cache[dependAssets[i]].bk_retain -= 1;
                }

            }
        }

        
        var keys = Object.keys(cc.loader._cache);
        keys.forEach((key) => {
            if (cc.loader._cache[key] && !cc.loader._cache[key].is_static &&  cc.loader._cache[key].bk_retain > 0) {
                if (_isNull(cc.loader._cache[key])) {
                    cc.loader._cache[key].bk_retain = 0;
                }
            }
        });
    },

    after_scene_launch(event, detail) {
        // 引用计数加一
        for (var key in key_map) {
            event.currentTarget._scene.dependAssets[key] = key_map[key];
        }
        var dependAssets = event.currentTarget._scene.dependAssets;
        if (dependAssets && dependAssets.length > 0) {
            for (var i = dependAssets.length - 1; i >= 0; i--) {
                if (cc.loader._cache[dependAssets[i]] && cc.loader._cache[dependAssets[i]].is_static) {
                    continue;
                }

                if (_isNull(cc.loader._cache[dependAssets[i]])) {
                    cc.loader._cache[dependAssets[i]].bk_retain += 1;
                }

            }
        }

        bb.loader.startAutoRelease(-1);
    },
});