import { BASE_URL, ENV } from '../constant/configConstant';
import wepy from 'wepy';

class rp {
    constructor(url, type) {
        this.method = type;
        this.url = `${BASE_URL[ENV]}${url}`;
        this.qs = {};
        this.headers = {};
        this.body = {};
    }
    header(v1, v2) {
        if (typeof v1 === 'object') {
            this.headers = v1;
        } else {
            this.headers[v1] = v2;
        }
        return this;
    }
    query(v1, v2) {
        if (typeof v1 === 'object') {
            this.qs = v1;
        } else {
            this.qs[v1] = v2;
        }
        return this;
    }
    send(data) {
        this.body = data;
        return this;
    }
    async end() {
        let auth = wx.getStorageSync('token');
        // let auth = '3f45116764f4e1b6d1c5f5a0f1167ba7';
        if (auth) {
            this.header('token', auth);
        }
        let isJsonType = this.method === 'POST' || this.method === 'PUT';
        let rpOpt = {
            url: this.url,
            header: this.headers,
            method: this.method,
            data: this.body
        };
        let qs = [];
        for (let k in this.qs) {
            qs.push(`${k}=${this.qs[k]}`);
        }
        if (qs.length !== 0) {
            qs = qs.join('&');
            rpOpt.url += rpOpt.url.indexOf('?') === -1 ? `?${qs}` : `&${qs}`;
        }
        if (isJsonType) {
            rpOpt.data = this.body;
            rpOpt.dataType = 'json';
            rpOpt.header['Content-Type'] = 'application/json';
        }
        let res = await wepy.request(rpOpt);
        return res.data;
    }
}
const shttp = {
    get: (url) => {
        return new rp(url, 'GET');
    },
    post: (url) => {
        return new rp(url, 'POST');
    },
    put: (url) => {
        return new rp(url, 'PUT');
    },
    delete: (url) => {
        return new rp(url, 'DELETE');
    },
};

export {
    shttp,
    rp
};