// 游戏的命名空间
window.bb = {
};

initExtend();
initProtoBuffer();
initLib();



function addLib(namespace, scripts) {
    bb[namespace] = require(scripts);
}

function addExtend(scripts) {
    require(scripts);
}

function initExtend() {
    addExtend('extend');
}

function initLib() {
    addLib('log', 'AppLog');
    addLib('ui', 'UIKiller');
    addLib('loader', 'LoaderKiller');
    addLib('scene', 'utils_scene');
    addLib('http', 'Http');
    addLib('cmd', 'Cmd');
    addLib('stype', 'Stype');
    addLib('event', 'utils_event')
    addLib('respones', 'Respones');
    addLib('format', 'utils_format');
    addLib('net', 'websocket');
    addLib('db', 'utils_db');
    addLib('user', 'UserModel');
    // addLib('memory', 'MemoryDetector');
    // addLib('persist', 'utils_persist');
    // addLib('button', 'utils_button');
    // addLib('prefab', 'utils_prefab');
    // addLib('event', 'utils_event')
    // addLib('ui', 'utils_ui_cache');
    // addLib('persist', 'utils_persist');
    
    // addLib('format', 'utils_format');
    
    // addLib('constant', 'utils_constants');
}

function initProtoBuffer() {
    addLib('cmd', 'Cmd');
    addLib('stype', 'Stype');
    addLib('auth', 'auth_proto');
    addLib('hall', 'hall_proto')
}