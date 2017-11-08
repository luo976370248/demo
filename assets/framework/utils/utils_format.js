var utils = {
    
     /**
     * 获取指定范围内的随机整数
     * @param {*} min 最小值 
     * @param {*} max 最大值
     */
    randomInt(min, max) {
        let offNum = (max - min) + 1;
        return Math.floor((Math.random() * offNum) + min);
    },

    /**
     * 格式化数字 1000 = 1k 10000 = 1w
     * @param {*} num 
     */
    formatHallCoinStr(num) {
        const str = num + '';
        let number = str;
        let split_list = str.split('0');

        let isflag = true;
        let count = 0;
        for (let i = split_list.length - 1; i > 0; i--) {
            if (split_list[i] === "" && isflag) {
                count++;
            } else {
                isflag = false;
            }
        }

        // [1k - 10k)
        if (count === 3) {
            number = str.substring(0, str.length - 3);
            number += "k";
        }

        // [1w - ~]
        if (count >= 4) {
            number = str.substring(0, str.length - 4);
            number += "w";
        }

        return number;
    },

    /**
     * 获取字符串的字节数(支持中文，英文，空格，中英文标点，特殊字符混输)
     * @param str 传入的字符串
     * @returns {*}
     */
    getStrCharLength(str) {
        let char = str.match(/[^\x00-\xff]/ig);
        return str.length + (char == null ? 0 : char.length);
    },

    /**
     * 检测字符串中只包含数字和字母
     * @param str
     */
    checkStrNumberAndLetter(str) {
        if (str.match(/^[0-9a-zA-Z]+$/)) {
            return true;
        } else {
            return false
        }
    },

    /**
     * 超出的字符长度用省略号显示(支持中文，英文，空格，中英文标点，特殊字符混输)
     * @param str
     * @param length
     * @returns {string}
     */
    getNewStrByStr(str, length) {
    
        let char = str.match(/[^\x00-\xff]/ig);
        let char_length = str.length + (char == null ? 0 : char.length);
        
        cc.log(`char_length = ${char_length} new_length = ${length}`);
        if (char_length <= length) {
            return str;
        }

        let new_str = str.substr(0, length);
        char = new_str.match(/[^\x00-\xff]/ig);
        char_length = str.length + (char == null ? 0 : char.length);
        cc.log(`char_length = ${char_length} new_length = ${length}`);
        if (char_length <= length) {
            return str + '...';
        }

        let new_str1 = null;
        const find_str = function (end) {
            new_str1 = str.substr(0, end);
            cc.log(`new_str1 = ${new_str1}  end = ${end}`)
            char = new_str1.match(/[^\x00-\xff]/ig);
            char_length = new_str1.length + (char == null ? 0 : char.length);

            if (char_length <= length) {
                new_str1 + '...';
            } else {
               find_str(end - 1);
            }
        };

        find_str(length);
        return new_str1;
    },

    decodeBase64(datastr) {
        let buf = new Buffer(datastr, 'base64');
        let str = buf.toString().substring(0, 8);
        cc.dd.log.log("DecodeBase64 str:" + str);
        return str;// buf.toString();
    },
    decodeBase64ByL(datastr, length) {
        let buf = new Buffer(datastr, 'base64');
        let str = buf.toString().substring(0, length);
        cc.dd.log.log("DecodeBase64 str:" + str);
        return str;// buf.toString();
    },

    random_string: function(len){
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
        
        var maxPos = $chars.length;
    　　var str = '';
    　　for (var i = 0; i < len; i++) {
    　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return str;
    },
    
    random_int_str: function(len) {
        var $chars = '0123456789'; 
        
        var maxPos = $chars.length;
    　　var str = '';
    　　for (var i = 0; i < len; i++) {
    　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return str;
    },
    
    // 随机的生成[begin, end] 范围内的数据
    random_int: function(begin, end) {
        var num = begin + Math.random() * (end - begin + 1);
        num = Math.floor(num);
        if (num > end) {
            num = end;
        }
        return num;
    },
    
};

module.exports = utils