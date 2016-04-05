# fs-grep

Contents of the file grep

---

[![code style fecs](https://img.shields.io/badge/code%20style-fecs-brightgreen.svg)](https://github.com/ecomfe/fecs)
[![NPM Version](https://img.shields.io/npm/v/fs-grep.svg)](https://npmjs.org/package/fs-grep)
[![NPM Downloads](https://img.shields.io/npm/dm/fs-grep.svg)](https://npmjs.org/package/fs-grep)
[![Linux Build](https://img.shields.io/travis/xuexb/fs-grep/master.svg?label=linux)](https://travis-ci.org/xuexb/fs-grep)
[![Windows Build](https://img.shields.io/appveyor/ci/xuexb/fs-grep/master.svg?label=windows)](https://ci.appveyor.com/project/xuexb/fs-grep)
[![Test Coverage](https://img.shields.io/coveralls/xuexb/fs-grep/master.svg)](https://coveralls.io/r/xuexb/fs-grep?branch=master)
[![Dependencies](https://img.shields.io/david/xuexb/fs-grep.svg?style=flat)](https://david-dm.org/xuexb/fs-grep)
[![DevDependencies](https://img.shields.io/david/dev/xuexb/fs-grep.svg?style=flat)](https://david-dm.org/xuexb/fs-grep)


## Cli

```shell
fs-grep <pattern> [files]
```

## Api

### .exec

```js
var read = fsGrep.exec(pattern, files);

read.on('line', function (path, index, content) {
    // path => 文件路径
    // index => 文件行数
    // content => 匹配的内容
});


read.on('end', function (data) {
    data = [
        {
            path: '',
            data: [
                {
                    index: '',
                    content: ''
                }
            ]
        }
    ];
});

read.on('error', function (errcode, errmsg) {});
```

