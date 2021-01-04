import 'ol/ol.css';
import './css/style.css';

// const map = new Map({
//     target: 'map',
//     layers: [
//         new TileLayer({
//             source: new WMTS()
//         })
//     ],
//     view: new View({
//         center: [0, 0],
//         zoom: 0
//     })
// });

import Map from 'ol/Map';
//import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
//import WMTSTileGrid from 'ol/tilegrid/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
//import {get as getProjection} from 'ol/proj';
//import {getTopLeft, getWidth} from 'ol/extent';


let parser = new WMTSCapabilities();
var map;

const wmtsUrl = '/geoserver/gwc/service/wmts?Service=WMTS&Request=GetCapabilities';
fetch(wmtsUrl)
    .then(function (response) {
        return response.text();
    })
    .then(function (text) {
        var result = parser.read(text);
        var options = optionsFromCapabilities(result, {
            layer: 'GIS:ne_10m_land',
            matrixSet: 'EPSG:900913',
            maxZoom: 9,
        });

        map = new Map({
            layers: [
                new TileLayer({
                    opacity: 1,
                    source: new WMTS(options),
                }) ],
            target: 'map',
            view: new View({
                center: [0, 0],
                zoom: 5,
            }),
        });
    });

//
// var projection = getProjection('EPSG:3857');
// var projectionExtent = projection.getExtent();
// var size = getWidth(projectionExtent) / 256;
// var resolutions = new Array(14);
// var matrixIds = new Array(14);
// for (var z = 0; z < 14; ++z) {
//     // generate resolutions and matrixIds arrays for this WMTS
//     resolutions[z] = size / Math.pow(2, z);
//     matrixIds[z] = z;
// }
//
// var map = new Map({
//     layers: [
//         new TileLayer({
//             source: new OSM(),
//             opacity: 0.7,
//         }),
//         new TileLayer({
//             opacity: 0.7,
//             source: new WMTS({
//                 attributions:
//                     'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/' +
//                     'services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',
//                 url:
//                     'http://localhost/WeServer/wmts',
//                 layer: '0',
//                 matrixSet: 'mercator',
//                 format: 'image/jpeg',
//                 //projection: projection,
//                 tileGrid: new WMTSTileGrid({
//                     origin: getTopLeft(projectionExtent),
//                     resolutions: resolutions,
//                     matrixIds: matrixIds,
//                 }),
//                 style: 'default',
//                 wrapX: true,
//             }),
//         }) ],
//     target: 'map',
//     view: new View({
//         center: [-11158582, 4813697],
//         zoom: 4,
//     }),
// });

// import L from 'leaflet';
// import 'leaflet-draw';
// import 'proj4leaflet'
// import 'leaflet.chinatmsproviders';
//
// // CSS一式を読み込んでパッケージ
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import "./css/style.css";
//
// //デフォルトアイコンパス
// L.Icon.Default.imagePath = 'img/icon/';
//
// //MIERUNE Color読み込み
// var m_color = new L.tileLayer('https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png', {
//     attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
// });
//
// // ArcGIS 卫星地图
// let arcgis_satellite = new L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
//
// // Google earth
// let google_satellite = new L.tileLayer('http://localhost/WeServer/wmts/1.0.0/acimage/default/mercator/{z}/{y}/{x}.jpg',{
// 	  maxZoom: 9
// });
//
// // 高德地图
// let autonavi_satellite = L.tileLayer.chinaProvider(
//     'GaoDe.Satellite.Map',
//     {
//         maxZoom:18,
//         minZoom:5,
//     }
// );
//
// // OpenStreetMap
// let osm_normal = L.tileLayer.chinaProvider(
//     'OSM.Normal.Map',
//     {
//         maxZoom:18,
//         minZoom:5,
//     }
// );
//
// //経緯度設定
// var lat = 36.0737;
// var lng = 120.4250;
// const defaultCenter = [lat, lng];
// const defaultZoom = 15;
//
// //MAP読み込み
// var map = L.map('map', {
//     center: defaultCenter,
//     zoom: defaultZoom,
//     zoomControl: true,
//     layers: [arcgis_satellite]
// });
//
// //背景レイヤ
// var Map_BaseLayer = {
//     "MIERUNE Color": m_color,
//     "Google satellite": google_satellite,
//     "Autonavi normal": autonavi_satellite,
//     "OpenStreatMap normal": osm_normal,
//     "ArcGIS satellite": arcgis_satellite
// };
//
// //レイヤ設定
// L.control.layers(
//     Map_BaseLayer,
//     null
// ).addTo(map);
//
// //スケール設定
// L.control.scale({
//     imperial: false,
//     maxWidth: 300
// }).addTo(map);
//
// // 添加marker标注
// const marker = L.marker([36.0737, 120.4250]);
// marker.bindPopup("<b>中国电波传播研究所</b><br/>青大一路19号").openPopup();
// marker.addTo(map);
//
// map.setView(defaultCenter, defaultZoom);
//
//
// // Initialise the FeatureGroup to store editable layers
// var editableLayers = new L.FeatureGroup();
// map.addLayer(editableLayers);
//
// var MyCustomMarker = L.Icon.extend({
//     options: {
//         shadowUrl: 'img/icon/marker-shadow.png',
//         iconUrl: 'img/icon/marker-icon.png'
//     }
// });
// var options = {
//     position: 'topleft',
//     draw: {
//         polyline: {
//             shapeOptions: {
//                 color: '#f357a1',
//                 weight: 10
//             }
//         },
//         polygon: {
//             allowIntersection: false, // Restricts shapes to simple polygons
//             drawError: {
//                 color: '#e1e100', // Color the shape will turn when intersects
//                 message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
//             },
//             shapeOptions: {
//                 color: '#bada55'
//             }
//         },
//         circle: false, // Turns off this drawing tool
//         rectangle: {
//             shapeOptions: {
//                 clickable: false
//             }
//         },
//         marker: {
//             icon: new MyCustomMarker()
//         }
//     },
//     edit: {
//         featureGroup: editableLayers, //REQUIRED!!
//         remove: false
//     }
// };
// // Initialise the draw control and pass it the FeatureGroup of editable layers
// var drawControl = new L.Control.Draw(options);
// map.addControl(drawControl);
//
// map.on('draw:created', function (e) {
//     const type = e.layerType;
//     const layer = e.layer;
//     if (type === 'marker') {
//         layer.bindPopup('临时标记点');
//     }
//     editableLayers.addLayer(layer);
// });
