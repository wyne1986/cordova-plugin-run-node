const cordova = require('cordova-bridge');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname,'tmp');
fs.exists(dir,function(exists){
    if(!exists){
        fs.mkdir(dir,function(err){
            if(err){
                console.error(err);
            }
        });
    }
});

cordova.channel.on('message', function (msg) {
    var modulename = path.join('tmp',(new Date().valueOf() + parseInt(Math.random() * 1000).toString()) + '.js');
    var tmpfile = path.join(__dirname, modulename);
    fs.writeFile(tmpfile,msg,function(err){
        if(err){
            console.error(err);
        }else{
            require(modulename);
        }
    });
});