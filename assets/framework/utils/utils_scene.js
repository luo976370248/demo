const SceneManager = cc.Class({
    sceneManager: null,
    loadGameScene: false, // 标记场景是否在加载
    statics: {
        getInstance() {
            if (!this.sceneManager) {
                this.sceneManager = new SceneManager();
            }
            return this.sceneManager;
        },
    },

    addPersistRootNode(node) {
        cc.game.addPersistRootNode(node);
    },

    removePersistRootNode(node) {
        cc.game.removePersistRootNode(node);
    },

    runScene(sceneName, data, fun) {
        if (cc.director.getScene().sceneName && (cc.director.getScene().sceneName === sceneName)) {
            return;
        }

        if (this.loadGameScene) {
            return;
        }

        this.loadGameScene = true;
        cc.director.preloadScene(sceneName, () => {
            cc.director.loadScene(sceneName, () => {
                cc.director.getScene().sceneName = sceneName;
                cc.director.getScene().data = data;
                this.loadGameScene = false;
                if (fun) {
                    fun();
                }

            });
        });
    },
});

module.exports = SceneManager;