/**
 * @file fs-grep
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

import readLine from 'fs-readline';
import iconv from 'iconv-lite';
import glob from 'glob';
import Event from 'events';

class Grep {

    /**
     * 默认参数
     *
     * @todo
     * @type {Object}
     */
    static options = {
    }

    /**
     * 构造函数
     *
     * @param  {Object} options 配置参数
     */
    constructor(options = {}) {
        this.options = {
            ...Grep.options, ...options
        };

        this._event = new Event();

        this._init();
    }

    /**
     * 初始化
     *
     * @private
     */
    _init() {
        let options = this.options;
        let read = glob(options.files, {
            nodir: true
        });
        let result = [];

        read.on('match', filepath => {
            let rl = readLine(filepath, {
                blankLine: false
            });
            rl.on('line', (line, index) => {
                line = iconv.decode(line, 'gbk');
                if (line.indexOf(options.pattern) > -1) {
                    this._emit('line', filepath, index, line);
                }
            });
        });
    }

    /**
     * 绑定事件
     *
     * @param  {string}   name     事件名称:line,end
     * @param  {Function} callback 回调
     *
     * @return {Object}            this
     */
    on(name, callback) {
        this._event.on(name, callback);
        return this;
    }

    /**
     * 触发事件
     *
     * @private
     * @param  {string}    name 事件名称
     * @param  {Object} args args
     */
    _emit(name, ...args) {
        this._event.emit(name, ...args);
    }
}

/**
 * 执行搜索方法
 *
 * @param  {string} pattern 规则
 * @param  {string} files   文件
 *
 * @return {Object}         实例对象
 */
export function exec(pattern, files) {
    return new Grep({
        pattern,
        files
    });
}
