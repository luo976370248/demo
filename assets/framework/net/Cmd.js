var Cmd = {
	// 全局的命令号，当我们的用户丢失链接的时候，
	// 所有的服务都会收到网关转发过来的这个时间这个消息
	USER_DISCONNECT: 10000, 
	BROADCAST: 10001, //广播服务
	Auth: {
		GUEST_LOGIN: 1, // 游客登陆
		RELOGIN: 2, // 账号在另外的地方登陆
		EDIT_PROFILE: 3,// 修改用户资源
		HEART_BEAT: 4, // 心跳包
	},

	HALL: {
		NOTIFIY: 1, // 大厅公告信息
		GET_LOGIN_BUNUES: 2, // 登录奖励
		GIVE_LOGIN_BONUES: 3,// 获取登录奖励
		GET_WOLRD_RAND_INFO: 4,// 获取世界排行榜信息
	},

	NiuNiu: {
		CREATE_ROOM: 1, // 创建房间
		JOIN_ROOM: 2, // 加入房间
		BACK_ROOM: 3, // 返回房间
		READY: 4, // 玩家准备
		GAME_BEGIN: 5,// 游戏开始
		SNATCH_BLANK_START: 6, // 开始抢庄
		SNATCH_BLANK: 7, // 抢庄
		SNATCH_BLANK_END: 8, //抢庄结果
		SELECT_MULTIPLE_START: 9, // 开始倍数选择
		SELECT_MULTIPLE: 10, // 倍数选择
		SELECT_MULTIPLE_END: 11,// 倍数选择完成
		START_CALCULATE_CATTLE: 12,
		CALCULATE_CATTLE: 13,
		CALCULATE_CATTLE_RESULT: 14,
		GAME_RESULT: 15, //游戏结果
		GAME_RESTART: 16, // 游戏重新开始
		ENTER_ZONE: 17, // 进入区间
	}
};

module.exports = Cmd;