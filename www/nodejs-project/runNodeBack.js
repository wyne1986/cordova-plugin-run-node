let runNodeBack = {
    callback: function (func,params){
        const cordova = require('cordova-bridge');
        var param = params;
        try{
            param = JSON.stringify(params);
        }catch(ec){
            param = typeof params != 'undefined' && params != null ? '"' + params.toString() + '"' : '';
        }
        if(typeof func == 'function'){
            cordova.channel.send("try{("+func.toString()+")("+param+")}catch(e){console.error(e);}");
        }else{
            console.error('args func is not a function');
        }
    },
    getRuntimeDir: function(){
        return __dirname+'/tmp';
    },
    clearRuntimeDir: function(paths) {
        let fs = require('fs');
        let path = paths ? paths : runNodeBack.getRuntimeDir();
        var files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) {
                    runNodeBack.clearRuntimeDir(curPath);
                }else{
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}

module.exports = runNodeBack;