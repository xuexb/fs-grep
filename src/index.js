/**
 * @file fs-grep
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

import readLine from 'fs-readline';
// import iconv from 'iconv-lite';
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
        encoding: 'utf8',
        maxFileLength: null
    }

    /**
     * 构造函数
     *
     * @param  {Object} options 配置参数
     */
    constructor(options) {
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

        /**
         * 匹配的结果
         * @type {Array}
         */
        let result = [];

        /**
         * 匹配到结果的文件个数，用来计算是否结束
         * @type {Number}
         */
        let rseultLength = 0;

        // 监听匹配事件
        read.on('match', filepath => {
            let temp = {
                path: filepath,
                data: []
            };

            // 逐行读取
            let rl = readLine(filepath, {
                blankLine: false
            });

            // 匹配文件个数+1
            rseultLength += 1;

            rl.on('line', (line, index) => {
                line = line.toString(options.encoding);
                if (line.indexOf(options.pattern) > -1) {
                    this._emit('line', filepath, index, line);

                    temp.data.push({
                        index,
                        content: line
                    });
                }
            });

            rl.on('end', (line) => {
                // 让匹配文件结果减少
                rseultLength -= 1;

                // 如果有匹配到内容，则追加到结果集中
                if (temp.data.length) {
                    result.push(temp);
                }

                if (rseultLength === 0) {
                    this._emit('end', result);
                }
            });

            rl.on('abort', () => {
                this._emit('end', result);
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
    if ("undefined" === typeof pattern) {
        throw new Error('pattern is empty');
    }

    if ('string' !== typeof files) {
        throw new Error('files is not string');
    }

    return new Grep({
        pattern,
        files
    });
}
