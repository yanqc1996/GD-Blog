# vuepress+github

vuepress官网：[https://www.vuepress.cn/](https://www.vuepress.cn/)<br />

<a name="zzSkW"></a>
## 搭建步骤
1.全局安装vuepress：终端 npm install -g vuepress<br />2.github新建仓库并拉取<br />3.具体项目搭建流程见官网，下文介绍一些配置信息
<a name="Oi1kG"></a>
## 项目结构
<a name="yJiYB"></a>
#### package.json文件：项目基本信息文件
```
"scripts": {
    "dev": "vuepress dev src",//本地启动
    "build": "vuepress build src"//打包
},
```
<a name="Sdbbt"></a>
#### src文件夹：开发代码
主要关注src/.vuepress/config.js内含详细的注释，用于配置相关的页面显示和路由跳转
```
module.exports = {
    dest: './docs',  // 设置输出目录
    base: '/newBlog/',// 设置站点根路径，即github上项目blog项目的名称
    title: '阿毛心怀宇宙', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '阿毛的前端记录（项目参照整改中）', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],  //浏览器的标签栏的网页图标
        ['link', { rel: 'stylesheet', href: '/live2dModels/live2d/css/common.css' }],  //引入css
        ['script', { type: 'text/javascript', src: '/live2dModels/live2d/js/live2d.js' }],  //引入live2d
        ['script', { type: 'text/javascript', src: '/live2dModels/live2d/js/init.js' }],  //引入live2d初始化脚本,async:'async'
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/logo.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '分类',
                ariaLabel: '分类',
                items: [
                    { text: '开发笔记', link: '/pages/develop-node/test1.md' },
                    { text: '项目常用工具', link: '/pages/project-tools/test5.md' },
                ]
            },
            { text: 'Github', link: 'https://github.com/yanqc1996/newBlog' },
        ],
        sidebar: {
            '/pages/develop-node/':[
                {
                    title: '开发笔记',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['array-dedup.md', '数组去重探究'],
                        ['js-points.md', 'js知识点整理'],
                        ['svg-point.md', 'svg基础知识'],
                    ]
                }
            ],
            '/pages/project-tools/':[
                {
                    title: '项目常用工具',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['vuepress.md', 'vuepress+github搭建博客教程']
                    ]
                }
            ],
        }
    }
}

```


<a name="iHdWt"></a>
#### docs文件夹
运行npm run build后打包出来的文件夹。
<a name="BOmZj"></a>
## github仓库设置
点击仓库的**Settings**，向下滚动至**GitHub Pages，Source**的下来列表选择第二个选项**master branch/docs floder，Source**上面一行浅蓝色底文字是你设置好以后的博客地址
<a name="colorfully-egg"></a>
## colorfully egg
为提升网站趣味性，添加了live2d元素，<br />主要思路是页面加载完成后创建canvas标签添加至body，然后调用loadlive2d（）<br />live2d的教程分享张鑫旭的文章[二次元live2d看板娘效果中的web前端技术](https://www.zhangxinxu.com/wordpress/2018/05/live2d-web-webgl-js/)<br />为保证在各自项目都能运行需要对init.js作一丢丢的调整---第八行 newBlog 替换为你的仓库名<br />具体路径为src/.vuepress/public/live2dModels/live2d/js/init.js
```
window.addEventListener('load',function(){
  var canvas = document.createElement('canvas');
  canvas.id = 'live2d';
  canvas.width = '280';
  canvas.height = '250';
  canvas.style.cssText = 'position: fixed;right:-40px;bottom:0;';
  document.body.appendChild(canvas);
  loadlive2d("live2d", "/newBlog/live2dModels/live2d/model/kesshouban/model.json");//wzp替换为仓库名
})
```


<a name="gUWuj"></a>
## 注意事项
本地启动开发不支持热更新<br />src中的代码调整完后先npm run build打包，再提交至远程仓库，博客内容才会更新<br />

