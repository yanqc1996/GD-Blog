# Svg学习

以下列表涵盖了我们将用到的构建块。

- `<svg>` 包裹并定义整个矢量图。`<svg>` 标签之于矢量图就如同 `<html>` 标签之于一个 web 页面。
- `<line>` 创建一条直线。
- `<polyline>` 创建折线。
- `<rect>` 创建矩形。
- `<ellipse>` 创建圆和椭圆。
- `<polygon>` 创建多边形。
- `<path>` 通过指定点以及点和点之间的线来创建任意形状。
- `<defs>` 定义一个可复用的图形。初始情况下 `<defs>` 里面的内容是不可见的。`<defs>` 标签之于矢量图就如同 `<head>` 标签之于一个 web 页面。
- `<g>` 将多种形状组合起来。将组合后的形状置于 `<defs>` 中可以让它能够被复用。
- `<symbol>` 类似于一个组合，但是拥有一些额外的特性。通常被置于 `<defs>` 标签中便于复用。
- `<use>` 获取在 `<defs>` 中定义的复用对象并在 `SVG` 中显示出来。





SVG属性
```
svg {
  stroke: #000;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
```


SVG path路径命令
M = moveto   移动到的点的x轴和y轴的坐标
L = lineto 需要两个参数，分别是一个点的x轴和y轴坐标，L命令将会在当前位置和新位置（L前面画笔所在的点）之间画一条线段。
H = horizontal lineto 绘制平行线
V = vertical lineto 绘制垂直线
![](https://cdn.nlark.com/yuque/0/2020/webp/326402/1584606578269-3c94f824-66f1-4ce0-a252-bbd15455d4cb.webp#align=left&display=inline&height=100&margin=%5Bobject%20Object%5D&originHeight=100&originWidth=100&size=0&status=done&style=none&width=100)

```html
<svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 H 90 V 90 H 10 L 10 10"/> 
    <!-- Points -->
    <circle cx="10" cy="10" r="2" fill="red"/>
    <circle cx="90" cy="90" r="2" fill="red"/>
    <circle cx="90" cy="10" r="2" fill="red"/>
    <circle cx="10" cy="90" r="2" fill="red"/>
</svg>
```
可以通过一个“闭合路径命令”Z来简化上面的path，简写形式：
```html
<svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>
   <!-- Points -->
   <circle cx="10" cy="10" r="2" fill="red"/>
   <circle cx="90" cy="90" r="2" fill="red"/>
   <circle cx="90" cy="10" r="2" fill="red"/>
   <circle cx="10" cy="90" r="2" fill="red"/>
</svg>
```
相对命令使用的是小写字母，它们的参数不是指定一个明确的坐标，而是表示相对于它前面的点需要移动多少距离。相对坐标形式：
```html
<svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/>
   <!-- Points -->
   <circle cx="10" cy="10" r="2" fill="red"/>
   <circle cx="90" cy="90" r="2" fill="red"/>
   <circle cx="90" cy="10" r="2" fill="red"/>
   <circle cx="10" cy="90" r="2" fill="red"/>
</svg>
```


C = curveto  曲线沿着起点到第一控制点的方向伸出，逐渐弯曲，然后沿着第二控制点到终点的方向结束。

三次贝塞尔曲线需要定义一个点和两个控制点，所以用C命令创建三次贝塞尔曲线，需要设置三组坐标参数：C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)，最后一个坐标(x,y)表示的是曲线的终点，另外两个坐标是控制点，(x1,y1)是起点的控制点，(x2,y2)是终点的控制点。
![](https://cdn.nlark.com/yuque/0/2020/webp/326402/1584606767638-493386fb-8ac6-4be5-bab2-8b1a2c3341a6.webp#align=left&display=inline&height=171&margin=%5Bobject%20Object%5D&originHeight=171&originWidth=218&size=0&status=done&style=none&width=218)
```html
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>
    <circle cx="130" cy="110" r="2" fill="red"/>
    <circle cx="120" cy="140" r="2" fill="red"/>
    <line x1="130" y1="110" x2="120" y2="140" style="stroke:rgb(255,0,0);stroke-width:2"/>
    <circle cx="180" cy="140" r="2" fill="red"/>
    <circle cx="170" cy="110" r="2" fill="red"/>
    <line x1="180" y1="140" x2="170" y2="110" style="stroke:rgb(255,0,0);stroke-width:2"/>
</svg>
```




S = smooth curveto  简写的贝塞尔曲线命令

一个点某一侧的控制点是它另一侧的控制点的对称（以保持斜率不变）。可以使用一个简写的贝塞尔曲线命令S：S x2 y2, x y (or s dx2 dy2, dx dy)，S命令可以用来创建与之前那些曲线一样的贝塞尔曲线，但是，如果S命令跟在一个C命令或者另一个S命令的后面，它的第一个控制点，就会被假设成前一个控制点的对称点。如果S命令单独使用，前面没有C命令或者另一个S命令，那么它的两个控制点就会被假设为同一个点。
![](https://cdn.nlark.com/yuque/0/2020/webp/326402/1584606830220-c98f4c67-ed1b-4103-a6f6-de7ef04e9086.webp#align=left&display=inline&height=210&margin=%5Bobject%20Object%5D&originHeight=210&originWidth=267&size=0&status=done&style=none&width=267)


```html
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>
    <circle cx="10" cy="80" r="2" fill="red"/>
    <circle cx="40" cy="10" r="2" fill="red"/>
    <line x1="10" y1="80" x2="40" y2="10" style="stroke:rgb(255,0,0);stroke-width:1"/>
    <circle cx="65" cy="10" r="2" fill="red"/>
    <circle cx="95" cy="80" r="2" fill="red"/>
    <line x1="65" y1="10" x2="95" y2="80" style="stroke:rgb(255,0,0);stroke-width:1"/>
    <circle cx="125" cy="150" r="2" fill="blue"/>
    <circle cx="180" cy="80" r="2" fill="red"/>
    <circle cx="150" cy="150" r="2" fill="red"/>
    <line x1="95" y1="80" x2="125" y2="150" style="stroke:blue;stroke-width:1"/>
    <line x1="180" y1="80" x2="150" y2="150" style="stroke:rgb(255,0,0);stroke-width:1"/>
</svg>
```


Q = quadratic Bézier curve 二次贝塞尔曲线

二次贝塞尔曲线Q比三次贝塞尔曲线简单，只需要一个控制点，用来确定起点和终点的曲线斜率。需要两组参数，控制点和终点坐标。Q命令：Q x1 y1, x y (or q dx1 dy1, dx dy)

![](https://cdn.nlark.com/yuque/0/2020/webp/326402/1584606871763-f9091266-f299-4a77-8010-8f2cf2d010e4.webp#align=left&display=inline&height=152&margin=%5Bobject%20Object%5D&originHeight=152&originWidth=257&size=0&status=done&style=none&width=257)
```html
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
     <!--Points-->
    <circle cx="10" cy="80" r="2" fill="red"/>
    <circle cx="95" cy="10" r="2" fill="red"/>
    <circle cx="180" cy="80" r="2" fill="red"/>
    <line x1="10" y1="80" x2="95" y2="10" style="stroke:rgb(255,0,0);stroke-width:1"/>
    <line x1="95" y1="10" x2="180" y2="80" style="stroke:rgb(255,0,0);stroke-width:1"/>
</svg>
```


T = smooth quadratic Bézier curveto 简写的贝塞尔曲线命令
就像三次贝塞尔曲线有一个S命令，二次贝塞尔曲线有一个差不多的T命令，可以通过更简短的参数，延长二次贝塞尔曲线。T x y (or t dx dy)，快捷命令T会通过前一个控制点，推断出一个新的控制点。这意味着，在你的第一个控制点后面，可以只定义终点，就创建出一个相当复杂的曲线。需要注意的是，T命令前面必须是一个Q命令，或者是另一个T命令，才能达到这种效果。如果T单独使用，那么控制点就会被认为和终点是同一个点，所以画出来的将是一条直线。
![](https://cdn.nlark.com/yuque/0/2020/webp/326402/1584607014597-56b71b46-9785-4dbd-a57a-5326b808b98b.webp#align=left&display=inline&height=204&margin=%5Bobject%20Object%5D&originHeight=204&originWidth=285&size=0&status=done&style=none&width=285)
```html
<!--二次贝塞尔曲线简写-->
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 80 Q 52.5 10, 95 80 T  180 80" stroke="black" fill="transparent"/>
    <circle cx="10" cy="80" r="2" fill="red"/>
    <circle cx="52.5" cy="10" r="2" fill="red"/>
    <line x1="10" y1="80" x2="52.5" y2="10" style="stroke:rgb(255,0,0);stroke-width:1"/>
    <circle cx="95" cy="80" r="2" fill="red"/>
    <line x1="95" y1="80" x2="52.5" y2="10" style="stroke:rgb(255,0,0);stroke-width:1"/>
    <circle cx="180" cy="80" r="2" fill="blue"/>
    <circle cx="137.5" cy="150" r="2" fill="blue"/>
    <line x1="95" y1="80" x2="137.5" y2="150" style="stroke:rgb(0,0,255);stroke-width:1"/>
    <line x1="137.5" y1="150" x2="180" y2="80" style="stroke:rgb(0,0,255);stroke-width:1"/>
</svg>
```


A = elliptical Arc 弧形

A命令的参数：
A rx ry x-axis-rotation large-arc-flag sweep-flag x y
或者 a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
弧形命令A的前两个参数分别是x轴半径和y轴半径，弧形命令A的第三个参数表示弧形的旋转情况，large-arc-flag（角度大小） 和sweep-flag（弧线方向），large-arc-flag决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧。sweep-flag表示弧线的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧。
![](https://cdn.nlark.com/yuque/0/2020/webp/326402/1584607064507-10f4568f-fd20-403f-ae88-480fddcc0b3d.webp#align=left&display=inline&height=200&margin=%5Bobject%20Object%5D&originHeight=200&originWidth=200&size=0&status=done&style=none&width=200)
```html
<svg width="320px" height="320px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
</svg>
```
原理分析：如图例所示，画布上有一条对角线，中间有两个椭圆弧被对角线切开(x radius = 30, y radius = 50)。第一个椭圆弧的x-axis-rotation（x轴旋转角度）是0，所以弧形所在的椭圆是正置的（没有倾斜）。在第二个椭圆弧中，x-axis-rotation设置为-45，所以这是一个旋转了45度的椭圆，并以短轴为分割线，形成了两个对称的弧形。






Z = closepath 从当前点画一条直线到路径的起点
注意：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

