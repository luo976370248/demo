var Respones = {
	OK: 1, // 表示成功
    INVALID_PARAMS: -100,// 用户传递的参数错误
    SYSTEM_ERR: -101, // 系统错误
    ILLGAL_ACCOUNT: -102, // 非法的账号
    ILLGAL_OPT: -103, //非法的操作
    RANDK_IS_EMPTY:-104, 
    IS_NOT_ENOUGH:-105,

    // 提示用户信息
    TIP_SURE: -50, // 消息提示(没有取消的按钮)
	TIP_CANCEL: -51, // 消息提示(有取消的按钮)
};

module.exports = Respones;