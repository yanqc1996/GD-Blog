# vue生命周期详解

![1590024666742.jpg](https://cdn.nlark.com/yuque/0/2020/jpeg/326402/1590024682098-adf93931-6467-4be9-b0af-2d986e9720da.jpeg#align=left&display=inline&height=1386&margin=%5Bobject%20Object%5D&name=1590024666742.jpg&originHeight=1386&originWidth=590&size=100076&status=done&style=none&width=590)<br />![1712b7bfcd6edd1d.jpg](https://cdn.nlark.com/yuque/0/2020/jpeg/326402/1590025126762-4824426c-65ef-443c-823b-afd9f99a502b.jpeg#align=left&display=inline&height=3039&margin=%5Bobject%20Object%5D&name=1712b7bfcd6edd1d.jpg&originHeight=3039&originWidth=1200&size=71669&status=done&style=none&width=1200)<br />

<a name="wh6WL"></a>
### 最初：初始化实例：new Vue()
<a name="JoiZs"></a>
### 
<a name="AK0Bw"></a>
### 
<a name="Ubsgs"></a>
### 1.beforeCreate
概括：在初始化实例new Vue()之后，数据观测和暴露了一些有用的实例属性和方法<br />数据观测：在vue的响应式系统中加入data对象中所有的数据，涉及vue双向绑定原理实现，后续再论<br />暴露属性和方法：vue实例自带的一些属性和方法，以下例子中$的属性和方法就是vue实例自带的。
```javascript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```
<a name="VImaE"></a>
#### beforeCreate和created之间
1.初始化 `inject`<br />2.初始化`state`

  - 初始化 `props`
  - 初始化 `methods`
  - 初始化 `data`
  - 初始化 `computed`
  - 初始化 `watch`

3.初始化 `provide`<br />所以，我们在data中可以使用props的值，但是在props中不能使用data的值。<br />然后进入created阶段
```javascript
callHook(vm, 'created')
```


<a name="GlUkt"></a>
### 2.created
这个实例已经实现了数据劫持，把方法，计算属性也都挂载到了实例上，不能获取到真实的dom元素，不能访问到el,ref属性内容为空数组，这个钩子函数可以发送axios请求并把请求回来的数据保存到data中。
```javascript
let vm = new Vue({
    beforeCreate(){
        console.log(this);
        console.log('---beforeCreate---'); 
    },
    created(){
        console.log(this);
        console.log('---created---');
        debugger;
    },
    data(){
        return{
            msg:'hello'
        }
    }
})
```
<a name="YlJRo"></a>
#### created和beforeMounte之间
调用$mount方法，开始挂载组件到dom上（即渲染）<br />在渲染之前会先判断是否有定制的el选项，正常的写法：el:'app'，另一种用：vm:$mount('app')<br />$mount可以指定一个元素，不指定元素的话，内部会默认渲染到一个内存中的节点<br />

```javascript
let vm = new Vue({
    beforeCreate(){
        console.log('---beforeCreate---')    
    },
    created(){
        console.log(this) 
        console.log('---created---') 
    },
    beforeMount(){
        console.log('---beforeMount---') 
    },
    data(){
        return{
            msg:'hello'
        }
    }
})
vm.$mount()
```
虽然渲染失败了，但是走到了beforeMount这个钩子函数，它的要求是要么有个templete，要么有个render函数，把两者中的一个加上
```javascript
render(){
        
    },
template:'<div>hello</div>',
```
验证一下我们之前没有指定el,渲染在内存中，我们把它挂载到页面中去。
```javascript
vm.$mount()
console.log(vm.$el)
document.body.appendChild(vm.$el)
```
好处：可以把渲染好的元素插入到自己想要的节点中。<br />在生命周期流程图中，判读完el选项后，就会再判读是否有“指定的template选项”，是就将template编译到render函数中，没有则将el外部的HTML作为template 编译。 什么叫做el外部的HTML？就是我们常用：
```javascript
<div id="app"></div>
vm.$mount('#app')
```
这个div就是el外部的HTML，再统一编译到render函数中
```javascript
let vm = new Vue({
    beforeCreate(){
        console.log('---beforeCreate---')    
    },
    created(){
        console.log(this) 
        console.log('---created---') 
    },
    render(){
        console.log('---render---') 
    },
    template:'<div>hello</div>',
    beforeMount(){
        console.log('---beforeMount---') 
    },
    data(){
        return{
            msg:'hello'
        }
    }
})
vm.$mount('#app')
console.log(vm.$el)
document.body.appendChild(vm.$el)
```
如归有了render就不会使用template,它内部会把template渲染成render方法，所以在挂载之前就会调用render(）方法。<br />优先级关系：render>template>out html<br />beforeMount做的事情就是调用render方法，但是一般不会增加业务逻辑<br />
<br />el属性对生命周期的影响：
```javascript
// 有el属性的情况下
new Vue({
el: '#app',
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

// 输出结果
// 调用了beforeCreate
// 调用了created
// 调用了beforeMount
// 调用了mounted
```
```javascript
// 在没有el属性的情况下，没有vm.$mount

new Vue({
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

// 输出结果
// 调用了beforeCreate
// 调用了created
```
```javascript
// 在没有el属性的情况下，但是有vm.$mount方法

var vm = new Vue({
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

vm.$mount('#app')

// 输出结果
// 调用了beforeCreate
// 调用了created
// 调用了beforeMount
// 调用了mounted
```
template属性对生命周期的影响：<br />这里面分三种情况：<br />1、在实例内部有template属性的时候，直接用内部的，然后调用render函数去渲染。
2、在实例内部没有找到template，就调用外部的html。实例内部的template属性比外部的优先级高。
3、要是前两者都不满足，那么就抛出错误。
```javascript
new Vue({
  el: '#app',
  template: '<div id="app">hello world</div>'
})

//页面上渲染出了hello world


<div id="app">hello world</div>

new Vue({
  el: '#app'
})

// 页面上渲染出了hello world


//两者都存在的时候

<div id="app">hello world2</div>

new Vue({
  el: '#app',
  template: '<div id="app">hello world1</div>'
})
// 页面上渲染出了hello world1

```
从上述的例子可以看出内部的优先外部的。

- 关于这个生命周期中的一些问题：

1、为什么el属性的判断在template之前？
因为el是一个选择器，比如上述例子中我们用到的最多的是id选择器app，vue实例需要用这个el去template中寻找对应的。<br />2、实际上，vue实例中还有一种render选项，我们可以从文档上看一下他的用法：
```javascript
new Vue({
  el: '#app',
  render() {
    return (...)
  }
})
```
3、上述三者的渲染优先级：render函数 > template属性 > 外部html<br />4、vue编译过程——把tempalte编译成render函数的过程。<br />
<br />beforeMount被调用完成后：<br />把渲染组件的函数定义好，具体代码：
```javascript
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```
拆解来看，vm._render其实就是调用我们上一步拿到的render函数生成一个vnode,而vm._update方法则会对这个vnode进行patch操作，而vm._update通过createElm函数创建新节点并且渲染到dom节点中<br />接下来就是执行这段代码了，是由响应式原理的一个核心类Watcher负责执行这个函数，我们想要在这段过程中去观察这个函数读取了哪些响应式数据，将来这个响应式数据更新的时候，将来这些响应式数据更新的时候，我们需要重新执行updateComponent函数。<br />如果是更新后调用updateComponent函数的话，updateComponent内部的patch就不再是初始化时候的创建节点，而是对新旧vnode进行diff,最小化的更新到dom节点上去。（涉及diff算法，后续再论）<br />这一切交给Watcher完成：
```javascript
new Watcher(vm, updateComponent, noop, {
  before () {
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
  }
}, true /* isRenderWatcher */)
```
注意这里在before属性上定义了beforeUpdate函数，也就是说在Watcher被响应式属性的更新触发之后，重新渲染新试图之前，会先调用beforeUpdate生命周期。<br />注意，在render的过程中，如果遇到了子组件，则会调用createComponent函数。<br />createComponent函数内部，会为子组件生成一个属于自己的构造函数，可以理解为子组件自己的Vue函数：
```javascript
Ctor = baseCtor.extend(Ctor)
```
在普通场景下，其实这就是Vue.extend生成的构造函数，它继承自Vue函数，拥有它的很多全局属性。<br />除了组件有自己的生命周期外，其实vnode也有自己的生命周期。<br />那么子组件的vnode会有自己的init周期，这个周期内部会做这样的事情：
```javascript
// 创建子组件
const child = createComponentInstanceForVnode(vnode)
// 挂载到 dom 上
child.$mount(vnode.elm)
```
而createComponentInstanceForVnode内部又做了什么事呢？它回去调用自组件的构造函数。
```javascript
new vnode.componentOptions.Ctor(options)
```
构造函数的内部是这样的：
```javascript
const Sub = function VueComponent (options) {
  this._init(options)
}
```
这个_init其实就是我们文章开头的那个函数，也就是说，如果遇到子组件，那么就会优先开始子组件的构建过程，也就是说，从beforeCreated重新开始。这是一个递归的构建过程。<br />也就是说，如果我们有父->子->孙这三个组件，那么他们的初始化生命周期的顺序是这样的：
```javascript
父 beforeCreate 
父 create 
父 beforeMount 
子 beforeCreate 
子 create 
子 beforeMount 
孙 beforeCreate 
孙 create 
孙 beforeMount 
孙 mounted 
子 mounted 
父 mounted 
```
mounted:<br />实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问
```javascript
 let vm = new Vue({
    beforeCreate(){
        console.log('---beforeCreate---')    
    },
    created(){
        console.log(this) 
        console.log('---created---') 
    },
    template:'<div>hello</div>',
    beforeMount(){
        console.log('---beforeMount---') 
    },
    mounted(){
        console.log('---mounted---') 
        console.log(vm.$el)
    },
    data(){
        return{
            msg:'hello'
        }
    }
})
vm.$mount('#app')
```
5.beforeUpdate<br />等那个修改实例的data时，vue就会帮我们更新渲染试图，在这个过程中，vue提供了beforeUpdate的钩子给我们，在检测到我们要修改数据的时候，更新渲染视图之前就会触发钩子beforeUpdate.<br />vue更新方式是组件级别的，比如我们项目会有许多组件，在根组件中引入三个组件，其中一个组件更新重新渲染了（异步渲染），另外两个不会重新渲染<br />可以在这个钩子中，增加一些视图更新，不会导致视图多次更新。响应式数据更新时调用，发生在虚拟DOM打补丁之前。组件更新之前执行的函数，数据更新了，但是，vue组件对象对应的dom中的内部（innerHTML)没有变，因此叫组件更新前。
```javascript
<div id="app">{{msg}}</div>
<script>
let vm = new Vue({
    beforeCreate(){
        console.log('---beforeCreate---')    
    },
    created(){
        console.log(this) 
        console.log('---created---') 
    },
    beforeMount(){
        console.log('---beforeMount---') 
    },
    mounted(){
        console.log('---mounted---') 
        console.log(vm.$el)
    },
    beforeupdate(){
        console.log('---beforeupdate---') 
    },
    data(){
        return{
            msg:'10'
        }
    }
})
vm.$mount('#app')
</script>
```
更新流程<br />当一个响应式属性被更新后，触发了Watcher的回调函数，也就是vm._update(vm._render())，在更新之前，会先调用刚才在before属性上定义的函数，也就是
```javascript
callHook(vm,'beforUpdate')
```
注意，由于Vue的异步更新机制，beforeUpdate的调用已经是在nextTick中了，具体代码如下：
```javascript
nextTick(flushSchedulerQueue)

function flushSchedulerQueue {
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
     // callHook(vm, 'beforeUpdate')
      watcher.before()
    }
 }
}
```

<br />beforeUpdate被调用完成后<br />经历了一系列的patch,diff流程后，组件重新渲染完毕，调用updated钩子。<br />注意，这是是对watcher倒叙updated调用的<br />也就是说，就如同一个属性通过props分别流向父->子->孙这个路径，那么收集到依赖的先后也是这个顺序，但是触发updated钩子却是孙->子->父这个顺序去触发的。
```javascript
function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated')
    }
  }
}
```
beforeUpdate和updated<br />这个过程中，我们会发现，当一个数据发生改变时，你的视图也将随之改变，整个更新的过程是：数据改变--导致虚拟DOM的改变--调用者两个生命钩子去改变视图<br />重点：这个数据只有和模板中的数据绑定了才会发生更新
```javascript
// 没绑定的情况

var vm = new Vue({
  el: '#app',
  template: '<div id="app"></div>',
  beforeUpdate: function() {
    console.log('调用了beforeUpdate')
  },
  updated: function() {
    console.log('调用了uodated')
  },
  data: {
    a: 1
  }
})

vm.a = 2
//这种情况在控制台中是什么都不会输出的。
```
```javascript
var vm = new Vue({
  el: '#app',
  template: '<div id="app">{{a}}</div>',
  beforeUpdate: function() {
    console.log('调用了beforeUpdate')
  },
  updated: function() {
    console.log('调用了uodated')
  },
  data: {
    a: 1
  }
})

vm.a = 2

// 输出结果：
// 调用了beforeUpdate
// 调用了updated
```
updated：<br />虚拟DOM重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作<br />这个钩子函数就不要再去更新数据，可能会发生死循环
```javascript
updated(){
        this.msg= Math.random();
        console.log('---updated---') 
    },
```
更新后会重新渲染，同时再走一边rander方法<br />销毁流程：<br />在刚刚所说的更新后的patch过程中，如果发现有组件在下一轮渲染中消失了，比如v-for对应的数组中少了一个数据，那么就会调用removeVnodes进入组件的销毁流程。<br />removVnodes会调用vnode的destory生命周期，而destory内部则会调用我们相对比较熟悉的vm.$destory()。(keep-alive包裹的自组件除外），这时，就会调用callHook（vm,'beforeDestory')<br />boforeDestory被调用完成<br />之后就会经历一系列的清理逻辑，清除父子关系，watcher关闭等逻辑。但是注意，$destory并不会把组件从视图上移除，如果想要手动销毁一个组件，则需要我们自己去完成这个逻辑。<br />然后，调用最后的callHook(vm,'deatoryed')<br />
<br />beforDestory：<br />实例销毁之前调用，这一步实例仍然完全可用，this仍能获取到实例，这个钩子函数一般做事件的移除，清空定时器，调用实例的destory()方法，可以销毁当前的组件，在销毁前，会触发beforeDestory钩子。<br />destory：<br />常见的销毁方式：手动（vm.$destory()移除所有的观察者），移除组件，路由切换实例销毁后调用，调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器都会被移除，所有的子实例也会被销毁，视图并不会刷新。<br />
<br />
<br />一些细节：<br />$attrs和$listener的一些处理：<br />这里额外提一下$attrs之所以只有第一层被定义为响应式，是因为一般来说深层次的响应式定义已经在父组件中定义做好了，只要保证vm.$sttrs=newAtters这样的操作能触发自组件的响应式更新即可。（在自组件的模板中使用了$atters的情况下）<br />在更新子组件updateChildComponent操作中，会去从收集到的vnode上的attrs和listeners去更新$attrs属性，这样就算子组件的模板上用了$attrs属性也可能触发响应式的更新
```javascript
import { emptyObject } from '../util/index'

vm.$attrs = parentVnode.data.attrs || emptyObject
vm.$listeners = listeners || emptyObject
```
有一个比较细节的操作是这样的：<br />这里的emptyObject永远是同样的引用，也就能保证在没有attrs或者listeners传递的时候，能够永远用同一个引用而不去触发响应式更新。<br />因为defineReactive的set函数中会做这样的判断：
```javascript
set: function reactiveSetter (newVal) {
  const value = getter ? getter.call(obj) : val
  // 这里引用相等 直接返回了
  if (newVal === value || (newVal !== newVal && value !== value)) {
    return
  }
}
```
子组件的初始化<br />上文中提到，子组件的初始化也一样会走_init方法，但是和根Vue实例不同的是，在_init中会有一个分支逻辑。
```javascript
if (options && options._isComponent) {
  // 如果是组件的话 走这个逻辑
  initInternalComponent(vm, options)
} else {
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}
```
根级别Vue实例，也就是new Vue(options)生成是实例，它的$options对象大概是这种格式的，我们定义在new Vue(options)中的options对象直接合并到了$options上
```javascript
beforeCreate: [ƒ]
beforeMount: [ƒ]
components: {test: {…}}
created: [ƒ]
data: ƒ mergedInstanceDataFn()
directives: {}
el: "#app"
filters: {}
methods: {change: ƒ}
mixins: [{…}]
mounted: [ƒ]
name: "App"
render: ƒ anonymous( )
```
而子组件实例上的$options则是这样的：
```javascript
parent: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
propsData: {msg: "hello"}
render: ƒ anonymous( )
staticRenderFns: []
_componentTag: "test"
_parentListeners: undefined
_parentVnode: VNode {tag: "vue-component-1-test", data: {…}, children: undefined, text: undefined, elm: li, …}
_propKeys: ["msg"]
_renderChildren: [VNode]
__proto__: Object
```
那为什么在子组件里通过this.$options也能访问到定义在options里的属性？<br />我们展开_proyp_属性看一下
```javascript
beforeCreate: [ƒ]
beforeMount: [ƒ]
created: [ƒ]
directives: {}
filters: {}
mixins: [{…}]
mounted: [ƒ]
props: {msg: {…}}
_Ctor: {0: ƒ}
_base: ƒ Vue(options)
```
原来是被挂在原型上了，具体是 `initInternalComponent` 中的这段话做的：
```javascript
const opts = vm.$options = Object.create(vm.constructor.options)
```
$vnode和_vnode的区别<br />实例上有两个属性总是让人摸不到头脑，就是$vnode和_vnode<br />举个例子来说，我们写了个这样的组件App:
```javascript
<div class="class-app">
  <test />
</div>
```
test组件
```javascript
<li class="class-test">
  Hi, I'm test
</li>
```
接下来我们都以test组件举例<br />$vnode：<br />在渲染App组件的时候，遇到了test标签，会把test组件包裹成一个vnode
```javascript
<div class="class-app">
  // 渲染到这里 
  <test />
</div>
```
像这样：
```javascript
tag: "vue-component-1-test"
elm: li.class-test
componentInstance: VueComponent {_uid: 1, _isVue: true, $options: {…},
componentOptions: {propsData: {…}, listeners: undefined, tag: "test", children: Array(1), Ctor: ƒ}
context: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
data: {attrs: {…}, on: undefined, hook: {…}, pendingInsert: null}
child: (...)
```
这个tag为vue-component-1-test的vnode,其实可以说是把这个组件给包装了起来，通过 `componentInstance` 属性可以访问到实例 `this`，在test组件（比如说test.vue文件）的视角来看，它应该算是外部的vnode。（父组件在模板中读取到test.vue组件后才生成）<br />它的elm属性指向组件内部的跟元素，也就是li.class-test<br />此时，它在test组件的实例this上保存为this.$vnode

_vnode<br />在test组件实例上，通过this._vnode访问到的vnode形如这样：
```javascript
tag: "li"
elm: li.class-test
children: (2) [VNode, VNode]
context: VueComponent {_uid: 1, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
data: {staticClass: "class-test"}
parent: VNode {tag: "vue-component-1-test", data: {…}, children: undefined, text: undefined, elm: li.test, …}
```
可以看到，它的tag是li,也就是test组件的template上声明的最外层的节点。<br />它的elm属性也指向组件内部的根组件，也就是li.class-test。<br />它其实就是test组件的render函数返回的vnode,<br />在_update方法中也找到了来源
```javascript
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  vm._vnode = vnode
} 
```
回忆一下组件是怎么初始化挂载个更新的（vm._update(vm._render())）<br />所谓的diff算法，diff的其实就是this上保存的_vnode，和新调用_render去生成的vnode进行patch。<br />而根Vue实例，也就是new Vue()的那层实例，this.$vnode就是null,因为并没有外层组件去渲染它。

总结关系<br />$vnode外层组件渲染到当前组件标签时，生成vnode实例。<br />_vnode是组件内部调用render函数返回的vnode实例。<br />_vnode.parents===$vnode<br />他们的elm,也就是实际dom元素，都指向组件内部的根元素。

this.$children和_vnode.children<br />$children只保存当前实例的直接子组件实例，所以你访问不到butto,li这些原生html标签。注意是实例而不是vnode,也就是通过this访问到的那玩意。<br />_vnode.children,则会把当前组件的vnode树全部保存起来，不管是组件vnode还是原声的html标签生成的vnode,并且原生html生成的vnode内部还可以通过children进一步访问子vnode

