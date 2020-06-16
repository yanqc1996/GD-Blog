# Object/Function-原型与原型链拓展

![image.png](https://user-gold-cdn.xitu.io/2020/6/16/172bc33e18ef5a4c?w=1508&h=910&f=png&s=295568)
<a name="SRbNP"></a>
# 写在前面：
我们先来回顾下上次关于原型这块留下的一些问题：<br />1.为什么Function，Object，构造函数Test的原型都是`Function.prototype`?<br />2.为什么`Function.__proto__`===`Function.prototype`?<br />3.为什么`Function.prototype`是一个函数，但是打印`Function.prototype.prototype`却是undefined？<br />本来想仔细去剖析一下原理，解释一下这是为啥，然后看到了[https://zhuanlan.zhihu.com/p/22989691](https://zhuanlan.zhihu.com/p/22989691)，感觉作者非常形象的解释一些可能比较难理解的问题，因此有些东西就不在这里做赘述了，小伙伴们可以去赞下这篇文章哈。
<a name="HEcww"></a>
# 1.Object/Function
我们根据以上流程图，可以总结出Object和Function之间的一些关系：
```javascript
Function.prototype===Object.__proto__
Function.prototype===Function.__proto__
Function.prototype.__proto__===Object.prototye
```
同时，我们将这四块的思维导图单独拿出来整理下：<br />![image.png](https://user-gold-cdn.xitu.io/2020/6/16/172bc33e1a7faf1c?w=1058&h=652&f=png&s=162067)<br />一眼望去，以上思维导图确实混乱，尤其是流程流转的过程中，会给人一种循环混乱，不知道源头在哪的情况，因此我们先把其他的内容隐藏掉，只关注原型链：<br />![image.png](https://user-gold-cdn.xitu.io/2020/6/16/172bc33e1b8f775c?w=1064&h=694&f=png&s=123373)<br />这样是不是就清晰很多了，我们将图改为一种更加容易理解的结构：<br />![image.png](https://user-gold-cdn.xitu.io/2020/6/16/172bc33e1c7a74d7?w=778&h=646&f=png&s=96413)<br />这个流程图契合了我们之前对于原型链描述：原型链的尽头就是`Object.prototype`**(不考虑null的情况），所有对象都从**`Object.prototype`**继承**`toString()`**,**`valueOf()`**等公共属性。**

根据上述流程整理，我们可以得出以下结论来判断初始化的顺序：先有`Object.prototype`（原型链顶端），`Function.prototype`继承`Object.prototype`而产生，同时，一切对象都继承自`Object.prototype`，而一切函数对象都继承自`Function.prototype`(且`Function.prototype`会最终继承自`Object.prototype`)，也就是说普通对象和函数对象的区别是：普通对象直接继承了`Object.prototype`，而函数对象在中间还继承了`Function.prototype`，<br />具体的创建流程还是可以参照：[https://zhuanlan.zhihu.com/p/22989691](https://zhuanlan.zhihu.com/p/22989691)
<a name="CKgdp"></a>
# 2.原型链拓展
<a name="JXDDd"></a>
## 1.instanceof
涉及到原型，经常会需要解释以下这个问题：
```javascript
Function instanceof Object;//true
Object instanceof Function;//true
```
要理解这种情况的原因，我们首先需要理解`instanceof`运算符判断的是什么：
```javascript
//假设instanceof运算符左边是L，右边是R
L instanceof R //instanceof运算时，通过判断L的原型链上是否存在R.prototype
L.__proto__.__proto__ ..... === R.prototype ？ //如果存在返回true 否则返回false
```
总结一下：`instanceof`**会递归查找运算符左边数据的原型链上，是否存在右侧的**`prototype`**原型**<br />我们根据思维导图可以进行判断：<br />`Function.__proto__.__proto__===Object.prototype`<br />`Object.__proto__==Function.prototype`<br />因此以上两个式子成立。<br />
<br />PS：既然说到了`instanceof`，那就顺便来回顾下`typeof`：<br />`typeof`原理： **不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息**

- 000: 对象
- 010: 浮点数
- 100：字符串
- 110： 布尔
- 1： 整数

由此我们可以解释，`typeof null `为什么是"object"：不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行`typeof`时会返回"object"
<a name="SHYeV"></a>
## 2.基本类型数据问题
基于以上`typeof`和`instanceof`的区别，我们又提出了一个问题：<br />基本数据类型有原型吗？思考一下，我们在工作中是都经常用到一些基本类型的方法，比如.length之类，那这些方法是从哪里继承的呢？<br />先在控制台打印以下的命令：
```javascript
console.log('hello'.__proto__)
console.log(1..__proto__)//两个小数点是因为数值后面调用方法，js会将点运算符解析为数值的小数点
```
![image.png](https://user-gold-cdn.xitu.io/2020/6/16/172bc33e1d6a7833?w=1054&h=250&f=png&s=46580)

再进行以下输出：
```javascript
let str='hello'
let num=1
console.log(str instanceof String) //fasle
console.log(num instanceof Number) //false
```
我们发现，如果根据`instanceof`之前的定义，`String.prototype`不在str的原型链上，那为什么输出基本类型的`__proto__`又会有指向呢？<br />这里就需要引入包装类型的概念了：为了便于操作基本类型值，`ECMAScript`**还提供了3个特殊的引用类型：**`Boolean`**,**`Number`**和**`String`**。这些类型与其他引用类型相似，但同时也具有各自的基本类型相应的特殊行为。**<br />**引用类型和包装类型的主要区别就是对象的生存期，使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中，而包装类型则只存在于一行代码的执行瞬间，然后立即被销毁，这意味着我们不能在运行时为基本类型添加属性和方法。**
```javascript
let str='hello'
str.say='world'
console.log(str.say)//undefined
```
同时，我们还需要引出装箱和拆箱的概念：

- **装箱：把基本类型转换为对应的包装类型**<br />
- **拆箱：把引用类型转换为基本类型**

结合以上概念，我们就可以解释上述问题了：每当我们操作一个基础类型的时候，JS就会自动创建一个包装类型的对象，从而让我们能够调用一些方法和属性。我们在创建基本类型并调用方法的时候，其实发生了以下几个步骤：1.创建一个包装类型实例  2.在实例上调用方法  3.销毁实例<br />也就是说，我们使用基本类型调用方法，就会自动进行装箱和拆箱操作<br />因此，我们调用基本类型的__proto__方法时，就会将基本类型自动转换成包装类型，因此会有原型指向，而我们使用instanceof方法时，不使用基本类型调用方法，判断的就是基本类型，因此为false。<br />
<br />以上，我们完善了部分原型和原型链的概念扩展。同时，从中发现对于JS基础的数据类型这一块还存在还有一些盲点，那么下一篇我们就针对js基本的数据类型进行一些深入研究。<br />

<a name="NCfDU"></a>
# 写在最后：
**文章中很多个人的理解可能比较浅显，如果文章中有哪些概念有偏差或者错误的麻烦大家不吝指正哈！一起学习一起进步**
