var map = L.map('mapid').setView([21.07204051307818, 105.7739627412891], 20);
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function iconTree(feature, latlng) {
    var iconCus = L.icon({
        iconUrl: "../static/images/tree.png",
        iconSize: [20, 20],
        iconAncho: [22, 94],
        popupAncho: [-3, -76]
    })
    return L.marker(latlng, { icon: iconCus })
}

//Feature

function buildingFeature(feature, layer) {
    if (feature.properties) {
        feature.layer = layer;

        // layer.bindPopup("<b>Địa chỉ: </b>" + feature.properties.diaChi + "<br>" +
        //     "<b>Loại nhà: </b>" + feature.properties.loaiNha + "<br>" +
        //     "<b>Số tầng: </b>" + feature.properties.soTang + "<br>" +
        //     "<b>Diện tích: </b>" + feature.properties.dienTich + "m2<br>" +
        //     "<b>ID: </b>" + feature.properties.id + "<br>" +
        //     '<a href="building/' + feature.properties.id + '">Edit</a>')
        var p = layer.feature.properties;
        p.index = p.loaiNha + " | " + p.id;
    }
}
function treeFeature(feature, layer) {
    feature.layer = layer;
    if (feature.properties) {
        
        layer.bindPopup("<b>Loại cây: </b>" + feature.properties.loaicay + "<br>" +
            "<b>Chiều cao: </b>" + feature.properties.chieucao + "m<br>" +
            "<b>ID: </b>" + feature.properties.id + "<br>" +
            '<a href="tree/' + feature.properties.id + '">Edit</a>')
    }
}
var markersLayer = new L.LayerGroup();
//get API, add data to 


var searchCtrl = L.control.fuseSearch()
searchCtrl.addTo(map);

function getAPI(link) {
    var overlay = null;
    $.ajax({
        type: "GET",
        datatype: "JSON",
        url: link,
        async: !1,
        success: function (response) {
            console.log(response)
            if (link == "api/v1/tree") {
                searchCtrl.indexFeatures(response.features, ['loaicay', 'chieucao', 'id']);

                overlay = L.geoJSON(response, {
                    pointToLayer: iconTree, onEachFeature: treeFeature
                })
                markersLayer.addLayer(overlay)
                // .addTo(map)
            }
            else {
                overlay = L.geoJSON(response, {
                    onEachFeature: buildingFeature
                })
                markersLayer.addLayer(overlay)

                // .addTo(map)
            }
        }
    })
    return overlay
}
var building = getAPI("/api/v1/building")
var tree = getAPI("api/v1/tree")
console.log(tree)
map.addLayer(markersLayer)
var baseLayers = {
    "Open Street Maps": osm
}
var overlays = {
    "Tree": tree,
    "Building": building,
}

L.control.layers(baseLayers, overlays).addTo(map)


var legend = L.control({ position: 'bottomright' })
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info')
    div.innerHTML += '<img style="width:30px;height:30px" src="{{ url_for("static", filename="images/building.png") }}">: Building<br>'
    div.innerHTML += '<img style="width:30px;height:30px" src="{{ url_for("static", filename="images/tree.png") }}">: Tree<br>'
    return div
}
legend.addTo(map)

drawnItems = L.featureGroup().addTo(map);
map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
}));
map.on('draw:created', function (event) {
    var layer = event.layer;

    layer.on('click', layerClick);

    drawnItems.addLayer(layer);


});
function layerClick(e) {

    var geoJSON = drawnItems.toGeoJSON();
    $.ajax({
        url: "/output",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(geoJSON),
        success: function (data) {/* do something */ }
    });
}

// L.geoJson(data, {
//     onEachFeature: function (feature, layer) {
//         feature.layer = layer;
//     }
// });
// function onEach(feature, layer) {
//     var p = layer.feature.properties;
//     p.index = p.Name + " | " + p.ID;
// }
// L.control.search({
//     layer: markersLayer,
//     initial: true,
//     propertyName: 'id',
//     propertyName: 'loaicay',
//     buildTip: function (text, val) {
//         var type = val.layer.feature.properties.loaicay;
//         // var p = layer.feature.properties;
//         // p.index = p.loaiNha + " | " + p.id;
//         return '<a href="#" class="">' + text + ': <b>' + type + '</b></a>';
//     },
// }).addTo(map);


