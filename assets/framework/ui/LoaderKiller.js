const TimeTake = {
    startTimes: {},

    start(tag) {
        this.startTimes.tag = new Date().getMilliseconds();
    },

    end(tag) {
        // bb.log1(`${tag} 耗时 ${(new Date().getMilliseconds() - this.startTimes.tag) / 1000.0}`);
    },
}

// 深拷贝一个对象
function deepCloneObj(obj) {
    var i;
    var o = Array.isArray(obj) ? [] : {};
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === "Object" ? deepCloneObj(obj[i]) : obj[i];
        }
    }
    return o;
}


function _isNullObj(texture) {
    if (texture) {
        return true;
    }
    return false;
}

function _parseStaticRes(item, tag) {
    if (item instanceof cc.Texture2D) {

        cc.loader._cache[item.url].is_static = true;
        cc.loader._cache[item.url].cus_tag = tag;
    } else if (item instanceof cc.SpriteFrame) {
        cc.loader._cache[item._textureFilename].is_static = true;
        cc.loader._cache[item._textureFilename].cus_tag = tag;
    } else if (item instanceof cc.Prefab) {
        _parsePrefab(item, tag);
    } else if (item instanceof cc.BitmapFont) {
        cc.loader._cache[item.spriteFrame._textureFilename].is_static = true;
        cc.loader._cache[item.spriteFrame._textureFilename].cus_tag = tag;
    } else if (item instanceof cc.SpriteAtlas) {
        var keys = Object.keys(item._spriteFrames)
        keys.forEach((key) => {
            cc.loader._cache[item._spriteFrames[key]._textureFilename].is_static = true;
            cc.loader._cache[item._spriteFrames[key]._textureFilename].cus_tag = tag;
        });

    } else if (item instanceof cc.AnimationClip) {
        cc.log('AnimationClip 资源加载未做处理');
    } else if (item instanceof Object && item.name) {
        cc.log('Object 资源加载未做处理');
    }
}

function parseStaticByNode(asset, tag) {
    if (!asset) {
        cc.log('[parseStaticByNode] 参数有错误');
    }

    if (asset instanceof Array) {
        asset.forEach((item) => {
            _parseStaticRes(item, tag);
        });
    } else {
        _parseStaticRes(asset, tag);
    }


    var json_key = [];
    var keys = Object.keys(cc.loader._cache);
    keys.forEach((item) => {
        if (cc.loader._cache[item].is_static == true) {
            json_key.push(item);
        }
    });

    // 释放描述相关 纹理的 json 文件
    for (var asset in cc.loader._cache) {
        if (cc.loader._cache[asset].is_static) {
            continue;
        }
        if (cc.loader._cache[asset].dependKeys && cc.loader._cache[asset].dependKeys.length > 0) {
            for (var i = 0; i < cc.loader._cache[asset].dependKeys.length; i++) {
                if (json_key.indexOf(cc.loader._cache[asset].dependKeys[i]) !== -1) {
                    cc.loader._cache[asset].is_static = true;
                }
            }
        }
    }

    json_key = [];
    keys = Object.keys(cc.loader._cache);
    keys.forEach((item) => {
        if (cc.loader._cache[item].is_static == true) {
            json_key.push(item);
        }
    });

    // 释放描述相关 json的 json 文件
    for (var asset in cc.loader._cache) {
        if (cc.loader._cache[asset].is_static) {
            continue;
        }

        if (cc.loader._cache[asset].dependKeys && cc.loader._cache[asset].dependKeys.length > 0) {
            for (var i = 0; i < cc.loader._cache[asset].dependKeys.length; i++) {
                if (json_key.indexOf(cc.loader._cache[asset].dependKeys[i]) !== -1) {
                    cc.loader._cache[asset].is_static = true;
                }
            }
        }
    }
}

function loadStaticRes(path, type, onload, tag) {
    cc.loader.loadRes(path, type, (err, asset) => {
        // TODO 加载资源不能释放资源
        if (onload) {
            onload(asset);
        }

        if (!tag) {
            tag = "default";
        }
        _parseStaticRes(asset, tag);
    });
}


function _parsePrefab(node, tag) {
    var prefab = node;
    if (node.data) {
        prefab = node.data;
    }

    if (!(prefab instanceof cc.Scene)) {
        _parseNode(prefab, tag);
    }
    let children = prefab._children;
    children.forEach((child) => {
        _parseNode(child, tag);
        _parsePrefab(child, tag);
    });
}

function _parseNode(node, tag) {
    let sprite = node.getComponent(cc.Sprite);
    if (sprite && sprite.spriteFrame) {
        if (_isNullObj(cc.loader._cache[sprite.spriteFrame._textureFilename])) {
            cc.loader._cache[sprite.spriteFrame._textureFilename].is_static = true;
            cc.loader._cache[sprite.spriteFrame._textureFilename].cus_tag = tag;
        }
    }

    let button = node.getComponent(cc.Button);
    if (button) {
        if (button.normalSprite) {
            if (_isNullObj(cc.loader._cache[button.normalSprite._textureFilename])) {
                cc.loader._cache[button.normalSprite._textureFilename].is_static = true;
                cc.loader._cache[button.normalSprite._textureFilename].cus_tag = tag;
            }
        }

        if (button.pressedSprite) {
            if (_isNullObj(cc.loader._cache[button.pressedSprite._textureFilename])) {
                cc.loader._cache[button.pressedSprite._textureFilename].is_static = true;
                cc.loader._cache[button.pressedSprite._textureFilename].cus_tag = tag;
            }
        }

        if (button.hoverSprite) {
            if (_isNullObj(cc.loader._cache[button.hoverSprite._textureFilename])) {
                cc.loader._cache[button.hoverSprite._textureFilename].is_static = true;
                cc.loader._cache[button.hoverSprite._textureFilename].cus_tag = tag;
            }
        }

        if (button.disabledSprite) {
            if (_isNullObj(cc.loader._cache[button.disabledSprite._textureFilename])) {
                cc.loader._cache[button.disabledSprite._textureFilename].is_static = true;
                cc.loader._cache[button.disabledSprite._textureFilename].cus_tag = tag;
            }
        }
    }

    let label = node.getComponent(cc.Label);
    if (label && label.font && label.font instanceof cc.BitmapFont && label.font.spriteFrame) {
        if (_isNullObj(cc.loader._cache[label.font.spriteFrame._textureFilename])) {
            cc.loader._cache[label.font.spriteFrame._textureFilename].is_static = true;
            cc.loader._cache[label.font.spriteFrame._textureFilename].cus_tag = tag;
        }
    }

    let richText = node.getComponent(cc.RichText);
    if (richText && richText.imageAtlas) {
        let keys = Object.keys(richText.imageAtlas._spriteFrames);
        if (keys.length > 0) {
            if (_isNullObj(cc.loader._cache[richText.imageAtlas._spriteFrames[keys[0]]._textureFilename])) {
                cc.loader._cache[richText.imageAtlas._spriteFrames[keys[0]]._textureFilename].is_static = true;
                cc.loader._cache[richText.imageAtlas._spriteFrames[keys[0]]._textureFilename].cus_tag = tag;
            }
        }
    }

    let particleSystem = node.getComponent(cc.ParticleSystem);
    if (particleSystem && particleSystem._texture) {
        if (_isNullObj(cc.loader._cache[particleSystem._texture])) {
            cc.loader._cache[particleSystem._texture].is_static = true;
            cc.loader._cache[particleSystem._texture].cus_tag = tag;
        }
    }

    let pageViewIndicator = node.getComponent(cc.PageViewIndicator);
    if (pageViewIndicator && pageViewIndicator.spriteFrame) {
        if (_isNullObj(cc.loader._cache[pageViewIndicator.spriteFrame._textureFilename])) {
            cc.loader._cache[pageViewIndicator.spriteFrame._textureFilename].is_static = true;
            cc.loader._cache[pageViewIndicator.spriteFrame._textureFilename].cus_tag = tag;
        }
    }

    let editBox = node.getComponent(cc.EditBox);
    if (editBox && editBox.backgroundImage) {
        if (_isNullObj(cc.loader._cache[editBox.backgroundImage._textureFilename])) {
            cc.loader._cache[editBox.backgroundImage._textureFilename].is_static = true;
            cc.loader._cache[editBox.backgroundImage._textureFilename].cus_tag = tag;
        }
    }

    let mask = node.getComponent(cc.Mask);
    if (mask && mask.spriteFrame) {
        if (_isNullObj(cc.loader._cache[mask.spriteFrame._textureFilename])) {
            cc.loader._cache[mask.spriteFrame._textureFilename].cus_tag = tag;
            cc.loader._cache[mask.spriteFrame._textureFilename].is_static = true;
        }
    }
}

function _isNull(texture) {
    if (texture) {
        if (texture.bk_retain == undefined || texture.bk_retain == null) {
            // 此种情况应该不吹出现
            texture.bk_retain = 0;
            // cc.log('此种情况应该不吹出现');
            return false;
        } else {
            return true;
        }

    }
    return false;
}

var intervalId = null;

function startAutoRelease(interval) {
    stopAutoRelease();
    _release();
    //intervalId = setInterval(_release, interval * 1000);
}

function stopAutoRelease() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function _release() {

    // if (is_loading) {
    //     cc.log("资源加载中，不释放资源");
    //     return;
    // }
    TimeTake.start('内存释放开始');
    // 场景上的基本资源资源
    var dependAssets = cc.director.getScene().dependAssets;

    var texturesInCache = deepCloneObj(cc.loader._cache);

    var release_key = [];
    // 查看资源的引用计数,并先释放纹理资源
    for (var asset in texturesInCache) {
        if (texturesInCache[asset].is_static) {
            continue;
        }


        // if (dependAssets.indexOf(asset) !== -1) {
        //     continue;
        // }

        // NOT_RELEASE_TEXTURE
        // if () 

        // 先释放纹理
        if (texturesInCache[asset].bk_retain <= 0) {
            release_key.push(texturesInCache[asset].url);
            cc.loader.release(texturesInCache[asset].url);
        }
    }

    var release_json = [];
    // 释放描述相关 纹理的 json 文件
    for (var asset in cc.loader._cache) {
        if (cc.loader._cache[asset].dependKeys && cc.loader._cache[asset].dependKeys.length > 0) {
            var is_release = false;
            for (var i = 0; i < cc.loader._cache[asset].dependKeys.length; i++) {
                if (release_key.indexOf(cc.loader._cache[asset].dependKeys[i]) !== -1) {
                    is_release = true;

                }
            }

            if (is_release) {
                release_json.push(cc.loader._cache[asset].url);
                cc.loader.release(cc.loader._cache[asset].url);
            }
        }
    }


    // 释放描述相关 json的 json 文件
    for (var asset in cc.loader._cache) {
        if (cc.loader._cache[asset].dependKeys && cc.loader._cache[asset].dependKeys.length > 0) {
            var is_release = false;
            for (var i = 0; i < cc.loader._cache[asset].dependKeys.length; i++) {
                if (release_json.indexOf(cc.loader._cache[asset].dependKeys[i]) !== -1) {
                    is_release = true;

                }
            }

            if (is_release) {
                cc.loader.release(cc.loader._cache[asset].url);
            }
        }
    }

    release_key = [];

    TimeTake.end('内存释放结束');
}

function _releaseRes(node) {
    let sprite = node.getComponent(cc.Sprite);
    if (sprite && sprite.spriteFrame) {
        if (_isNull(cc.loader._cache[sprite.spriteFrame._textureFilename])) {
            cc.loader._cache[sprite.spriteFrame._textureFilename].bk_retain -= 1;
        }
    }

    let button = node.getComponent(cc.Button);
    if (button) {
        if (button.normalSprite) {
            if (_isNull(cc.loader._cache[button.normalSprite._textureFilename])) {
                cc.loader._cache[button.normalSprite._textureFilename].bk_retain -= 1;
            }
        }

        if (button.pressedSprite) {
            if (_isNull(cc.loader._cache[button.pressedSprite._textureFilename])) {
                cc.loader._cache[button.pressedSprite._textureFilename].bk_retain -= 1;
            }
        }

        if (button.hoverSprite) {
            if (_isNull(cc.loader._cache[button.hoverSprite._textureFilename])) {
                cc.loader._cache[button.hoverSprite._textureFilename].bk_retain -= 1;
            }
        }

        if (button.disabledSprite) {
            if (_isNull(cc.loader._cache[button.disabledSprite._textureFilename])) {
                cc.loader._cache[button.disabledSprite._textureFilename].bk_retain -= 1;
            }
        }
    }

    let label = node.getComponent(cc.Label);
    if (label && label.font && label.font instanceof cc.BitmapFont && label.font.spriteFrame) {
        if (_isNull(cc.loader._cache[label.font.spriteFrame._textureFilename])) {
            cc.loader._cache[label.font.spriteFrame._textureFilename].bk_retain -= 1;
        }
    }

    let richText = node.getComponent(cc.RichText);
    if (richText && richText.imageAtlas) {
        let keys = Object.keys(richText.imageAtlas._spriteFrames);
        if (keys.length > 0) {
            if (_isNull(cc.loader._cache[richText.imageAtlas._spriteFrames[keys[0]]._textureFilename])) {
                cc.loader._cache[richText.imageAtlas._spriteFrames[keys[0]]._textureFilename].bk_retain -= 1;
            }
        }
    }

    let particleSystem = node.getComponent(cc.ParticleSystem);
    if (particleSystem && particleSystem._texture) {
        if (_isNull(cc.loader._cache[particleSystem._texture])) {
            cc.loader._cache[particleSystem._texture].bk_retain -= 1;
        }
    }

    let pageViewIndicator = node.getComponent(cc.PageViewIndicator);
    if (pageViewIndicator && pageViewIndicator.spriteFrame) {
        if (_isNull(cc.loader._cache[pageViewIndicator.spriteFrame._textureFilename])) {
            cc.loader._cache[pageViewIndicator.spriteFrame._textureFilename].bk_retain -= 1;
        }
    }

    let editBox = node.getComponent(cc.EditBox);
    if (editBox && editBox.backgroundImage) {
        if (_isNull(cc.loader._cache[editBox.backgroundImage._textureFilename])) {
            cc.loader._cache[editBox.backgroundImage._textureFilename].bk_retain -= 1;
        }
    }

    let mask = node.getComponent(cc.Mask);
    if (mask && mask.spriteFrame) {
        if (_isNull(cc.loader._cache[mask.spriteFrame._textureFilename])) {
            cc.loader._cache[mask.spriteFrame._textureFilename].bk_retain -= 1;
        }
    }
}

function _releaseNodeTexture(node) {
    if (!(node instanceof cc.Scene)) {
        _releaseRes(node);
    }
    let children = node._children;
    children.forEach((child) => {
        _releaseRes(child);
        _releaseNodeTexture(child);
    });
}

function destroy(node) {
    if (node) {
        _releaseNodeTexture(node);
        node.destroy();
        startAutoRelease(-1);
    } else {
        cc.log("释放的节点不存在")
    }

}


function loadRes(path, type, callback) {
    cc.loader.loadRes(path, type, function (err, asset) {
        if (err) {
            cc.log(`[资源加载] 错误 ${err}`);
            return;
        }
        callback(asset);
    }.bind(this));
}

const LoaderKiller = {
    loadRes: loadRes,
    loadStaticRes: loadStaticRes,
    parseStaticByNode: parseStaticByNode,
    destroy: destroy,
    startAutoRelease: startAutoRelease,
    stopAutoRelease: stopAutoRelease,
}

module.exports = LoaderKiller;