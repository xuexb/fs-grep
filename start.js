/**
 * @file 简单测试
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

var grep = require('./');
var read = grep.exec('grep', './*');

read.on('line', function (path, index, content) {
    console.log('path => ' + path);
    console.log('index => ' + index);
    console.log('content => ' + content);

    console.log('=========');
});
read.on('end', function (data) {
    console.log(data);
});
