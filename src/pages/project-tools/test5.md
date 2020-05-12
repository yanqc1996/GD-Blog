# leaflet+vue开发文档+功能实现

### 1.在vue项目中引入leaflet及相关插件
1.新建vue-cli3项目
2.引入部分leaflet依赖

```javascript
  "@geoman-io/leaflet-geoman-free": "^2.3.0",
    "@turf/turf": "^5.1.6",
    "leaflet": "^1.6.0",
    "leaflet.chinatmsproviders": "^2.0.3",
```

3.在地图组件中引入相关的依赖（可以在组件中引入也可以在main,js中全局引入）

```javascript
import * as L from 'leaflet' //地图组件中引入leaflet
import 'leaflet.chinatmsproviders'//常用地图切换加载（地图底图切换）
import '@geoman-io/leaflet-geoman-free';//左上操作栏引入
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
```

4.全局地图初始化：定义地图容器，该容器高度不可为0

```javascript
 <div id="map" class="mapContainer"></div>
```

5.调用地图初始化方法初始化地图：

```javascript
 mounted() {
        this.initMap();//地图初始化
    },
```

6.基础初始化方法

```javascript
 initMap() {
            let normal = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
                maxZoom: 18,
                minZoom: 5,
            });//引入地图底图（街道图）
            let satellite = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
                maxZoom: 18,
                minZoom: 5,
            });//引入地图底图（散点图）
            map = L.map("map", {
                preferCanvas:true,//将图层的默认渲染改为canvas渲染，海量点的时候不会引起卡顿,false时默认渲染方式为svg
                center: [30.28, 120.15],//设置地图中心点
                zoom: 12,//缩放级别
                fullscreenControl: true,//全屏控件
                layers: [normal],//默认底图
                dragging: true//是否可以拖拽
            });
            var baseLayers = {
                "街道图": normal,
                "卫星图": satellite
            };//初始化图层组
 }
```


