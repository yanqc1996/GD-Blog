module.exports = {
    dest: './docs', // 设置文件的输出目录
    base: '/yqc-blog/', // 设置站点根路径，即github上项目blog项目的名称
    title: '阿毛心怀宇宙', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '一根小炸毛', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', {
            rel: 'icon',
            href: '/login.png'
        }], //浏览器的标签栏的网页图标
        ['link', {
            rel: 'stylesheet',
            href: '/live2dModels/live2d/css/common.css'
        }], //引入css
        ['script', {
            type: 'text/javascript',
            src: '/live2dModels/live2d/js/live2d.js'
        }], //引入live2d
        ['script', {
            type: 'text/javascript',
            src: '/live2dModels/live2d/js/init.js'
        }], //引入live2d初始化脚本,async:'async'
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/login.png',
        lastUpdated: '可能更新于', // string | boolean
        nav: [{
                text: '首页',
                link: '/'
            },
            {
                text: '前端开发',
                ariaLabel: '前端开发',
                items: [
                    {
                        text: '开发笔记',
                        link: '/pages/index/index.md'
                    },
                    {
                        text: '知识点记录',
                        link: '/pages/develop-node/array-dedup.md'//默认跳转相应组的文件页面
                    },
                    {
                        text: '项目常用工具',
                        link: '/pages/project-tools/test5.md'
                    },
                    {
                        text: 'Vue学习',
                        link: '/pages/vue-node/vue生命周期详解.md'
                    },
                    {
                        text: 'React学习',
                        link: '/pages/react-node/React概括.md'
                    },
                ]
            },
            // {
            //     text: '阿毛心怀宇宙',
            //     link: ''
            // },
            // {
            //     text: '生活记录片',
            //     link: ''
            // },
            {
                text: 'Github',
                link: 'https://github.com/yanqc1996/yqc-blog'
            },
        ],
        sidebar: {
            '/pages/develop-node/': [{
                title: '开发笔记', // 必要的
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1, // 可选的, 默认值是 1
                children: [
                    ['array-dedup.md', '数组去重探究'],
                    ['js-points.md', 'js知识点整理'],
                    ['svg-point.md', 'svg基础知识'],
                    ['原型与原型链.md', '原型与原型链'],
                    ['Object_Function-原型与原型链拓展.md', 'Object/Function-原型与原型链拓展']
                ]
            }],
            '/pages/project-tools/': [{
                title: '项目常用工具',
                collapsable: false, // 可选的, 默认值是 true,
                children: [
                    ['vuepress.md', 'vuepress+github搭建博客教程'],
                    ['mockjs.md', 'mockjs引入项目'],
                    ['vue-jest.md', 'vue-jest单元测试'],
                ]
            }],
            '/pages/react-node/': [{
                title: 'react学习',
                collapsable: false, // 可选的, 默认值是 true,
                children: [
                    ['react-demo.md', 'react项目初始化+路由相关'],
                    ['React概括.md', 'react必备知识点'],
                    ['Redux基础.md', 'Redux基础'],
                ]
            }],
            '/pages/vue-node/': [{
                title: 'Vue学习',
                collapsable: false, // 可选的, 默认值是 true,
                children: [
                    ['vue生命周期详解.md', 'vue生命周期详解'],
                ]
            }],
        }
    }
}