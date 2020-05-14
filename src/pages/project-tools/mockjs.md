# mockjs引入项目

<a name="Nhibh"></a>
#### 1.初始化：全局引入mokejs  npm install mockjs --save-dev
<a name="q1gKn"></a>
#### 2.src下创建mock文件，用来存放模拟的接口和数据
![image.png](https://cdn.nlark.com/yuque/0/2020/png/326402/1589357487860-66275aea-2139-4b02-acad-14652b1e3048.png#align=left&display=inline&height=187&margin=%5Bobject%20Object%5D&name=image.png&originHeight=374&originWidth=494&size=22656&status=done&style=none&width=247)
<a name="8cavz"></a>
#### 3.index.js文件参考
```javascript
import Mock from 'mockjs'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
// if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
 // 使用同步加载依赖
    require('./services/login')
    //自定义的接口文件路径
    require('./services/complex')
  Mock.setup({
    timeout: 800 // setter delay time
  })
// }

```
<a name="EjuLQ"></a>
#### 4.在main.js中引入mock:require('./mock')
<a name="Kdjwd"></a>
#### 5.在util.js中对一些返回内容进行封装
```javascript
import qs from 'query-string'

const responseBody = {
  data:"",
  retMsg: '',
  timestamp:"",
  retCode: 0
}

export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.retMsg = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.retCode = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}//返回数据格式话操作

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}//get方法时获取get的后置参数？应该需要修改

export const getBody = (options) => {
  console.log(options)
  return options.body && qs.parse(options.body)
}

```
<a name="DpnuP"></a>
#### 6.模拟接口生成
```javascript
import Mock from 'mockjs'
import { builder, getBody } from '../util'

const username = ['admin', 'user', 'super']
const password = ['123456', '8914de686ab28dc22f30d3d8e107ff6c'] // admin, ant.design

const login = (options) => {
  const body = getBody(options)
  if (!username.includes(body.userName) || !password.includes(body.passWord)) {
    return builder("", '账户或密码错误', 401)
  }
  return builder({
    'id': Mock.mock('@guid'),
    'name': Mock.mock('@name'),
    'username': 'admin',
    'password': '123456',
    'status': 1,
    'token': '4291d7da9005377ec9aec4a71ea837f',
  }, '登录成功', 200)
}

Mock.mock(/\/login\/login/, 'post', login)

```
<a name="B57xv"></a>
#### 7.页面调用模拟接口，返回成功（本地模拟在network中不显示，不知道有没有办法显示出来）
![image.png](https://cdn.nlark.com/yuque/0/2020/png/326402/1589357919628-2fe8f31a-703b-4abc-ae34-897c66cfa59f.png#align=left&display=inline&height=244&margin=%5Bobject%20Object%5D&name=image.png&originHeight=488&originWidth=1568&size=108038&status=done&style=none&width=784)
