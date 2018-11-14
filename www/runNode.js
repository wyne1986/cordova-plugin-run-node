var exec = require("cordova/exec");
module.exports = {
    inited: false,
    again: 0,
    init: function (nfunc,dfunc){
		nodejs.channel.setListener(function(msg){
			eval(msg);
		});
		nodejs.start('main.js', function(err){
			if (err) {
				console.log(err);
			}else{
                runNode.inited = true;
				if(typeof dfunc == 'function')dfunc();
				if(typeof nfunc == 'function')runNode.run(nfunc);
			}
		});
    },
    run: function(func,params){
        if(!runNode.inited){
            if(runNode.again<1){
                setTimeout(function(){
                    runNode.run(func,params);
                    runNode.again++;
                },200);
                console.log('wait for runNode inited, will run again after 0.2 seconds,times:'+runNode.again);
            }else{
                runNode.again = 0;
                console.log('runNode init failed, cant run');
            }
            return;
        }
        var param = '';
        try{
            param = JSON.stringify(params);
        }catch(e){
            param = params.toString();
        }
        var datas = 'try{('+func+')('+param+')}catch(e){console.log(e);}';
        dirpath = cordova.file.cacheDirectory;
        filename = 'test.js';
        filepath = (dirpath+filename).substr(7);
        window.resolveLocalFileSystemURL(dirpath, function (dirEntry) {
            dirEntry.getFile(filename, {create: true, exclusive: false}, function(fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function() {
                        nodejs.channel.send(filepath);
                    };
                    fileWriter.onerror = function (e) {
                        console.log('write file failed');
                    };
                    data = new Blob([datas], { type: 'text/plain' });
                    fileWriter.write(data);
                });
            }, function(){
                console.log('create file failed');
            });
        }, function(err){
            console.log(err);
        });
    }
}