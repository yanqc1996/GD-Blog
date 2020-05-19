# React概括

<a name="Mc1GP"></a>
## 1.什么是JSX?
一个JSX语法的实力，如下所示<br />`const element = <h1>Hello, world!</h1>;`<br />这种语法形式，既不是HTML，也不是字符串，成为JSX，是React里用来描述UI和样式的语法，JSX最终会被编译成合法的JS语句调用（编辑器在遇到{时采用JS语法进行解析，遇到<就采用HTML规则进行解析）
<a name="E9u4O"></a>
## 2.嵌入表达式
JSX中，可以使用花括号{}嵌入任意的JS合法表达式，示例如下：
```javascript
const user = {
    firstName: 'Zhang',
    lastName : 'Busong'
};

const elem = (
    <h1>Hello, {formatName(user)}</h1>
);
/*
这里的()，实际上是可选的，但是React推荐加入()，这样子就会被视为一个表达式，而不会导致
自动插入分号的问题
*/

ReactDOM.render(
    element,
    document.getElementById('app')
)
```
<a name="ocwFq"></a>
## 3.JSX也是一种表达式
JSX本身也是一种表达式，所以它可以像其他表达式一样，用于给一个变量赋值，作为函数实参，作为函数返回值等，如：
```javascript
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}</h1>
    }
    return <h1>Hello, Guest!</h1>;
}
```
注意：1.在JSX中生命属性时不要使用引号，如果声明属性的时候使用引号，那么将被作为字符串解析，而不会被作为一个表达式解析，如：<br />`div firstName="{user.firstName}" lastName={user.lastName}></div>`<br />解析后，可以得到：<br />`<div firstName="{user.firstName}" lastName="Lau"></div>`<br />因此，当我们需要使用一个字符串字面量的时候，可以使用引号，但是如果要作为表达式解析的时候，则不应该使用引号<br />2.在JSX中，有些属性名称需要进行特殊处理，如class应该用className代替，tabindex则用tabIndex代替。这是因为JSX本质上更接近与JS，而class是JS中的保留字。同时，应该使用camelCase来命名一个属性，而不是使用HTML的属性命名方式。<br />3.JSX本身已经做了防注入处理，对于那些不是明确编写的HTML代码，是不会被解析为HTML DOM的，ReactDOM会将他们一律视为字符串，在渲染完成前就转换为字符串，所以可以方式XSS攻击。<br />4.如果JSX标签是闭合的，那么结尾需要用/>，另外，JSX标签是可以互相嵌套的，这和HTML里是一样的。
<a name="ntWne"></a>
## 4.JSX实质
JSX通过babel编译，而babel实际上把JSX编译给React.createElement()调用，如下JSX代码：
```javascript
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);
```
是等同于以下的语句的：
```javascript
const elem = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
```
`React.createElement()`方法会首先进行一些避免BUG的检查，然后返回类似以下例子的对象：
```javascript
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world'
    }
}
```
这样的对象，则称为`React元素`，代表所有呈现在屏幕上的东西。React正是通过读取这些对象来构建DOM，并且保持数据和UI同步的
<a name="tn62G"></a>
## 5.元素渲染
元素(elements)是构成React应用的最小单元，元素描述了想要在屏幕中看到的内容，如：
```javascript
const element = <h1>Hello, world</h1>;
```
和DOM元素不同的是，React元素是纯对象，创建的代价低。并且React会进行优化处理，只把有必要的变化更新到DOM上。此外，元素和组件的概念，是不一样的，组件是有元素组成的。
<a name="R8WaZ"></a>
## 6.将元素渲染进DOM

<br />在React中，使用ReactDOM.render()方法来将React元素渲染进一个DOM中，如：
```javascript
ReactDOM.render(
    element,
    document.getElementById('root')
)
```
React元素是不可变的，所以一旦一个元素创建完成后，我们是无法改变其内容或者属性的。一个元素就像是动画里的一帧，它代表UI在某一时间点的样子。如果非要使用元素来构成可变化的UI界面，就需要使用setInterval了
```javascript
function tick() {
    const element = (
        <div>Now is {new Date().toLocaleTimeString()}</div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}
setInterval(tick, 1000);
```
在实际开发中，大多数React应用只会调用一次ReactDom.render()，所以更好的方式是使用有状态组件
<a name="7hJJx"></a>
## 7.组件和Props
组件{components}能够将UI划分为独立的，可复用的部分，这样我们就只需专注于构建每一个单独的部件。从概念上看，组件就像是函数：接受任意的输入（成为属性，Props），返回React元素。React中有两种定义组件的方式：函数定义和类定义
<a name="cu7bS"></a>
### 1.函数定义组件
这种方式是最简单的定义组件的方式，就像写一个JS函数一样，如：
```javascript
function Welcome (props) {
    return <h1>Hello, {props.name}</h1>;;
}
```
<a name="nbjTa"></a>
### 2.类定义组件
还可以使用ES6里的类来定义一个组件，如下所示：
```javascript
class Welcome extends React.Component {
    render () {
        return <h1>Hello, {this.props.name}<h1>;
    }
}
```
这种方式比起函数定义方式更加灵活
<a name="ZDPgL"></a>
### 3.组件渲染
先前，我们遇到的React元素只是呈现一个DOM标签，如：
```javascript
const element = <div />
```
然而，React元素也可以是用户自定义的`组件`，如：
```javascript
const element = <Welcome name="Tom" />
```
Welcome组件中声明了一个属性`name="Tom"`，而这个属性，将以`props.name`的方式传递给组件，如下方式：
```javascript
function Welcome (props) {
    return <h1>Hello, {props.name}</h1>;
}
```
此时，对于以下的代码：
```javascript
ReactDOM.render(
    <Welcome name="大毛" />,
    document.getElementById('root')
)
```
最终就会以`<h1>Hello, 大毛</h1>`的方式呈现。在这个过程中，发生了如下的事情：

- 对`<Welcome name="大毛" />`元素调用了`ReactDOM.render()方法`
- React将`{ name: '大毛' }`作为props实参来调用Welcome组件
- Welcome完成渲染，返回`<h1>Hello, 大毛</h1>`元素
- ReactDOM计算最小更新代价，然后更新DOM
<a name="yWJ17"></a>
### 4.组件组合
组件是可以组合的。即组件内部可以引起其他组件，如：
```javascript
function Welcome (props) {
    return <h1>Hello, {props.name}</h1>;
}

function App () {
    return (
        <div>
            <Welcome name="Tom" />
            <Welcome name="Jack" />
            <Welcome name="Mike" />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
```
注意：在React中，组件必须返回单一的跟元素，这也是为什么App组件中需要用<div>标签包裹的原因。如以下的方式，是错误的（有三个根元素）
```javascript
function App () {
    return (
        <Welcome name="Tom" />
        <Welcome name="Jack" />
        <Welcome name="Mike" />
    )
}
```
<a name="OX7BC"></a>
### 5.属性是只读的
考虑以下这种情况：
```javascript
function sum (a, b) {
    return a + b;
}
```
这种函数成为纯函数：它不改变自己的输入值，且总是对相同的输入返回相同的结果。与之对立的，是非纯函数，如：
```javascript
function withdraw (account, amount) {
    account.total -= amount;
}
```
非纯函数在函数内改变了输入的参数。在React中，无论是通过function还是classs生命自建，我们都不应该修改它自身的属性（props)。虽然React相当灵活，但是它也有一个严格的规定：所有的React组件都必须像纯函数那样来使用他们的props
<a name="BIDil"></a>
## 8.State与生命周期
使用类定义组件有一些额外的好处，如拥有本地状态这一特性。以下是一个类定义组件
```javascript
class Clock extends React.Component {
    render () {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>Now is {this.props.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}
```
需要注意的有：<br />1.类名即为组件名（无论是函数定义组件还是类定义组件，组件名称的首字母都必须大写，并且继承自React.Component)<br />2.使用render()方法，用来返回需要呈现的内容
<a name="o6Q37"></a>
### 1.在类中加入state
state是属于一个组件自身的。我们可以在类的构造函数constructor中来初始化状态，如：
```javascript
constructor (props) {
    super(props)
    this.state = {
        date: new Date()
    }
}
```
如此一来，我们就可以在render()函数中使用this.state.xxx来引用一个状态。
<a name="t40uM"></a>
### 2.生命周期
一个项目会由许许多多的组件构成。在组件销毁后，回收和释放他们所占据的资源非常重要。在时钟应用例子里，我们需要在第一次渲染到DOM的时候设置一个定时器，并且需要在相应的DOM销毁后，清除这个定时器。那么，这种情况下，React为我们提供了生命周期的钩子函数，方便我们进行使用。在React中，生命周期分为：<br />1.Mount：已插入真实的DOM<br />2.Update:正在重新渲染<br />3.Unmount:已移出真实DOM<br />而相应的，生命周期钩子函数有：

- `componentWillMount`
- `componentDidMount`
- `componentWillUpdate(newProps, nextState)`
- `componentDidUpdate(prevProps, prevState)`
- `componentWillUnmount()`

此外，还有两种特殊状态的处理函数：

- `componentWillReceiveProps(nextProps)` 已加载的组件收到新的参数时调动
- `shouldComponentUpdate(nextProps, nextState)` 组件判断是否重新渲染时调用

因此，基于生命周期钩子函数，我们可以实现一个时钟应用如下：
```javascript
class Clock extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }//初始化状态
    tick () {
        this.setState({
            date: new Date()
        });
    }
    componentDidMount () {
        this.timerId = setInterval(() => {
            this.tick()
        }, 1000);
    }//DOM挂载后启用定时器
    componentWillUnmount () {
        clearInterval(this.timerId);
    }//组件将要销毁时清除定时器
    render () {
        return (
            <div>Now is {this.state.date.toLocaleTimeString()}</div>
        );
    }
}
```
需要注意的是：<br />1.render()里用不到的state，不应该声明在state里<br />2.不能直接使用this.state.xxx=xxx的方式来改变一个state的值，应该使用this.setState()。如：
```javascript
setName () {
    this.setState({
        name: '大毛'
    })
}
```
`this.setState()`会自动覆盖`this.state`里相应的属性，并触发`render()`重新渲染。<br />3.**状态更新可能是异步的** React可以将多个`setState()`调用合并成一个调用来提升性能。且由于`this.props`和`this.state`可能是异步更新的，所以不应该依靠它们的值来计算下一个状态。这种情况下，可以给`setState`传入一个函数，如：
```javascript
this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
}));
```
<a name="9IMBF"></a>
### 9.事件处理
React元素的事件与DOM元素类似，不过也有一些区别：<br />1.React事件使用camelCase命名（onClick），而不是全小写的形式（onclock）<br />2.使用JSX，传入的是事件的句柄，而不是一个字符串，如以下的HTML：
```javascript
<button onclick="increment()">ADD</button>
```
使用React的方式描述如：
```javascript
<button onClick={increment}>ADD</button>
```
3.在原声DOM中，我们可以通过返回fals来阻止默认行为，但是这在React中是行不通的，在React中需要明确使用preventDefault()来阻止默认行为。如：
```javascript
function ActionLink () {
    function handleClick (e) {
        e.preventDefault();
        alert('Hello, world!');
    }

    return (
        <a href="#" onClick={handleClick}>Click Me</a>
    );
}
```
这里，事件回调函数里的`event`是经过React特殊处理过的（遵循W3C标准），所以我们可以放心地使用它，而不用担心跨浏览器的兼容性问题。
**注意：** 在使用事件回调函数的时候，我们需要特别注意`this`的指向问题，因为在React里，**除了构造函数和生命周期钩子函数里会自动绑定this为当前组件外，其他的都不会自动绑定`this`的指向为当前组件**，因此需要我们自己注意好this的绑定问题，
通常而言，在一个类方式声明的组件里使用事件回调，我们需**要在组件的`constructor`里绑定回调方法的this指向**，如：
```javascript
class Counter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            counter: 0
        }
        // 在这里绑定指向
        this.increment = this.increment.bind(this);
    }
    increment () {
        this.setState({
            counter: this.state.counter + 1
        });
    }
    render () {
        return (
            <div>
                The counter now is: {this.state.counter}
                <button onClick={this.increment}>+1</button>
            </div>
        );
    }
}
```
当然，我们还有另外一种方法来使用箭头函数绑定指向，就是使用实验性的属性初始化语法，如：
```javascript
class Counter extends React.Component {
    increment: () => {
        this.setState({
            counter: this.state.counter + 1
        });
    }
    // ...
}
```
4.像事件处理程序传递参数，我们可以为事件处理程序传递额外的参数，方式有以下两种：
```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
需要注意的是，使用箭头函数的情况下，参数e要显示传递，而使用bind的情况下，则无需显示传递（参数e会作为最后一个参数传递给事件处理程序）
<a name="VKxio"></a>
## 10.条件渲染
在React里，我们可以创建不同的组件来封装我们需要的功能。我们也可以根据组件的状态，只渲染组件中的一部分内容，而条件渲染就是为此而准备的。在React中，我们可以像在JS中写条件语句一样地写条件渲染语句，如：<br /> 
```javascript
function Greet(props) {
    const isLogined = props.isLogined;
    if (isLogined) {
        return <div>Hello !</div>;
    }
    return <div>Please sign in</div>;
}

ReactDOM.render(
    <Greet isLogined={true} />,
    document.getElementById('root')
);
```
<a name="IArJJ"></a>
### 1.使用变量来存储元素
```javascript
function LogBtn(props) {
    var button;
    const isLogined = props.isLogined;
    if (isLogined) {
        button = <button>退出</button>
    } else {
        button = <button>登陆</button>
    }
    return <div>You can {button}</div>;
}

ReactDOM.render(
    <LogBtn isLogined={false} />,
    document.getElementById('root')
);
```
<a name="9HMVz"></a>
### 2.使用&&运算符进行渲染
由于JaveScript语法对待&&运算符的性质，我们也可以使用&&运算符来完成条件渲染，如：
```javascript
function LogBtn(props) {
    var button;
    const isLogined = props.isLogined;
    return (
        <div>Hello
        {!isLogined && (
            <button>请登陆</button>
        )}
        </div>
    )
}
```
当props.isLogined为false的时候，就会渲染出：
```javascript
<div>Hello <button>请登录</button></div>
```
<a name="IiPDs"></a>
### 3.使用三元运算符进行渲染
```javascript
function LogBtn (props) {
    const isLogined = props.isLogined;
    return (
        <div>You can 
            <button>{isLogined ? '退出' : '登陆'}</button>
        </div>
    )
}
```
<a name="J52bc"></a>
### 4.阻止整个组件的渲染
有时候，我们希望是整个组件都不渲染，而不仅仅是局部不渲染，那么在这种情况下，我们就可以在render()函数里返回一个null，来实现我们想要的效果，如：
```javascript
function LogBtn (props) {
    const isLogined = props.isLogined;
    const isShow = props.isShow;
    if (isShow) {
        return (
            <div>You can 
                <button>{isLogined ? '退出' : '登陆'}</button>
            </div>
        )
    }
    return null;
}
```
注意：组件里返回null不会影响组件生命周期的出发，如`componentWillUpdate`和`componentDidUpdate`仍然会被调用
<a name="aCmWB"></a>
### 11.列表渲染与keys
在JS中，我们可以使用map()函数来对一个数组列表进行操作，如：
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number*2);
console.log(doubled); // 得到[2, 4, 6, 8, 10]
```
同样，在React里，我们也可以使用map()来进行列表渲染，如：
```javascript
function NumberList (props) {
    const numbers = props.numbers;
    const listItems = numbers.map(number => {
        return (
            <li>{number}</li>
        )
    });

    return <ul>{listItems}</ul>
}
```
这将得到：
```javascript
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
```
当我们运行以上的代码的时候，会发现控制台提示：`Each child in an array or iterator should have a unique "key" prop`，因此，我们需要为列表项的每一个项分配一个`key`，来解决这个问题，通常而言，我们可以使用以下几种方式来提供`key`：<br />1.使用数据项自身的ID<br />2.使用索引下标index
```javascript
const listItems = numbers.map((number, index) => {
    <li key={index}>{number}</li>
});
```
但是React不推荐在需要重新排序的列表里使用索引下标，因为会导致变得很慢。<br />注意：只有在一个项的同胞里区分彼此的时候，才需要使用到key,key不需要全局唯一，只需要在一个数组内部区分彼此时唯一便可。key的作用是给React一个提示，而不会传递给组件。如果我们在组件内需要同样的一个值，可以换个名字传递，如：
```javascript
const content = posts.map(post => (
    <Post key={post.id} id={post.id} title={post.title} />
));
```
<a name="g11E6"></a>
## 12.表单
表单和其他的React中的DOM元素有所不同，因为表单元素生来就是为了保存一些内部状态。在React中，表单和HTML中的表单略有不同。
<a name="Q8hXG"></a>
### 1.受控组件
HTML中，`<input>`、`<textarea>`、`<select>`这类表单元素会维持自身状态，并根据用户输入进行更新。不过React中，可变的状态通常保存在组件的`this.state`中，且只能用`setState()`方法进行更新，如：
```javascript
class NameForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (event) {
        this.setState({
            value: event.target.value
        });
    }
    handleSubmit (event) {
        alert('Your name is '+this.state.value);
        event.preventDefault();
    } 
    render () {
        return (
            <form onSubmit={this.handleSubmit}>
            Name: <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
            </form>
        )
    }
}
```
和HTML中不同的是，React中的`textarea`并不需要写成`<textarea></textarea>`的形式，而是写成`<textarea value="" ... />`的形式便可。而对于HTML中的`select`标签，通常做法是
```javascript
<select>
    <option value="A">A</option>
    <option value="B" selected>B</option>
    <option value="C">C</option>
</select>
```
但是React中，不需要在需要选中的`option`处加入`selected`，而只需要传入一个value，就会自动根据value来选中相应的选项，如：
```javascript
<select value="C">
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
</select>
```
<a name="yltHn"></a>
### 2.多个输入的解决办法
通常一个表单都有多个输入，如果我们每一个输入添加处理事件，那么将会非常繁琐。好的一个解决方法是，使用name,然后根据event.target.name来选择做什么。如：
```javascript
class Form extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            gender: '男',
            attend: false,
            profile: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange (event) {
        const target = event.target;
        const value = target.type==='checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit (event) {
        this.setState({
            profile: `姓名：${this.state.name}，${this.state.gender}，${this.state.attend ? '参加' : '不参加'}活动`
        });
        event.preventDefault();
    } 
    render () {
        return (
            <form>
            <p>姓名：<input name="name" value={this.state.name} onChange={this.handleInputChange} /></p>
            <p>性别：
                <select name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </p>
            <p>是否参加：<input name="attend" type="checkbox" onChange={this.handleInputChange} checked={this.state.attend} /></p>
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
            <p>您的报名信息：{this.state.profile}</p>
            </form>
        )
    }
}
```
<a name="4fxXW"></a>
### 3.非受控组件
大多数情况下，使用`受控组件`实现表单是首选，在受控组件中，表单数据是交由React组件处理的。如果想要让表单数据由DOM处理（即数据不保存在React的状态里，而是保存在DOM中），那么可以使用`非受控组件`，使用`非受控组件`，可以无需为每个状态更新编写事件处理程序，使用`ref`即可实现，如：
```javascript
class NameForm extends React.Component {
    constrcutor(props) {
        super(props)
    }
    handleSubmit(event) {
        console.log('A name was submitted: ', this.input.value)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Name: <input type="text" ref={input => this.input = input} />
                </label>
                <input type="submit" value="submit" />
            </form>
        )
    }
}
```
对于`非受控组件`，如果要指定默认值，那么可以使用`defaultValue`，如：
```javascript
<input type="text" defaultValue="Hello" ref={input => this.input = input} />
```
相应的，`type="checkbox"`和`type="radio"`，则使用`defaultChecked`
<a name="Vmp3p"></a>
## 13.状态提升
我们希望在RMB的输入表单上输入的时候，USD的输入表单上的数值也同步更新，这种情况下，如果RMB组件自己管理自己的状态，是很难实现的，因此，我们需要让这个状态提升自父组件进行管理。如下：
```javascript
class CurrencyInput extends React.Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange (event) {
        this.props.onInputChange(event.target.value)
    }
    render () {
        const value = this.props.value
        const type = this.props.type
        return (
            <p>{type}: <input type="text" value={value} onChange={this.handleChange} /></p>
        );
    }
}
```
最后定义一个共同的父组件，如下：
```javascript
class CurrencyConvert extends Component {
    constructor (props) {
        super(props);
        this.state = {
            type: 'RMB',
            amount: 0
        }
        this.handleRMBChange = this.handleRMBChange.bind(this);
        this.handleUSDChange = this.handleUSDChange.bind(this);
    }
    handleRMBChange (amount) {
        this.setState({
            type: 'RMB',
            amount
        });
    }
    handleUSDChange (amount) {
        this.setState({
            type: 'USD',
            amount
        });
    }
    render () {
        const type = this.state.type;
        const amount = this.state.amount;
        const RMB = type==='RMB' ? amount : convert(amount, USB2RMB);
        const USD = type==='USD' ? amount : convert(amount, RMB2USB);
        return (
            <div>
                <p>Please Input:</p>
                <CurrencyInput type="RMB" value={RMB} onInputChange={this.handleRMBChange} />
                <CurrencyInput type="USD" value={USD} onInputChange={this.handleUSDChange} />
            </div>
        );
    }
}

```
<a name="v6guC"></a>
## 14.组合vs继承
React推崇更多的是使用组合，而非使用继承。对于一些使用场景，React给出的建议如下：
<a name="RjzFq"></a>
### 1.包含关系
当父组件不知道子组件可能的内容是什么的时候，可以使用props.children,如：
```javascript
function Article (props) {
    return (
        <section>
            <aside>侧边栏</aside>
            <article>{props.children}</article>
        </section>
    );
}

function App () {
    return (
        <Article>这是一篇文章</Article>
    );
}
```
这将渲染得到：
```javascript
<section>
    <aside>侧边栏</aside>
    <article>这是一篇文章</article>
</section>
```
我们还可以自定义名称，因为JSX实际上会被转换为合法的JS表达式，所以，还可以有：
```javascript
function Article (props) {
    return (
        <section>
            <aside>{props.aside}</aside>
            <article>{props.children}</article>
        </section>
    );
}

function App () {
    return (
        <Article aside={
            <h1>这是一个侧栏</h1>
        }>这是一篇文章</Article>
    );
}
```
这将渲染得到：
```javascript
<section>
    <aside><h1>这是一个侧栏</h1></aside>
    <article>这是一篇文章</article>
</section>
```
<a name="jPJsk"></a>
### 2.何时使用继承？
在Facebook的网站上，使用了数以千计的组件，但是实践证明还没有发现需要使用继承才能解决的情况。
属性和组合为我们提供了清晰的、安全的方式来自定义组件的样式和行为，组件可以接受任意元素，包括：基本数据类型、React元素、函数。
如果要在组件之间复用UI无关的功能，那么应该将其提取到单独的JavaScript模块中，这样子可以在不对组件进行扩展的前提下导入并使用函数、对象、类<br />

