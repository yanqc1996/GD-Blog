module.exports = {
    dest: './docs',  // 设置输出目录
    base: '/newBlog/',// 设置站点根路径，即github上项目blog项目的名称
    title: '阿毛心怀宇宙', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '阿毛的前端记录（项目参照整改中）', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/login.png' }],  //浏览器的标签栏的网页图标
        ['link', { rel: 'stylesheet', href: '/live2dModels/live2d/css/common.css' }],  //引入css
        ['script', { type: 'text/javascript', src: '/live2dModels/live2d/js/live2d.js' }],  //引入live2d
        ['script', { type: 'text/javascript', src: '/live2dModels/live2d/js/init.js' }],  //引入live2d初始化脚本,async:'async'
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/login.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '分类',
                ariaLabel: '分类',
                items: [
                    { text: '开发笔记', link: '/pages/develop-node/test1.md' },
                    { text: '项目常用工具', link: '/pages/project-tools/test5.md' },
                    { text: 'react学习', link: '/pages/react-node/React概括.md' },
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
                        ['vuepress.md', 'vuepress+github搭建博客教程'],
                        ['mockjs.md', 'mockjs引入项目'],
                        ['vue-jest.md', 'vue-jest单元测试'],
                    ]
                }
            ],
            '/pages/react-node/':[
                {
                    title: 'react学习',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['react-demo.md', 'react项目初始化+路由相关'],
                        ['React概括.md', 'react必备知识点'],
                    ]
                }
            ],
        }
    }
}
