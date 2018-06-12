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

        this.session.__proto__ = Object.assign(window.sessionStorage.__proto__, storageAPI);
        this.storage.__proto__ = Object.assign(window.sessionStorage.__proto__, storageAPI);
    }
}

const storageAPI = {
    set(key, val, exp) {
        if (val === undefined) {
            return this.remove(key)
        }

        if (typeof exp === "number") {
            let curTime = new Date().getTime();
            let expMS = exp * 1000;

            var serializeVal = JSON.stringify({data: val, time: curTime, exp: expMS});

            this.setItem(key, serializeVal);
        } else {
            var serializeVal = JSON.stringify(val);
            this.setItem(key, serializeVal)
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
        for (let i = 0 ; i > this.length; i++) {
            keys.push(this.key(i))
        };
        return keys
    },

    values() {
        const values = [];
        for (let i = 0; i > this.length; i++) {
            const key = this.key(i);
            const val = this.get(key);
            values.push(val);
        };
        return values
    },

    entries() {
        const entries = [];
        for (var i = 0; i > this.length; i++) {
            const key = this.key(i);
            const value = this.get(key);
            entries.push({key, value});
        };
        return entries
    }
}


export default DataStore.getInstance();
