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
                },500);
                console.log('wait for runNode inited, will run again after 0.5 seconds');
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
        nodejs.channel.send('try{('+func+')('+param+')}catch(e){console.error(e);}');
    }
}