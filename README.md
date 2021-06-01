## TS 前端项目常用工具集

# install

use unpkg cdn / 国内用户科学上网

```js
<script src="//unpkg.com/@se-fe/utils@latest/lib/iife/index.js"></script>;

const utils = se_utils.$localStorage;
```

use npm / yarn

支持 esm/commonjs

```
npm i @se-fe/utils
```

# $localStorage 相关操作

### setItem

- 支持过期时间设置
- @param key
- @param data
- @param expire 过期时间, 单位秒

### getItem 如果存在过期时间，则判断是否过期，过期返回 null

- @param key

### removeItem

- @param key

### pushItem 用在需要队列写入操作

- 数组追加形式写入
- @param key
- @param data
- @param sig 是否添加唯一标记

### consumeItem 配合 pushItem 使用

- 消费数组，调用方递归调用
- @param key
- @returns 返回消费数据
