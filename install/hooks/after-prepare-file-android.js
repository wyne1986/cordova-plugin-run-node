var fs = require('fs');
var path = require('path');

const SOURCE_FILE_DIR = 'plugins/cordova-plugin-run-node/www/nodejs-project';
const NODEJS_PROJECT_ROOT = 'www/nodejs-project';
const ANDROID_FILE_PATH = 'platforms/android/assets/www/nodejs-project';
const MAIN_FILE = 'main.js';
const RUNNODEBACK_FILE = 'runNodeBack.js';

module.exports = function(context) {
  fs.copyFileSync(path.join(SOURCE_FILE_DIR,MAIN_FILE), path.join(NODEJS_PROJECT_ROOT,MAIN_FILE)); 
  fs.copyFileSync(path.join(SOURCE_FILE_DIR,RUNNODEBACK_FILE), path.join(NODEJS_PROJECT_ROOT,RUNNODEBACK_FILE));
  fs.copyFileSync(path.join(SOURCE_FILE_DIR,MAIN_FILE), path.join(ANDROID_FILE_PATH,MAIN_FILE)); 
  fs.copyFileSync(path.join(SOURCE_FILE_DIR,RUNNODEBACK_FILE), path.join(ANDROID_FILE_PATH,RUNNODEBACK_FILE)); 
}