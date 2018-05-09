let myMap = L.map("mapdiv");


let markers = L.markerClusterGroup();
myMap.addLayer(markers);

//const markers = L.featureGroup();
let myLayers = {
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
        }
    )
};
myMap.addLayer(myLayers.geolandbasemap);

let myScale = L.control.scale({
    position: "bottomleft",
    metric: true,
    imperial: false,
    maxWidth: 200
});
myScale.addTo(myMap);
let myMapControl = L.control.layers({
    "Basemap": myLayers.geolandbasemap,
    "Orthofoto": myLayers.bmaporthofoto30cm,
}, {
        "Beschriftung": myLayers.bmapoverlay,
        "Citybike Stationen": markers,
    });
myMap.addControl(myMapControl);
myMap.setView([48.226653, 16.378609], 11);

const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json";

async function addGeojson(url) {
    console.log("url wird geladen", url);
    const response = await fetch(url);  //was bedeutet fetch??
    console.log("Response: ", response);
    const bikedata = await response.json(); //was bedeutet await?
    console.log("GEOJson: ", bikedata);
    const geojson = L.geoJSON(bikedata, {
        pointToLayer: function (geoJsonPoint, latlng) {//icon der marker Points ändern: 
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'icons/bike.png',
                })
            });
        }
    }).addTo(markers);
    markers.addLayer(geojson);
    geojson.bindPopup(function (layer) {
        const props = layer.feature.properties;
        const PopupText = `<h4>${props.STATION}</h4>`;
        return PopupText;
    });
    const hash = new L.Hash(myMap);
    myMap.addControl(new L.Control.Search({
        layer: markers,
        propertyName: "STATION"
    }));
}
/*

    const geojson = L.geoJSON(bikedata,{
        style: function(feature){
            return{color: "#ff0000"};
        },
        pointToLayer: function(geoJsonPoint, latlng) { 
            return L.marker(latlng,{icon: L.icon({
                    iconUrl: "icons/bike.png",
                })
            })
        }
    })
        
        
        .bindPopup(function(layer){ 
            const props = layer.feature.properties;
            const popupText = `<h3> ${props.STATION}</h3><p>Adresse:${props.BEZIRK}</p>`;
            return popupText;
            
            })
        }.addTo(bikeStation)
    //bikeStation.addLayer(geojson); 
    )}*/


addGeojson(url);



