# 让你的Android和Ios可以运行node并和webUI交互

# cordova-plugin-run-node
## 基于nodejs-mobile-cordova插件,封装简化了node代码编写方式,让你可以轻松的使用TCP/UDP编程并与UI界面交互。

# APIs
## 初始化方法`runNode.init(nfunc,dfunc)`
* 在cordova加载准备完成后执行该方法。该方法可传入两个方法参数，当初始化完成后会自动执行两个方法。
* 其中nfunc为node环境的方法,而dfunc为cordova页面浏览器环境方法。因此你不能再nfunc里使用类似`alert();document`的方法对象,同样也不能再dfunc里使用require类似的方法。

## 执行方法 `runNode.run(func,paramObj)`
* 该方法会自动判断runNode.init是否初始化成功。第一个参数func就是你的node方法,第二个参数是你要传入的参数对象(比如:{message:"test"}),如果有传入参数你便可以在func里接收该对象参数并使用。

## 回调UI方法 `runNodeBack.callback(func,paramObj)`
* 该方法只能在`runNode.run(func,paramObj);`里的func里面或runNode.init的nfunc里使用,且你需要在方法内部先引入`var runNodeBack = require('runNodeBack');`。
* 注:该方法传入的func方法里的代码是浏览器UI的代码环境,而非node环境代码,因此你只能在方法体内使用DOM和cordova的方法,而不能使用node的函数。第二个参数与前面的执行方法类似。

## 三方node模块加入使用方法
* 任意地方使用`npm i 模块名`获取到模块文件后,将node_modules里的模块名文件夹拷贝到你项目的`nodejs-mobile-cordova-assets/builtin_modules/`目录下即可。若模块是在初始化回调完成之后使用,则可以在`www/nodejs-project/`目录下使用`npm i 模块名`来安装
* !!!注意,模块越多,node启动得越慢!


* 最后更新日期:2018-11-14, debug the node tmp file system on ios