/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk'); // 终端输出字体颜色插件
// 检测引入文件
function checkRequiredFiles(files) {
  var currentFilePath; // 当前文件路径
  try {
    files.forEach(filePath => { // 遍历文件路径
      currentFilePath = filePath; // 设置当前文件路径
      // fs.accessSync(file, mode)
      // mode : 
      //    F_OK 表明文件对于调用进程是可见的
      //    R_OK 表明文件可被调用进程读取
      //    W_OK 表明文件可被调用进程写入
      //    X_OK 表明文件可被调用进程执行
      fs.accessSync(filePath, fs.F_OK); // 检查失败抛出err, 否则返回undefined
    });
    return true; // 通过检查
  } catch (err) {
    // 如果报错
    var dirName = path.dirname(currentFilePath); // 返回当前报错的路径如: use/info/name
    var fileName = path.basename(currentFilePath); // 返回当前报错的文件名如: xxx.html
    console.log(chalk.red('Could not find a required file.')); 
    console.log(chalk.red('  Name: ') + chalk.cyan(fileName));
    console.log(chalk.red('  Searched in: ') + chalk.cyan(dirName));
    return false; // 检查不通过
  }
}

module.exports = checkRequiredFiles;
