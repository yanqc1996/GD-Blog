# vue-jest单元测试

搭建参照：[https://juejin.im/post/5db7c416f265da4d3a52dd9b](https://juejin.im/post/5db7c416f265da4d3a52dd9b)<br />

<a name="TOVKb"></a>
### 1.项目中引入方式：
<a name="AaJRv"></a>
#### 1.初始化时引入：在新建项目时选择Unit Testing
```javascript
? Check the features needed for your project:
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◯ Router
 ◯ Vuex
 ◯ CSS Pre-processors
 ◯ Linter / Formatter
 ◉ Unit Testing
 ◯ E2E Testing

```
选择Jest并完成项目安装
```javascript
? Pick a unit testing solution:
  Mocha + Chai
❯ Jest

```
<a name="0oMX3"></a>
#### 2.如果要在已经创建好的项目中引入Jest，直接在项目使用vue add @vue/unit-jest插件，会自动将需要的依赖安装配置好。
<a name="T5S9D"></a>
#### 3.修改package.json文件
```
    "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "test:unit": "vue-cli-service test:unit --watch",
        "test:cov": "vue-cli-service test:unit --coverage"
    },
```
<a name="EeWU7"></a>
#### 4.控制台执行测试命令：npm run test:unit，终端测试结果
![image.png](https://cdn.nlark.com/yuque/0/2020/png/326402/1589360556905-4cc8d98b-958a-406d-9a4e-630038f7cd05.png#align=left&display=inline&height=204&margin=%5Bobject%20Object%5D&name=image.png&originHeight=408&originWidth=934&size=192447&status=done&style=none&width=467)

<a name="MwxuL"></a>
### 2.项目中自定义使用：参照链接文档即可
