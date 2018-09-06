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
    var tmpfile = path.join(dir,(new Date().valueOf() + parseInt(Math.random() * 1000).toString()) + '.js');
    fs.writeFile(tmpfile,msg,function(err){
        if(err){
            console.error(err);
        }else{
            require(tmpfile);
        }
    });
});