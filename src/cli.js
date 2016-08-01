/**
 * @file fs-grep cli
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

import program from 'commander';
import 'colors';

import pkg from '../package';
import {exec} from '../';

// 配置参数
let option = {};

// 设置命令行工具
program
    .version(pkg.version)
    .arguments('<pattern> [files]')
    .option('--color', '高亮搜索词')
    .action((pattern, files) => {
        option.pattern = pattern;
        option.files = files || './**/*';
    })
    .parse(process.argv);

if (!option.pattern) {
    console.error('请使用 -h 查看帮助'.red);
    process.exit(1);
}

let read = exec(option.pattern, option.files);

read.on('line', (path, index, content) => {
    if (program.color) {
        console.log(path + ':' + index + ' => ', content.replace(new RegExp(option.pattern, 'g'), $0 => $0.red));
    }
    else {
        console.log(path + ':' + index + ' => ' + content);
    }
});
