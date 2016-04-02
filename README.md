# fs-grep
Contents of the file grep

## Cli

```shell
grep pattern files
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

### .sync

同步请求

```js
var data = fsGrep.sync(pattern, files);
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
```

