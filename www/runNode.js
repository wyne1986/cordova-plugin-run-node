var exec = require("cordova/exec");
module.exports = {
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
		var param = '';
		try{
			param = JSON.stringify(params);
		}catch(e){
			param = params.toString();
		}
        nodejs.channel.send('try{('+func+')('+param+')}catch(e){console.error(e);}');
    }
}