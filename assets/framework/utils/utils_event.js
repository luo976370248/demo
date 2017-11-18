/**
 * @class EventManager
 * @descprit observer base class
 */
const EventManager = cc.Class({
    properties: {
        eventManager: null, 
        observer_list: null, // 观察者列表
        protocol_list:null, // 协议列表
        is_cache:null, // 是否需要缓存协议
    },

    statics: {
        /**
         * @function getInstance
         * @description singleton pattern
         */
        getInstance() {
            if (!this.eventManager) {
                this.eventManager = new EventManager();
            }
            return this.eventManager;
        },
    },

    ctor() {
        this.observer_list = [];
        this.protocol_list = [];
        this.is_cache = false;
    },

    /**
     * @function addObserver
     * @description add a observer
     */
    addObserver(target) {
        this.observer_list.forEach(function(item,index){
            if(item === target){
                return true;
            }
        })

        if( target ) {
            this.observer_list.push(target);
        } else {
            cc.log("ERR: invalid addObserver target:%s", target);
        }
    },

    /**
     * @function removeObserver
     * @description remove a observer
     */
    removeObserver(target) {
        this.observer_list.forEach((item,index) => {
            if(item === target){
                this.observer_list.splice(index,1);
            }
        })
    },

    /**
     * @function removeAllObserver
     * @description remove all observer
     */
    removeAllObserver() {
       this.observer_list = [];
    },

    /**
     * @function destroyInstance
     * @description destruction of observer instance
     */
    destroyInstance() {
       this.eventManager = null;
    },


     /**
     * @function notifyEvent
     * @description informed observers have news
     */
    notifyEvent(event,data) {
        this.observer_list.forEach(function(item){
            if (item.onMsgEvent) {
                item.onMsgEvent(event,data);
            } else {
                cc.log('item.onEventMessage not exits');
            }
        });
    },


    addCache:function (name, data) {
        if(name){
            this.protocol_list.push({name:name,data:data});
        }else{
            console.log("协议缓存 数据为空");
        }
        if( !this.is_cache && this.protocol_list.length == 1){
            console.log("无需缓存协议, 直接调用notifyProtocol()...");

            this.notify();
            console.log("notifyProtocol end.");
        } else {
            console.warn(`已缓存协议ID:${name} (当前缓存队列长度:${this.protocol_list.length}) is_cache=${this.is_cache}`);
        }
    },
   
    notify:function (TAG) {
        var list = this.protocol_list.shift();
        if(list){
           console.log(`[${TAG}] notifyProtocol >>> is_cache=${this.is_cache}, 执行下一条 缓存协议ID:${list.name}`);
           this.notifyEvent(list.name,list.data);
        }else{
            console.log(`${TAG}] notifyProtocol >>> 协议缓存队列为空, 忽略.`);
        }
    },

    notifyCache:function (TAG) {
        this.is_cache = false;
        this.notify(TAG);
    },

    clearCache: function() {
        this.is_cache = false;
        this.protocol_list = [];
    },
    
});

module.exports = EventManager;
