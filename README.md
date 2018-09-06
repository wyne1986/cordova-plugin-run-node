# cordova-mobile-runnode
cordova runNode framework, you can run node program on your mobile app, Tcp/Udp easy build now, base on nodejs-mobile-cordova

# APIs
## init function `runNode.init`
* `runNode.init(func);`
* run it after cordova ready, inside `func` will be run when runNode inited, and this `func` is a node function, you can't use browser javascript api

## run node function `runNode.run`
* `runNode.run(func,paramObj);`
* after runNode.init, you can use this to run Node code. you can require Node modules, also you can copy other Node modules in the same directory and require them, `examples like express`
* paramObj is a object like {"test":"yes"}, it will insert into the func at first args

## callback function `runNodeBack.callback`
* this function must be use in the function which is in the runNode.run function, like this:
* `(function(){runNodeBack.callback(function(){},paramObj);})`
* the code in the runNodeBack.callback function are DomJavascript, you can Change your webPage in it.
* paramObj is a object like {"test":"yes"}, it will insert into the func at first args

## clearRuntimeCache function `runNodeBack.clearRuntimeDir`
* the runNode.run function will create runtime files, you can use this function to clear runtime files
* it just run at the callback function
