const GAME_STATE = {
    INIT: 1, // 初始化阶段
    SNATCH_BLANK: 2, // 抢庄阶段
    SELECT_MULTIPLE: 3, // 倍数选择阶段
    SUAN_NIU: 4, // 算牛阶段
    THAN_CARD: 5, // 比牌阶段
}

const SNATCH_BLANK = {
    NOT_BLANK: 1,
    BLANK: 2,
    SUPER_BLANK: 3,
}

module.exports = {
    GAME_STATE: GAME_STATE,
    SNATCH_BLANK: SNATCH_BLANK,
    LOGIC_MASK_COLOR : 0xf0, // 花色掩码
    LOGIC_MASK_VALUE : 0x0f, // 数值掩码
}