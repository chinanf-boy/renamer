
[![view on npm](http://img.shields.io/npm/v/renamer.svg)](https://www.npmjs.org/package/renamer)
[![npm module downloads](http://img.shields.io/npm/dt/renamer.svg)](https://www.npmjs.org/package/renamer)
[![Build Status](https://travis-ci.org/75lb/renamer.svg)](https://travis-ci.org/75lb/renamer)
[![Dependency Status](https://david-dm.org/75lb/renamer.svg)](https://david-dm.org/75lb/renamer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# 更名

批量重命名文件和文件夹. 

## 安装

安装[节点](https://nodejs.org)然后: 

```sh
$ npm install -g renamer
```

_linux / mac用户可能需要运行上面的`sudo`_

## 用法

      renamer
      Batch rename files and folders.

      Usage
      $ renamer <options> <files>

      -f, --find <string>      The find string, or regular expression when --regex is set. If not set, the whole filename will be replaced.
      -r, --replace <string>   The replace string. With --regex set, --replace can reference parenthesised substrings from --find with $1, $2, $3
                               etc. If omitted, defaults to a blank string. The special token '{{index}}' will insert an incrementing number per
                               file processed.
      -e, --regex              When set, --find is interpreted as a regular expression.
      -d, --dry-run            Used for test runs. Set this to do everything but rename the file.
      -i, --insensitive        Enable case-insensitive finds.
      -v, --verbose            Use to print additional information.
      -h, --help               Print usage instructions.

      for more detailed instructions, visit https://github.com/75lb/renamer

有关正则表达式的更多信息,请参阅[这个有用的指南](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions). 

**不要忘记先测试你的重命名过程`--dry-run`!**

## 递归

重命名器内置globbing支持 (由...提供[node-glob](https://github.com/isaacs/node-glob),启用递归操作. 为了缓解,使用`**`通配符,其中目录名似乎应用"任何目录,包括这个"的含义. 

例如,该命令对所有操作`JS`当前目录中的文件: 

    $ renamer --find this --replace that '*.js'

此命令对所有操作`JS`文件,递归地: 

    $ renamer --find this --replace that '**/*.js'

此命令对所有操作`JS`文件从`LIB`目录向下: 

    $ renamer --find this --replace that 'lib/**/*.js'

**没有globstar的bash用户需要将glob表达式用引号括起来以防止本地文件扩展**即`'** / *. JS'`

## 例子

一些真实世界的例子. 

**Windows用户**: 以下示例命令中使用的单引号用于bash (mac / linux) 用户,请在Windows上用双引号将其替换. 

### 简单替换

```sh
$ renamer --find '[bad]' --replace '[good]' *
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── A poem [bad].txt
├── A story [bad].txt</code></pre></td>
            <td><pre><code>.
├── A poem [good].txt
├── A story [good].txt</code></pre></td>
        </tr>
    </tbody>
</table>

### 不区分大小写的发现

```sh
$ renamer --insensitive --find 'mpeg4' --replace 'mp4' *
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── A video.MPEG4
├── Another video.Mpeg4</code></pre></td>
            <td><pre><code>.
├── A video.mp4
├── Another video.mp4</code></pre></td>
        </tr>
    </tbody>
</table>

### 去掉不需要的文字

```sh
$ renamer --find 'Season 1 - ' *
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── Season 1 - Some crappy episode.mp4
├── Season 1 - Load of bollocks.mp4</code></pre></td>
            <td><pre><code>.
├── Some crappy episode.mp4
├── Load of bollocks.mp4</code></pre></td>
        </tr>
    </tbody>
</table>

### 简单的文件名清理

```sh
$ renamer --regex --find '.*_(\d+)_.*' --replace 'Video $1.mp4' *
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── [ag]_Annoying_filename_-_3_[38881CD1].mp4
├── [ag]_Annoying_filename_-_34_[38881CD1].mp4
├── [ag]_Annoying_filename_-_53_[38881CD1].mp4</code></pre></td>
            <td><pre><code>.
├── Video 3.mp4
├── Video 34.mp4
├── Video 53.mp4</code></pre></td>
        </tr>
    </tbody>
</table>

### 给你的图片一个新的编号方案

```sh
$ renamer --replace 'Image{{index}}.jpg' *
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── IMG_5776.JPG
├── IMG_5777.JPG
├── IMG_5778.JPG</code></pre></td>
            <td><pre><code>.
├── Image1.jpg
├── Image2.jpg
├── Image3.jpg</code></pre></td>
        </tr>
    </tbody>
</table>

### 对所有这些完全停止做一些事情

```sh
$ renamer --regex --find '\.(?!\w+$)' --replace ' ' *
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── loads.of.full.stops.every.where.jpeg
├── loads.of.full.stops.every.where.mp4</code></pre></td>
            <td><pre><code>.
├── loads of full stops every where.jpeg
├── loads of full stops every where.mp4</code></pre></td>
        </tr>
    </tbody>
</table>

### 如果尚未完成,请将您的名称添加到一个文件加载中

```sh
$ renamer --regex --find '(data\d)(\.\w+)' --replace '$1 (checked by Lloyd)$2' *
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── data1.csv
├── data2 (checked by Lloyd).csv
├── data3.xls</code></pre></td>
            <td><pre><code>.
├── data1 (checked by Lloyd).csv
├── data2 (checked by Lloyd).csv
├── data3 (checked by Lloyd).xls</code></pre></td>
        </tr>
    </tbody>
</table>

### 递归地重命名文件和文件夹

```sh
$ renamer --find 'pic' --replace 'photo' '**'
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── pic1.jpg
├── pic2.jpg
└── pics
    ├── pic3.jpg
    └── pic4.jpg
</code></pre></td>
            <td><pre><code>.
├── photo1.jpg
├── photo2.jpg
└── photos
    ├── photo3.jpg
    └── photo4.jpg</code></pre></td>
        </tr>
    </tbody>
</table>

### 前缀文件和文件夹,递归

```sh
$ renamer --regex --find '^' --replace 'good-' '**'
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>.
├── pic1.jpg
├── pic2.jpg
└── pics
    ├── pic3.jpg
    └── pic4.jpg
</code></pre></td>
            <td><pre><code>.
├── good-pic1.jpg
├── good-pic2.jpg
└── good-pics
    ├── good-pic3.jpg
    └── good-pic4.jpg</code></pre></td>
        </tr>
    </tbody>
</table>

* * *

©2012-18劳埃德布鲁克斯\\[75pound@gmail.com \\](mailto:75pound@gmail.com\). 由...记录[jsdoc到降价](https://github.com/75lb/jsdoc-to-markdown). 
