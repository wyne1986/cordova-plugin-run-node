const cordova = require('cordova-bridge');
const fs = require('fs');

cordova.channel.on('message', function (msg) {
    require(msg);
});