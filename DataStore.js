/*  [数据储存器]
**  通过本地或内存储存实现,封装sessionStorage、localStorage和Map,
**  @api
**  set(key, val, {exp})    通过key, val储存数据,如果对象是localStorage可以设置exp(type:number)过期时间 单位/s
**  get(key)    读取key对应的键值
**  has(key)    返回一个布尔值，表示某个键是否存在
**  delete(key) 删除某个键
**  clear()     清除所有成员
**  keys()      获取所有的键名遍历器
**  values()    返回所有键值遍历器
**  entries()   返回所有成员遍历器
*/

const storageAPI = {
    set(key, val, exp) {
        if (val === undefined) {
            return this.remove(key)
        }

        if (typeof exp === "number") {
            let curTime = new Date().getTime();
            let expMS = exp * 1000;

            let serializeVal = JSON.stringify({data: val, time: curTime, exp: expMS});

            this.setItem(key, serializeVal);
        } else {
            let serializeVal = JSON.stringify(val);
            this.setItem(key, serializeVal);
        }

        return val
    },

    get(key) {
        let val;

        if (!this.getItem(key)) {
            return false
        }

        let dataObj = JSON.parse(this.getItem(key));

        if (dataObj.exp) { //如果有过期时间

            let newTime = new Date().getTime();

            if (dataObj.time + dataObj.exp < newTime){
                // 信息过期清除
                this.removeItem(key);
            }else{
                val = dataObj.data;
            }
        } else {
            val = dataObj;
        }
        return val
    },

    has(key) {
        return !!this.get(key)
    },

    delete(key) {
        this.removeItem(key)
    },

    keys() {
        const keys = [];
        for (let i = 0 ; i < this.length; i++) {
            keys.push(this.key(i))
        }
        return keys
    },

    values() {
        const values = [];
        for (let i = 0; i < this.length; i++) {
            const key = this.key(i);
            const val = this.get(key);
            values.push(val);
        }
        return values
    },

    entries() {
        const entries = [];
        for (var i = 0; i < this.length; i++) {
            const key = this.key(i);
            const value = this.get(key);
            entries.push({key, value});
        }
        return entries
    }
}

class DataStore {
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore;
        }
        return DataStore.instance;
    }

    constructor() {
        this.map = new Map();
        this.session = window.sessionStorage;
        this.storage = window.localStorage;

        Object.setPrototypeOf(this.session, Object.assign(Object.getPrototypeOf(this.session), storageAPI));
        Object.setPrototypeOf(this.storage, Object.assign(Object.getPrototypeOf(this.storage), storageAPI));
    }
}


export default DataStore.getInstance();
