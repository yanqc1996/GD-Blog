# Redux基础

React有props和state：<br />1.props意味着父级分发下来的属性<br />2.state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，这就是react的单向数据流<br />
<br />这就一位置如果是一个数据状态非常复杂的应用，更多的时候发现React根本无法让两个组件互相交流，使用对方的数据，react通过层级传递数据的这种方法是非常难受的，这个时候，迫切需要一个机制，把所有的state集中到组件顶部，能够灵活的将所有state各取所需的分发给所有的组件，这就是redux<br />
<br />简介：<br />1.redux的诞生是为了给React应用提供「可预测化的状态管理」机制<br />2.Redux会将这个应用状态（其实也就是数据）存储到一个地方，称为store<br />3.这个store里面保存一个状态树（state tree）<br />4.组件改变state的唯一方法是通过调用store的dispatch方法，触发一个action，这个action被对应的reducer处理，于是，state完成更新<br />5.组件可以派发（dispatch)行为（action）给store，而不是直接通知其他组件<br />6.其他组件可以通过订阅store中的状态(state)来刷新自己的视图<br />
<br />使用步骤<br />1.创建reducer<br />可以使用单独的一个reducer，也可以将多个reducer合并为一个reducer，即：combineReducers()<br />action发出命令后将state放入rreducer加工函数中，返回新的state，对state进行加工处理。<br />2.创建action<br />用户是接触不到state的，只能由view触发，所以这个action可以理解为指令，需要发出多少动作就有多少指令<br />action是一个对象，必须有一个叫type的参数，定义action类型<br />3.创建的store，使用createStore方法<br />store可以理解为有多个建工机器的总工厂<br />提供subscribe，dispatch，getState这些方法。<br />实战：
```javascript
npm install redux -S // 安装

import { createStore } from 'redux' // 引入

const reducer = (state = {count: 0}, action) => {----------> ⑴
  switch (action.type){
    case 'INCREASE': return {count: state.count + 1};
    case 'DECREASE': return {count: state.count - 1};
    default: return state;
  }
}

const actions = {---------->⑵
  increase: () => ({type: 'INCREASE'}),
  decrease: () => ({type: 'DECREASE'})
}

const store = createStore(reducer);---------->⑶

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(actions.increase()) // {count: 1}
store.dispatch(actions.increase()) // {count: 2}
store.dispatch(actions.increase()) // {count: 3}
```
![16ad40d90c5d46fa.jpg](https://cdn.nlark.com/yuque/0/2020/jpeg/326402/1590051932184-cce23496-080f-4ca9-bcde-1bfb87a35dab.jpeg#align=left&display=inline&height=195&margin=%5Bobject%20Object%5D&name=16ad40d90c5d46fa.jpg&originHeight=195&originWidth=599&size=16811&status=done&style=none&width=599)<br />

<a name="RVFhv"></a>
## react-redux
如果把store直接集成到React应用的顶层props里面，只要各个子组件能访问到顶层props就行，比如这样
```javascript
<顶层组件 store={store}>
  <App />
</顶层组件>
```
这就是react-redux。<br />
<br />React Redux将组件分为容器组件和UI组件<br />1.前者会处理逻辑<br />2.后置只负责显示和交互，内部不处理逻辑，状态完全由外部掌控<br />

<a name="6Nkqz"></a>
## 两个核心
<a name="BZhDK"></a>
### 1.Provider
一般我们都将顶级组件包裹在Provider组件之中，这样的话，所有的组件都可以在react-redux的控制之下，但是store必须作为参数放到Provider组件中去
```javascript
<Provider store = {store}>
    <App />
<Provider>
```
<a name="bPxyD"></a>
### 2.connect
这是react-redux中比较难的部分，首先记住下面的代码：
```javascript
connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```
mapStateToProps：把Redux中的数据映射到React的props中去<br />举个栗子
```javascript
const mapStateToProps = (state) => {
      return {
      	// prop : state.xxx  | 意思是将state中的某个数据映射到props中
        foo: state.bar
      }
    }
```
然后渲染的时候就可以使用this.props.foo
```javascript
class Foo extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
        	// 这样子渲染的其实就是state.bar的数据了
            <div>this.props.foo</div>
        )
    }
}
Foo = connect()(Foo);
export default Foo;
```
mapDispatchToProps：把各种dispatch也变成了props让你可以直接使用
```javascript
const mapDispatchToProps = (dispatch) => { // 默认传递参数就是dispatch
  return {
    onClick: () => {
      dispatch({
        type: 'increatment'
      });
    }
  };
}
```
```javascript
class Foo extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
        	
             <button onClick = {this.props.onClick}>点击increase</button>
        )
    }
}
Foo = connect()(Foo);
export default Foo;
```
<a name="mJ4GG"></a>
## redux-sage

<br />如果按照原始的redux工作流程，当组件中产生一个action后会直接触发reducer修改state，reducer又是一个纯函数，也就是不能在reducer中进行异步操作<br />而往往实际中，组件发生action后，在进入reducer之前需要完成一个异步任务，比如发送ajsx请求拿到数据后，再进入reducer，显然原生的redux是不支持这种操作的<br />这个时候急需一个中间件来处理这种业务场景，目前最优雅的处理方式自然是redux-saga
<a name="73cIx"></a>
### 核心讲解
<a name="1ciyz"></a>
#### 1.sage辅助函数
redux-saga提供了一些辅助函数，用来在一些特定的action被发起到Store时派生任务，先讨论两个辅助函数takeEvery和takeLatest
<a name="Tl3iD"></a>
#### takeEvery
takeEvery：会一直进行函数监听和触发<br />例如：每次点击按钮去Fetch获取数据时，我们发起一个FETCH_REQUESTED的action，我们想启动一个任务从服务器获取一些数据，来处理这个action,类似于：
```javascript
window.addEventLister('xxx',fn)
```
当dispatch.xxx的时候，就会执行fn方法<br />首先我们创建一个将执行异步action的任务（fn)
```javascript
// put：你就认为put就等于 dispatch就可以了；

// call：可以理解为实行一个异步函数,是阻塞型的，只有运行完后面的函数，才会继续往下；
// 在这里可以片面的理解为async中的await！但写法直观多了！
import { call, put } from 'redux-saga/effects'

export function fetchData(action) {
   try {
      const apiAjax = (params) => fetch(url, params);
      const data = yield call(apiAjax);
      yield put({type: "FETCH_SUCCEEDED", data});
   } catch (error) {
      yield put({type: "FETCH_FAILED", error});
   }
}
```
然后在每次FETCH_REQUESTED action被发起时启动上面的任务，也就相当于每次触发一个名字为FETCH_REQUESTED的action就会执行上面的任务
```javascript
import { takeEvery } from 'redux-saga'

function  watchFetchData() {

  yield takeEvery("FETCH_REQUESTED", fetchData)
}
```
上面的takeEvery函数可以使用下面的写法替换
```javascript
function watchFetchData() {
  
   while(true){
     yield take('FETCH_REQUESTED');
     yield fork(fetchData);
   }
}
```
<a name="klebV"></a>
#### takeLatest
在上面的例子中，takeEvery允许多个fetchData实例同时启动，在某个特定时刻，我们可以启动一个新的fetchData任务，尽管之前还有一个或多个fetchData尚未结束<br />如果我们只想得到最新的那个请求的响应（例如，始终显示最新版本的数据），我们可以使用takeLatest辅助函数
```javascript
import { takeLatest } from 'redux-saga'

function watchFetchData() {
  yield takeLatest('FETCH_REQUESTED', fetchData)
}
```
和takeEvery不同，在任何时刻takeLatest只允许执行一个fetchData任务，并且这个任务是最后被启动的那个，如果之前有一个任务在执行，那之前的那个任务会自动被取消<br />
<br />2.Effect Creators<br />redux-sage框架提供了很多创建effect的函数，下面我们就来简单介绍下开发中最常用的几种

- take(pattern)
- put(action)
- call(fn, ...args)
- fork(fn, ...args)
- select(selector, ...args)

take（pattern)<br />take函数可以理解为监听未来的action，它创建了一个命令对象，告诉midleware等待一个特定的action，Generator会暂停，知道一个与pattern匹配的action被发起，才会急需执行下面的语句，也就是说，take是一个阻塞的effect<br />用法：
```javascript
function watchFetchData() {
   while(true) {
   // 监听一个type为 'FETCH_REQUESTED' 的action的执行，直到等到这个Action被触发，才会接着执行下面的 		yield fork(fetchData)  语句
     yield take('FETCH_REQUESTED');
     yield fork(fetchData);
   }
}
```
put（action）<br />put函数是用来发送action的effect，你可以简单的把它理解成为redux框架中的dispatch函数，当put一个action后，reducre中就会计算新的state并返回，注意：put也是阻塞effect<br />用法：
```javascript
export function toggleItemFlow() {
    let list = []
    // 发送一个type为 'UPDATE_DATA' 的Action，用来更新数据，参数为 `data：list`
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list
    })
}
```
call(fn,...args)<br />call函数你可以把它简单的理解为就是可以调用其他函数的函数，它命令middleware来调用fn函数，注意：fn函数可以是一个Generator函数，也可以是一个返回Promise的普通函数，call函数也是阻塞effect<br />用法：
```javascript
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function* removeItem() {
  try {
    // 这里call 函数就调用了 delay 函数，delay 函数为一个返回promise 的函数
    return yield call(delay, 500)
  } catch (err) {
    yield put({type: actionTypes.ERROR})
  }
}
```
fork(fn,...args)<br />fork函数和call函数很想，都是用来调用其他函数的，但是fork函数是非阻塞函数，也就是说，程序执行完yield fork（fn,args）这一行代码后，会立即直接执行下一行代码语句，而不会等待fn函数返回结果后，再执行下面的语句<br />用法：
```javascript
import { fork } from 'redux-saga/effects'

export default function* rootSaga() {
  // 下面的四个 Generator 函数会一次执行，不会阻塞执行
  yield fork(addItemFlow)
  yield fork(removeItemFlow)
  yield fork(toggleItemFlow)
  yield fork(modifyItem)
}
```
select（selector,...args）<br />select函数是用来只是middleware调用提供的选择器获取Store上的state数据，你也可以简单的把它理解为redux框架中获取store上的state数据一样的功能：store.getState()<br />用法：
```javascript
export function toggleItemFlow() {
     // 通过 select effect 来获取 全局 state上的 `getTodoList` 中的 list
     let tempList = yield select(state => state.getTodoList.list)
}
```
<a name="ynFeO"></a>
## 一个具体实例
index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import Counter from './Counter'
import rootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware() // 创建了一个saga中间件实例

// 下边这句话和下边的两行代码创建store的方式是一样的
// const store = createStore(reducers,applyMiddlecare(middlewares))

const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore)
const store = createStoreWithMiddleware(rootReducer)

sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({ type })

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}

render()

store.subscribe(render)
```
sagas.js
```javascript
import { put, call, take,fork } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga'

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* incrementAsync() {
  // 延迟 1s 在执行 + 1操作
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' });
}

export default function* rootSaga() {
  // while(true){
  //   yield take('INCREMENT_ASYNC');
  //   yield fork(incrementAsync);
  // }

  // 下面的写法与上面的写法上等效
  yield* takeEvery("INCREMENT_ASYNC", incrementAsync)
}

```
reducer.js
```javascript
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'INCREMENT_ASYNC':
      return state
    default:
      return state
  }
}
```
redux-saga基本用法总结

- **使用 createSagaMiddleware 方法创建 saga 的 Middleware ，然后在创建的 redux 的 store 时，使用 applyMiddleware 函数将创建的 saga Middleware 实例绑定到 store 上，最后可以调用 saga Middleware 的 run 函数来执行某个或者某些 Middleware 。**
- **在 saga 的 Middleware 中，可以使用 takeEvery 或者 takeLatest 等 API 来监听某个 action ，当某个 action 触发后， saga 可以使用 call 发起异步操作，操作完成后使用 put 函数触发 action ，同步更新 state ，从而完成整个 State 的更新。**
