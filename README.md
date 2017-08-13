# electron-oauth-vk

> Module for authenticating by vk for electron

## Install

```bash
npm i -S electron-oauth-vk
```

## Usage

``` javascript
const OAuthVK = require('electron-oauth-vk'); 

const options = {
    clientID: 1, // your vk app id, required
    display: 'page', // page display desing, default 'popup'
    scope: ['messages', 'offline'], // access rights, whoose you want get,
    responseType: 'code' // response type, default 'token'
};

const oauth = new OAuthVK(require('electron').remote.BrowserWindow, options)

oauth.login().then((authData)=>{
    console.log(authData.code);
});

```

## License

[MIT](http://vjpr.mit-license.org)
