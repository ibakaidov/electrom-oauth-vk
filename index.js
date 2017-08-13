//https://oauth.vk.com/authorize?client_id=6113497&display=page&redirect_uri=blank.html&scope=friends,offline&response_type=code&v=5.67
const querystring = require('querystring');

class ElectronOAuthVK {
    constructor(browserWindow, { clientID, display, scope, responseType }) {
        if (browserWindow == null) throw new Error("browserWindow argument should be pass");
        this.browserWindow = browserWindow;
        if (clientID == null) throw new Error("clientID field in options object should be pass");
        this.clientID = clientID;
        this.display = display || "popup";
        this.scope = scope || [];
        this.responseType = responseType || 'token';
    }
    get authURL() {
        return `https://oauth.vk.com/authorize?client_id=${this.clientID}&display=${this.display}&redirect_uri=close.html&scope=${this.scope.join(',')}&response_type=${this.responseType}&v=5.67`;
    }
    login() {
        return new Promise((resolve, reject) => {

            let window = new this.browserWindow();
            window.loadURL(this.authURL);
            window.webContents.on('did-navigate', (event, url) => {
                let indexOf = url.indexOf('#');
                if (indexOf<0) return;
                url = url.slice(indexOf+1);
                let obj = querystring.parse(url);
                resolve(obj);
            })
        })
    }
}

module.exports = ElectronOAuthVK;