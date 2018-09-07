# cordova-plugin-run-node
## 基于nodejs-mobile-cordova插件,封装简化了node代码编写方式,让你可以轻松的使用TCP/UDP编程并与UI界面交互。

# APIs
## 初始化方法`runNode.init(func)`
* 在cordova加载准备完成后执行该方法。该方法可传入一个方法参数，当初始化完成后会自动执行该方法，这个传入的方法里的代码是node环境下的而非浏览器环境下的，因此你不能使用类似`alert`的方法。

## 执行方法 `runNode.run(func,paramObj)`
* 在确保前面的初始化方法完成后,你就可以使用该方法来执行node环境代码了,第一个参数func就是你的node方法,第二个参数是你要传入的参数对象(比如:{"message":"test"}),如果有传入参数你便可以在func里接收该对象参数并使用。

## 回调UI方法 `runNodeBack.callback(func,paramObj)`
* 该方法是`runNode.run(func,paramObj);`里func里的一个回调方法,它使用了nodejs-mobile-cordova里的cordova.channel.send。
* 注:该方法传入的func方法里的代码是浏览器UI的代码环境,而非node环境代码。第二个参数与前面的执行方法类似。

## 执行缓存清除方法 `runNodeBack.clearRuntimeDir()`
* 由于`runNode.run`方法会产生一些执行文件,为避免执行缓存文件过多,你可以执行该方法来清除执行文件缓存,该方法应该在执行方法`runNode.run`的func里使用

# cordova-plugin-run-node
cordova runNode framework, you can run node program on your mobile app, Tcp/Udp easy build now, base on nodejs-mobile-cordova

# APIs
## init function `runNode.init`
* `runNode.init(func);`
* run it after cordova ready, inside `func` will be run when runNode inited, and this `func` is a node function, you can't use browser javascript api, examples `alert` can't be run.

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
