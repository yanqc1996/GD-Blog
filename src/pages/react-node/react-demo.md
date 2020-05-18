# React项目初始化+React路由相关

<a name="xePdy"></a>
## 1.react项目初始化：
参照教程即可
<a name="PDy6x"></a>
## 2.react-rouer：react路由相关
<a name="Jkzar"></a>
#### React Router中有三类组件：

- **router** 组件（BrowserRouter，HashRouter）
- **route matching** 组件（Route，Switch）
- **navigation** 组件（Link）
<a name="wAXEQ"></a>
#### 安装react-routr-dom：npm install react-router-dom
安装完成后，上述组件即可通过react-router-dom得到 

`import { BrowserRouter, Route, Link } from "react-router-dom"`
<a name="1uMPq"></a>
#### Routers
基于React Router的web应用，根组件应该是一个routr组件（BrowserRouter,HashRouter)<br />这两种路由都会创建一个history对象。如果我们应用有服务器响应web的请求，通常使用BrowerRouter组件，如果使用静态文件服务器，则使用HashRouter组件<br />修改新建项目src/index文件：
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'


ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
```
<a name="hLvdN"></a>
#### 路由匹配
react-router-dom中有两个匹配路由的组件<Route>和<Switch><br />路由匹配是通过将<Route>组件的path属性与当前的location的pathname进行比较来完成的，匹配成功则其对应的组件内容将被渲染出来，不匹配，则渲染null,如果一个<Route>没有path属性，组件内容将会一直渲染
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import login from './pages/login';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import { Route, Switch } from "react-router-dom";
const { location } = { pathname: '/login' }

ReactDOM.render(
  <HashRouter>
    {/* <Route path='/' component={App}/>  */}
    <Route path='/login' component={login}/>
  </HashRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
```
我们可以在组件树的任何位置放置<Route>组件。但是更常见的情况是将几个<Route>写在一起。<br /><Switch>组件可以用来将多个<Route>“包裹”在一起。多个组件在一起使用时，并不强制要求使用<Switch>组件，但是使用<Switch>组件却是非常便利的。<Switch>会迭代它下面的所有<Route>子组件，并只渲染第一个路径匹配的<Route>。
```javascript
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  {/* 如果上面的Route的路径都没有匹配上，则 <NoMatch>被渲染，我们可以在此组件中返回404 */}
  <Route component={NoMatch} />
</Switch>
```
<a name="1DoZq"></a>
#### components
在使用<Route>时，如果我们想渲染的内容已经有对应的组件，则可以直接使用component的方法。例如：
```javascript
<Route path="/user/:username" component={User} />;

function User({ match }) {
  return <h1>Hello {match.params.username}!</h1>;
}
```
<a name="vO1OS"></a>
#### render
render方法直接使用一个内联函数来渲染内容。
```javascript
<Route path="/home" render={() => <div>Home</div>}/>
```
<a name="EUIKn"></a>
#### 注意：
不要将component属性设置为一个函数，然后在其内部渲染组件。这样会导致已经存在的组件被卸载，然后重写创建一个新组件，而不是仅仅对组件进行更新。
<a name="RLqcY"></a>
#### Navigation
React Router提供了一个组件用来在应用中添加link。当<Link>渲染时，一个<a>标签在html页面中被创建出来。<br />`<Link to="/">Home</Link>`<br /><NavLink>组件是一个特殊的<Link>组件。<br />当它的path与当前location匹配时，可以自定义其样式来表示当前页面位置。
```javascript
// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>
```
当需要页面重定向时，我们可以使用<Redirect>组件。当一个<Redirect>组件被渲染时，页面将被渲染到<Redirect>组件的to属性指定的位置上。
```javascript
<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```


