/**
 * @class EventManager
 * @descprit observer base class
 */
const EventManager = cc.Class({
    properties: {
        eventManager: null,
        observer_list: null,
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
});

module.exports = EventManager;
