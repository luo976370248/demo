var Cmd = {
	// 全局的命令号，当我们的用户丢失链接的时候，
	// 所有的服务都会收到网关转发过来的这个时间这个消息
	USER_DISCONNECT: 10000, 

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
	}
};

module.exports = Cmd;