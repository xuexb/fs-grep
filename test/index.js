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
            exec(true, null);
            exec(true, '');
            exec(false, false);
        });
    });

    it('exec(test, dir)', done => {
        mock({
            "test/test.md": "test 测试 test",
            "test/test2.md": "no",
            "test/test3.md": "md"
        });

        let read = exec('test', './test/**/*');
        let num = 0;

        read.on('line', (path, index, content) => {
            num += 1;
        });

        read.on('end', (data) => {
            num.should.be.equal(1);

            // 验证data=[]
            Array.isArray(data).should.be.true();
            data.length.should.be.equal(1);

            // 验证data[0]=object
            data[0].should.be.type('object');

            // 验证data[0].path=string
            data[0].path.should.be.type('string');

            // 验证data[0].data=[]
            Array.isArray(data[0].data).should.be.true();
            data[0].data.length.should.be.equal(1);

            data[0].data[0].index.should.be.equal(1);
            data[0].data[0].content.should.be.equal('test 测试 test');

            done();
        });
    });
});
