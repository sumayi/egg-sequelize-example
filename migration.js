'use strict';
//创建一个回调，exit方法会在当进程退出的时候执行。
const exec = require('child_process').exec;
const fs = require('fs');
//生成一个路径的方法=》方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
//兄弟方法===》path.resolve:方法会把一个路径或路径片段的序列解析为一个绝对路径。
const join = require('path').join;
/**
 *
 * @param path  起始目录文件夹路径
 */
function finder(path) {
  //readdirSync返回一个包含“指定目录下所有文件名称”的数组对象。
  const files = fs.readdirSync(path);
  files.forEach(val => {
    //切割文件名取.前名称
    const name = val.split('.')[0];
    exec(`npx sequelize migration:generate --name=init-${name}`, err => {
      if (err) {
        return false;
      }
      //文本格式字符串打开文件
      const data = fs.readFileSync(`${join(path, val)}`).toString();
      //以const为分割切割字符串为数组
      const arr = data.split('const');
      // console.log(arr)
      //拼凑文件内容
      arr[0] = 'up: async (queryInterface, Sequelize) => {\n';
      arr[1] = ' const ' + arr[1].split('app.').join('');//去掉app.
      //切割=》替换
      arr[2] = arr[2].split('return')[0].replace(`${name} = app.model.define`, 'await queryInterface.createTable');
      // console.log(arr[0])
      // console.log(arr[1])
      // console.log(arr[2])
      // 获取文件路径
      const url = join('.', 'database', 'migrations');
      // console.log(url, 'url@@@')
      //readdirSync方法将返回一个包含“指定目录下所有文件名称”的数组对象。
      const mfiles = fs.readdirSync(url);
      // console.log(mfiles, '@@mfiles')
      //生成文件名称
      const string = `-${name}.js`;
      const filename = Math.max(...mfiles.filter(val => val.indexOf(string) !== -1).map(v => v.split('-')[0]));
      // console.log(filename, '@@@filename')
      const writeUrl = join(url, `${filename}-init${string}`);
      // console.log(writeUrl, '@@@@writeUrl')
      //获取原文件内容=》数组
      const data2 = fs.readFileSync(writeUrl, 'utf8').split('\n');
      // console.log(data2, '@@@@')
      //数组切割删除=》添加，(3,8)删除添加位置
      data2.splice(3, 8, arr.join(''));
      // console.log(data2, '@@@@')
      //写入文件
      fs.writeFileSync(writeUrl, data2.join('\n'), 'utf8');
    });
  });
}
finder(join(__dirname, 'app', 'model'));
