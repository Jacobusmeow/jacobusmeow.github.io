let myMap = L.map("mapdiv");
let markerGroup = L.featureGroup();
const sights = L.featureGroup();

let myLayers = {
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
            }
    ),
    bmapoverlay : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ), 
    bmaporthofoto30cm : L.tileLayer(
            "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains : ["maps", "maps1", "maps4"], 
                attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    )
};

myMap.addLayer(myLayers.geolandbasemap);

let myScale = L.control.scale ({
    position : "bottomleft",
    metric : true, 
    imperial : false,
    maxWidth : 200
}
);
myScale.addTo(myMap);

let myMapControl = L.control.layers({
    "Basemap" : myLayers.geolandbasemap,
    "Orthofoto" : myLayers. bmaporthofoto30cm,
},{
    "Beschriftung" : myLayers.bmapoverlay,
    "Sehenswürdigkeiten" : sights,
});
myMap.addControl(myMapControl);
myMap.setView([48.226653, 16.378609], 11);

const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json";
async function addGeojson(url){
    console.log("url wird geladen", url);
    const response= await fetch (url);
    console.log("Response: ", response);
    const sightdata= await response.json();
    console.log("GEOJson: ", sightdata);
    const geojson= L.geoJSON(sightdata,{
        pointToLayer: function(geoJsonPoint, latlng){
            return L.marker(latlng,{icon: L.icon({
                iconUrl: 'icons/sights.png'
                })
            });
        } 
    }).addTo(sights);
    sights.addLayer(geojson);
    geojson.bindPopup(function(layer){
        const props=layer.feature.properties;
        const PopupText=`<h3>${props.NAME}</h3><p>Adresse:${props.ADRESSE}</p><p><a href="${props.WEITERE_INF}">Weitere Info's</a></p>`;
        return PopupText;

    });
}
addGeojson(url);

/*
let geojson = L.geoJSON(sightdata).addTo(sights);
geojson.bindPopup (function(layer){
    console.log ("Layer for PopUp:", layer.feature.properties.name);
    const props = layer.feature.properties;
    const popupText = `<h3> ${props.NAME}</h3></p><p>Adresse:${props.ADRESSE}<p><a href="${props.WEITERE_INF}">Weitere Informationen</a></p>`;
    return popupText;
    const geojson = L.geoJSON(sightdata,{
       pointToLayer: function(geoJsonPoint, latlng) {
            return L.marker(latlng,{
                icon: L.icon({
                    iconUrl: "icons/sights.png"
                })
            });
        }
    });

})
*/