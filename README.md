# 说明


## egg+sequelize+swagger 示例
```bash
 swagger单元测试
 http://localhost:7001/swagger-ui.html
 
 PESTful风格路由设计
```
### 运行前准备
```bash
 构建model文件里表及字段
 配置cofig连接数据库
 运行npm run migration
 运行npm run migrate 数据库关联
 
```


### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

