/**
 * @file 测试用例
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

import should from 'should';
import {resolve, dirname} from 'path';
import mock from 'mock-fs';

import {exec} from '../src/index';

describe('fs-grep', () => {
    afterEach(mock.restore);

    it('exec function', () => {
        exec.should.be.type('function');
    });

    it('exec()', () => {
        should.throws(() => {
            exec();
            exec(false);
            exec(true);
            exec(false, false);
        });
    });

    it('exec(test, dir)', () => {
        // mock({
        //     doc: {
        //         'check.md': 'check',
        //         'fecs.md': 'fecs'
        //     }
        // });
    });
});
