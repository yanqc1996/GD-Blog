# 数组去重探究

### 数组去重方法：
#### 1.双层for循环：
双重 for 循环是比较笨拙的方法，它实现的原理很简单：先定义一个包含原始数组第一个元素的数组，然后遍历原始数组，将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，最后返回新数组；因为它的时间复杂度是`O(n^2)`，如果数组长度很大，`效率会很低`。
时间复杂度：以上述数组距离，数组中单个数据遍历执行的时间为n，则上述方法存在两层遍历，时间复杂度为`n^2`
```javascript
function distinct(arr) {
    for (let i=0, len=arr.length; i<len; i++) {
        for (let j=i+1; j<len; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一
                // len和j减去之后，重复进行判断
                len--;
                j--;
            }
        }
    }
    return arr;
}
```

#### 2.Array.filter() 加 indexOf：
利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素
```javascript
function distinct(a, b) {
    let arr = a.concat(b);
    //concat：用于连接两个数组
    return arr.filter((item, index)=> {
      //1.filter不会对空数组进行检测
      //2.filter不会对元素组进行修改
      //3.function(currentValue, index,arr),三个返回值为当前值，当前位置和当前所属的数组
        return arr.indexOf(item) === index
      //indexOf检测元素在数组中第一次出现的位置，如果元素不存在则返回-1
    })
}
```

#### 3.Array.sort() 加一行遍历冒泡(相邻元素去重)：
调用了数组的排序方法 `sort()`，V8引擎 的 sort() 方法在数组长度小于等于10的情况下，会使用插入排序，大于10的情况下会使用快速排序。然后根据排序后的结果进行遍历及相邻元素比对(其实就是一行冒泡排序比较)，如果相等则跳过该元素，直到遍历结束。
```javascript
function distinct(array) {
    let res = [];
    let sortedArray = array.concat().sort();
    let seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    return res;
}
```
#### 4.ES6 中的 Set 去重：
ES6 提供了新的数据结构 Set，Set 结构的一个特性就是成员值都是唯一的，没有重复的值。（怎么实现？Set的实现原理？）
```javascript
function distinct(array) {
   return Array.from(new Set(array));
}
简化：
function unique(array) {
    return [...new Set(array)];
}
简化：
let unique = (a) => [...new Set(a)]
```
#### 5.Object 键值对：
这种方法是利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 `Object[value1] = true`，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的,但是最后请注意这里`obj[typeof item + item] = true`没有直接使用`obj[item]`,是因为
因为 123 和 '123' 是不同的，直接使用前面的方法会判断为同一个值，因为`对象的键值只能是字符串`，所以我们可以使用 `typeof item + item` 拼成字符串作为 key 值来避免这个问题。
```javascript
function distinct(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] =  true)
    })
}
```
### 根据不同是使用场景区分：
#### 1.速度考虑：计算数组去重的耗时

```javascript
// distinct.js

let arr1 = Array.from(new Array(100000), (x, index)=>{
    return index
})

let arr2 = Array.from(new Array(50000), (x, index)=>{
    return index+index
})

let start = new Date().getTime()
console.log('开始数组去重')

let arr = a.concat(b);

function distinct(arr) {
    // 数组去重
}

console.log('去重后的长度', distinct(arr).length)

let end = new Date().getTime()
console.log('耗时', end - start)

```
上面的多种数组去后，计算耗费时间：
双重 for 循环 > Array.filter()加 indexOf > Array.sort() 加一行遍历冒泡 > ES6中的Set去重 > Object 键值对去重复
#### 2.兼容性与场景考虑(数组中是否包含对象，NaN等？)
先说一下 == 和 === 区别
`===` 严格相等，会比较两个值的类型和值 `==` 抽象相等，比较时，会先进行类型转换，然后再比较值 想更详细了解转换过程的可以看[js 中 == 和 === 的区别](https://coolcao.com/2016/08/06/js%E4%B8%AD-%E5%92%8C-%E7%9A%84%E5%8C%BA%E5%88%AB/)

```javascript
let str1 = '123';
let str2 = new String('123');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false
```
几种去重函数针对带有特殊类型的对比
**indexOf 与 Set 的一点说明**：
上面代码中`console.log(NaN === NaN); // false`, indexOf 底层使用的是 === 进行判断，所以使用 indexOf 查找不到 NaN 元素

```javascript
// demo1
var arr = [1, 2, NaN];
arr.indexOf(NaN); // -1
```
Set可以去重NaN类型， Set内部认为尽管 NaN === NaN 为 false，但是这两个元素是重复的。
```javascript
// demo2
function distinct(array) {
   return Array.from(new Set(array));
}
console.log(distinct([NaN, NaN])) // [NaN]
```
具体去重比较
将这样一个数组按照上面的方法去重后的比较：

```javascript
var array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
```

| 方法 | 结果 | 说明 |
| --- | ---: | :---: |
| 双层 for 循环 | [1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN] | 对象和 NaN 不去重 |
| Array.sort()加一行遍历冒泡 | [/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined] | 对象和 NaN 不去重 数字 1 也不去重 |
| Array.filter()加 indexOf | [1, "1", null, undefined, String, String, /a/, /a/] | 对象不去重 NaN 会被忽略掉 |
| Object 键值对去重 | [1, "1", null, undefined, String, /a/, NaN] | **全部去重** |
| ES6中的Set去重 | [1, "1", null, undefined, String, String, /a/, /a/, NaN] | **对象不去重 NaN 去重** |

#### 3.内存考虑(去重复过程中，是想要空间复杂度最低吗？)
对于 V8 引擎，内存考虑已经显得不那么重要了，而且真的数据量很大的时候，一般去重在后台处理了。
以上的所有数组去重方式，应该 Object 对象去重复的方式是时间复杂度是最低的，除了一次遍历时间复杂度为`O(n)` 后，查找到重复数据的时间复杂度是`O(1)`，类似散列表。
但是对象去重复的空间复杂度是最高的，因为开辟了一个对象，其他的几种方式都没有开辟新的空间，从外表看来，更深入的源码有待探究，这里只是要说明大家在回答的时候也可以考虑到`时间复杂度`还有`空间复杂度`。
另外补充一个**误区**，有的小伙伴会认为 `Array.filter()`加 `indexOf` 这种方式时间复杂度为 `O(n)` ,其实不是这样，我觉得也是`O(n^2)`。因为 `indexOf` 函数，源码其实它也是进行 for 循环遍历的。具体实现如下

```javascript
String.prototype.indexOf = function(s) {
    for (var i = 0; i < this.length - s.length; i++) {
        if (this.charAt(i) === s.charAt(0) &&
            this.substring(i, s.length) === s) {
            return i;
        }
    }
    return -1;
};
```

