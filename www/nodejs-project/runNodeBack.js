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
    }
}

module.exports = runNodeBack;