# 让你的Android和Ios可以运行node并和webUI交互

# cordova-plugin-run-node
## 基于nodejs-mobile-cordova插件,封装简化了node代码编写方式,让你可以轻松的使用TCP/UDP编程并与UI界面交互。

# APIs
## 初始化方法`runNode.init(nfunc,dfunc)`
* 在cordova加载准备完成后执行该方法。该方法可传入两个方法参数，当初始化完成后会自动执行两个方法。
* 其中nfunc为node环境的方法,而dfunc为cordova页面浏览器环境方法。因此你不能再nfunc里使用类似`alert();document`的方法对象,同样也不能再dfunc里使用require类似的方法。

## 执行方法 `runNode.run(func,paramObj)`
* 在确保前面的初始化方法完成后,你就可以使用该方法来执行node环境代码了,第一个参数func就是你的node方法,第二个参数是你要传入的参数对象(比如:{"message":"test"}),如果有传入参数你便可以在func里接收该对象参数并使用。

## 回调UI方法 `runNodeBack.callback(func,paramObj)`
* 该方法只能在`runNode.run(func,paramObj);`里的func里面使用,且你需要在方法内部先引入`var runNodeBack = require('runNodeBack');`。
* 注:该方法传入的func方法里的代码是浏览器UI的代码环境,而非node环境代码。第二个参数与前面的执行方法类似。

## 执行缓存清除方法 `runNodeBack.clearRuntimeDir()`
* 由于`runNode.run`方法会产生一些执行文件,为避免执行缓存文件过多,你可以执行该方法来清除执行文件缓存,该方法应该在执行方法`runNode.run`的func里使用

## 三方node模块加入使用方法
* 任意地方使用`npm i 模块名`获取到模块文件后,将node_modules里的模块名文件夹拷贝到你项目的`nodejs-mobile-cordova-assets/builtin_modules/`目录下即可。
* !!!注意,模块越多,node启动得越慢!