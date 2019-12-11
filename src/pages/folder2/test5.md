# leaflet+vue开发文档+功能实现

### 1.在vue项目中引入leaflet及相关插件
1.新建vue-cli3项目
2.引入部分leaflet依赖![image.png](https://cdn.nlark.com/yuque/0/2019/png/326402/1576029666310-c93731d3-80ad-4462-a5f9-cf92ec2d44fb.png#align=left&display=inline&height=141&name=image.png&originHeight=141&originWidth=921&size=28321&status=done&style=none&width=921)3.在地图组件中引入相关的依赖（可以在组件中引入也可以在main,js中全局引入）
![image.png](https://cdn.nlark.com/yuque/0/2019/png/326402/1576029769189-1f903740-85b8-48aa-94c9-5e3088a58920.png#align=left&display=inline&height=165&name=image.png&originHeight=165&originWidth=989&size=32302&status=done&style=none&width=989)4.全局地图初始化：定义地图容器，该容器高度不可为0
![image.png](https://cdn.nlark.com/yuque/0/2019/png/326402/1576030093535-f205a9d3-61bf-41cc-bf43-a41d77896804.png#align=left&display=inline&height=93&name=image.png&originHeight=93&originWidth=683&size=6823&status=done&style=none&width=683)
5.调用地图初始化方法初始化地图：
![image.png](https://cdn.nlark.com/yuque/0/2019/png/326402/1576030410170-521e3f2d-2d85-42ad-87ff-c1af56bb965d.png#align=left&display=inline&height=200&name=image.png&originHeight=200&originWidth=593&size=15151&status=done&style=none&width=593)
6.基础初始化方法
![image.png](https://cdn.nlark.com/yuque/0/2019/png/326402/1576030876268-d0405e7e-d0b9-478a-ab02-0527d340a3b2.png#align=left&display=inline&height=590&name=image.png&originHeight=590&originWidth=1204&size=83347&status=done&style=none&width=1204)
