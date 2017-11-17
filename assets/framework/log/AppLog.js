const OPENLOGFLAG = true;

const AppLog = cc.Class({

});

AppLog.dataList = [];


AppLog.getDateString = function () {
    let d = new Date();
    let str = d.getHours() + "";
    let timeStr = "";
    timeStr += (str.length === 1 ? ("0" + str) : str) + ":";

    str = d.getMinutes() + "";
    timeStr += (str.length === 1 ? ("0" + str) : str) + ":";

    str = d.getSeconds() + "";
    timeStr += (str.length === 1 ? ("0" + str) : str) + ".";

    str = d.getMilliseconds() + "";
    if (str.length === 1) str = "00" + str;
    if (str.length === 2) str = "0" + str;
    timeStr += str;

    timeStr = '[' + timeStr + ']';

    return timeStr;
};

AppLog.printStack = function () {
    let e = new Error();
    let lines = e.stack.split('\n');
    lines.shift();
    lines.forEach((line) => {
        cc.log('line:', line);
    });
};

AppLog.stack = function (index) {
    let e = new Error();
    let lines = e.stack.split("\n");
    lines.shift();
    let result = [];
    lines.forEach((line) => {
        line = line.substring(7);
        let lineBreak = line.split(" ");
        if (lineBreak.length < 2) {
            result.push(lineBreak[0]);
        } else {
            result.push({[lineBreak[0]]: lineBreak[1]});
        }
    });

    let list = [];
    if (index <= result.length - 1) {
        for (let a in result[index]) {
            list.push(a);
        }
    }

    if (list.length > 0) {
        let splitList = list[0].split(".");
        if (splitList.length >= 2) {
            return ("[" + splitList[0] + ".js->" + splitList[1] + "]");
        }
    }

    return "";
};

AppLog.trace = function () {
    let backLog = cc.log || console.log || log;

    if (OPENLOGFLAG) {
        backLog.call(AppLog, "%s%s" + cc.js.formatStr.apply(cc, arguments),
        AppLog.getDateString(), AppLog.stack(2));

        let str = AppLog._getString(AppLog.stack(2), AppLog.getDateString(), cc.js.formatStr.apply(cc, arguments));
        AppLog._pushMessage(0, str);
    }
};


AppLog.log = function () {
    let backLog = cc.log || console.log ||  log;

    if (OPENLOGFLAG) {
        backLog.call(AppLog, "%s%s" + cc.js.formatStr.apply(cc, arguments),
        AppLog.getDateString(), AppLog.stack(2));

        let str = AppLog._getString(AppLog.stack(2), AppLog.getDateString(), cc.js.formatStr.apply(cc, arguments));
        AppLog._pushMessage(1, str);
    }
};

AppLog.info = function () {
    let backLog = cc.log || console.log ||  log;
    if (OPENLOGFLAG) {
        backLog.call(AppLog, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments),
            "color:#00CD00;", AppLog.getDateString(), AppLog.stack(2));

        
        let str = AppLog._getString(AppLog.stack(2), AppLog.getDateString(), cc.js.formatStr.apply(cc, arguments));
        AppLog._pushMessage(2, str);    
    }
};

AppLog.log2 = function () {
    let backLog = cc.log || console.log ||  log;
    if (OPENLOGFLAG) {
        backLog.call(AppLog, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments),
         "color:#EED2EE;", AppLog.getDateString(), AppLog.stack(2));

        let str = AppLog._getString(AppLog.stack(2), AppLog.getDateString(), cc.js.formatStr.apply(cc, arguments));
        AppLog._pushMessage(2, str);
    }
};

AppLog.info2 = function () {
    let backLog = cc.log || console.log ||  log;
    if (OPENLOGFLAG) {
        backLog.call(AppLog, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments),
         "color:#F08080;", AppLog.getDateString(), AppLog.stack(2));

        let str = AppLog._getString(AppLog.stack(2), AppLog.getDateString(), cc.js.formatStr.apply(cc, arguments));
        AppLog._pushMessage(2, str);
    }
};

AppLog.info3 = function () {
    let backLog = cc.log || console.log ||  log;
    if (OPENLOGFLAG) {
        backLog.call(AppLog, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments),
         "color:#9B30FF;", AppLog.getDateString(), AppLog.stack(2));

        let str = AppLog._getString(AppLog.stack(2), AppLog.getDateString(), cc.js.formatStr.apply(cc, arguments));
        AppLog._pushMessage(2, str);
    }
};
/**
 *  打印数据结构
 * @param data 数据
 */
AppLog.objInfo = (data) => {
    if (OPENLOGFLAG) {
        let strs = '';
        let str = AppLog.getStr(data, strs);
        AppLog.info3(str);
    }
};

AppLog.objInfo2 = (data) => {
    if (OPENLOGFLAG) {
        let strs = '';
        let str = AppLog.getStr(data, strs);
        AppLog.info2(str);
    }
};

/**
 *  将数据字符串号
 * @param data 数据
 * @param str 上次的字符串
 * @returns {*}
 */
AppLog.getStr = (data, str) => {
    cc.dd._.forEach(data, (item, index) => {
        if (item instanceof Array) {
            str += `\nlist< length: ${item.length} >:{\n`;
            str = AppLog.getStr(item, str);
            str += `\n}\n`;
        } else if (item instanceof Object) {
            str = AppLog.getStr(item, str);
        } else {
            str += `  [${index}: ${item}]  `;
        }
    });
    return str;
};


AppLog.warn = function () {
    let backLog = cc.log || console.log ||  log;
    if (OPENLOGFLAG) {
        backLog.call(AppLog, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments),
            "color:#ee7700;", AppLog.getDateString(), AppLog.stack(2));

        let str = AppLog._getString(AppLog.stack(2), AppLog.getDateString(), cc.js.formatStr.apply(cc, arguments));
        AppLog._pushMessage(3, str);
    }
};

AppLog.error = function () {
    let backLog = cc.log || console.log ||  log;
    if (OPENLOGFLAG) {
        backLog.call(AppLog, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments),
         "color:red", AppLog.getDateString(), AppLog.stack(2));

        let str = AppLog._getString(AppLog.stack(2), AppLog.getDateString(), cc.js.formatStr.apply(cc, arguments));
        AppLog._pushMessage(4, str);
    }
};

// 日志上传功能
AppLog._getString = function (fileStr, timeStr, message) {
    return  timeStr + fileStr + message;
};

AppLog._pushMessage = function (lv, message) {
//   let a = {
//       userid: cc.dd.user.Module.getUserID + "",
//       deskid: 0 + "",
//       level: lv + "",
//       data: message + "",
//       time: "",
//   };

//   if (cc.sys.isNative) {
//       a.time = (new Date()).getTime() + "";
//       AppLog.dataList.push(a);
//   }

};

module.exports = AppLog;
