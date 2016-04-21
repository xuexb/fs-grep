/**
 * @file 测试用例
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

import should from 'should';
import mock from 'mock-fs';

import {exec} from '../src/index';

describe('fs-grep', () => {
    afterEach(mock.restore);

    it('exec function', () => {
        exec.should.be.type('function');
    });

    it('exec() param check', () => {
        should.throws(() => {
            exec();
        });

        should.throws(() => {
            exec(false, false);
        });

        should.throws(() => {
            exec('str');
        });

        exec('str', 'str');

        should.throws(() => {
            exec(undefined, 'str');
        });

        should.throws(() => {
            exec('', 'str');
        });
    });

    it('exec(test, dir)', done => {
        mock({
            'test/test.md': 'test 测试 test',
            'test/test2.md': 'no',
            'test/test3.md': 'md'
        });

        let read = exec('test', './test/**/*');
        let num = 0;

        read.on('line', (path, index, content) => {
            num += 1;
        });

        read.on('end', data => {
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

    it('exec empty path', done => {
        let read = exec('xieJifksljfds', './empty/**/*');
        read.on('end', data => {
            data.length.should.be.equal(0);
            done();
        });
    });

    it('exec not found', done => {
        mock({
            './empty/a.md': '',
            './empty/b.md': ''
        });

        let read = exec('a', './empty/**/*');
        read.on('end', data => {
            data.length.should.be.equal(0);
            done();
        });
    });

    it('exec end result', done => {
        mock({
            './empty/a.md': ['1a', '', '2a', '3a'].join('\n')
        });

        let read = exec('a', './empty/**/*');
        read.on('end', data => {
            data.length.should.be.equal(1);
            data[0].data.length.should.be.equal(3);
            data[0].data[0].index.should.be.equal(1);
            data[0].data[0].content.should.be.equal('1a');
            data[0].data[1].index.should.be.equal(3);
            data[0].data[1].content.should.be.equal('2a');
            data[0].data[2].index.should.be.equal(4);
            data[0].data[2].content.should.be.equal('3a');
            done();
        });
    });

    it('exec line', done => {
        mock({
            './empty/a.md': ['1a', '', '2a', '3a'].join('\n')
        });

        let read = exec('a', './empty/**/*');
        let arr = [];
        let filepath = null;

        read.on('line', (path, index, content) => {
            filepath = path;

            arr.push({
                // path,
                index,
                content
            });
        });

        read.on('end', data => {
            data[0].data.should.deepEqual(arr);
            data[0].path.should.equal(filepath);
            done();
        });
    });
});
