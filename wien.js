let myMap = L.map("mapdiv");
const wienGroup = L.featureGroup();
let myLayers = {

    osm : L.tileLayer ( 
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>osm.org"
    } 
    ),
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmapoverlay : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmapgrau : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmaphidpi : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmaporthofoto30cm : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    )
};


myMap.addLayer(myLayers.osm);//DOCLink: http://leafletjs.com/reference-1.3.0.html#map-addlayer



let myMapControl = L.control.layers({ //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "bmapgrau" : myLayers.bmapgrau,
    "bmaphidpi" : myLayers.bmaphidpi,
    "Orthofoto 30cm" : myLayers.bmaporthofoto30cm,
},{
    "bmapoverlay" : myLayers.bmapoverlay, // schrift kann in allen anderen Layern angezeigt werden
    "Stadtspaziergang": wienGroup,
},{
    //collapsed : false, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
    //ich bin mir nicht sicher, ob ich die aufgabe richtig verstanden habe, aber jetzt ist das layer control direkt ausgeklappt..
})
myMap.addControl(myMapControl); //DOCLink: http://leafletjs.com/reference-1.3.0.html#map-addcontrol






myMap.setView([48.226653, 16.378609], 11); //DOCLink: http://leafletjs.com/reference-1.3.0.html#map-setview


let myScale = L.control.scale({ //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
  
    imperial : false, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    metric : true, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    maxWidth : 200, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    position : "bottomleft", //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-position
    updateWhenIdle : true, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-updatewhenidle
}).addTo(myMap);
//async bedeutet, das etwas passiert, was nicht in der datei funktioniert..?
//daten werden von dem server herunter geladen:
async function addGeojson(url){
    console.log("url wird geladen", url);
    const response= await fetch(url);  //was bedeutet fetch??
    console.log("Response: ", response);
    const wiendata = await response.json(); //was bedeutet await?
    console.log ("GEOJson: ", wiendata);
    const geojson = L.geoJSON(wiendata,{
        style: function(feature){
            return {color: "#ff0000"};
        },
        pointToLayer: function(geoJsonPoint, latlng) {//icon der marker Points ändern: 
            return L.marker(latlng,{
                icon: L.icon({
                    iconUrl: 'icons/sights.png',
                })
            });
        }
    }
    );
    wienGroup.addLayer(geojson);
}



const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD";


addGeojson(url); //ruft die funktion auf 





//im folgenden wird stationen.js angesprochen und einzelene Informatioen (zb. Temperatur im popup angezeigt)
//console.log ("Stationen: ", stationen); //zum überprüfen, ob die daten wirklich geladen werden.

/*let geojson = L.geoJSON(spaziergang).addTo(wienGroup);
geojson.bindPopup(function(layer) {
    console.log("Layer for popup:", layer.feature.properties.name);
    const props = layer.feature.properties;
    const popupText = `<h1>${props.NAME}</h1>
    <p>Beschreibung: ${props.BEMERKUNG}</p><p>Adresse:${props.ADRESSE}<p>Weiter Informationen: ${props.WEITERE_INF}`;
    const popupText2 = ""
    return popupText;
   
}); 
myMap.fitBounds(wienGroup.getBounds());

*/




