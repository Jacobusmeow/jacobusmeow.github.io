let myMap = L.map("mapdiv");
let markerGroup = L.featureGroup();

let myLayers = {
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1",/*" "maps2", "maps3",*/ "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmapoverlay : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", /*" "maps2", "maps3",*/ "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmaporthofoto30cm : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", /*" "maps2", "maps3",*/ "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    )/*
    aws : L.tileLayer(
        "https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/{z},{y},{z}.png", {
            subdomains : [], 
            attribution : "Datenquelle: '....'>..."
        }
    )


    */
};


myMap.addLayer(myLayers.geolandbasemap);


let myMapControl = L.control.layers({ 
  
    "Geolandbasemap" : myLayers.geolandbasemap,
 
    "Orthofoto 30cm" : myLayers.bmaporthofoto30cm,
},{
    "bmapoverlay" : myLayers.bmapoverlay, 
    "Wetterstationen" : markerGroup 
})
myMap.addControl(myMapControl); 
myMap.addLayer(markerGroup);
myMap.setView([47.267,11.383], 11); 

let myScale = L.control.scale({ 
  
    imperial : false, 
    metric : true, 
    maxWidth : 200, 
    position : "bottomleft", 
    //updateWhenIdle : true, 

}).addTo(myMap);




//Option 1 - funktioniert !

const gehrenspitze = [47.387131, 11.133717];
const hafelekar = [47.312079, 11.383623];
const hohemundepeak = [47.346295, 11.080385];
const hohemundewind = [47.346612, 11.083694];
const nassereithwanning = [47.336922, 10.862333];
const nassereithalm = [47.344376, 10.849554];
const puitegg = [47.394844, 11.152817];
const rauthütte = [47.345909, 11.104943];
const rosshüttewind = [47.342025, 11.227903];
const seegrube = [47.3063819943737, 11.3779335010812];
const dalfazkamm = [47.448514, 11.751511];
const erfurterhütte = [47.441861, 11.762127];
const agetwoad = [47.069889, 10.862306];
const brgrießkogelschnee = [47.0839527777778, 11.0273833333333];
const brgrießkogelwind = [47.1010555555556, 11.0230388888889];
const falkaunsalpe = [47.071488, 10.76282];
const fshüttehs = [47.099611, 11.15541667];
const fshütteklhorntal = [47.0960000187559, 11.1623888694066];
const lampsenspitzeschnee = [47.153491, 11.120722];
const lampsenspitzewind = [47.156075, 11.095642];
const roterschrofen = [47.04, 10.7181];
const schlickeralm = [47.154432, 11.303207];
const seirlöcherkogel = [47.0339, 10.8528];
const lämmerbichlalm = [47.181266, 11.751717];
const rastkogelwind = [47.192132, 11.767481];
const sonntagsköpfl = [47.2750109996958, 11.7520860028295];
const sonntagsköpflwind = [47.271989, 11.755802];
const tuxerjochschnee = [47.093149, 11.648053];
const tuxerjochwind = [47.089717, 11.648987];
const wandspitzeschnee = [47.121858, 11.661969];
const wandspitzewind = [47.120752, 11.658062];

const markeroptionen = {
    title : "Wetterstation",
    opacity : 0.8,
};

//myMap.fitBounds(markerGroup.getBounds());

L.marker(gehrenspitze, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterinformationen Gehrenspitze </h3> </p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li></ul></P>")
    .openPopup();
L.marker(hafelekar, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterinformationen Hafelekar </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li></ul></p>")
    .openPopup();
L.marker(hohemundepeak, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterstation Hohemunde Gipfel</h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(hohemundewind, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Windmessstation Hohemunde</h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(nassereithwanning, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterstation Nassereith, Wanning </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(nassereithalm, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterstation Nassereith, Alm </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt= 'Bild mit Wetterinformationen'/><ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(puitegg, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterstation Puitegg</h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li></ul></P>")
    .openPopup();
L.marker(rauthütte, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterstation Rauthütte</h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(rosshüttewind, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3>Windmessstation Rosshütte</h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(seegrube, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterstation Seegrube</h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt= 'Bild mit Wetterinformationen'/><ul><li></li><li></li></ul></p>")
    .openPopup();
L.marker(dalfazkamm, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterstation Dalfazkamm </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(erfurterhütte, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterstation Erfurter Hütte </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(agetwoad, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterstation Agetwoad </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/agetwoad.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(brgrießkogelschnee, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Schneemessstation Breiter Grießgkogel </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(brgrießkogelwind, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Windmessstation Breiter Grießkogel </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(falkaunsalpe, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterstation Falkaunsalpe </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(fshüttehs, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterstation Franz-Senn-Hütte, Horntaler Spitzl </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(fshütteklhorntal, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Wetterstation Franz-Senn-Hütte, Horntal </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(lampsenspitzeschnee, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Schneemessstation Lampsenspitze </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(lampsenspitzewind, markeroptionen).addTo(markerGroup)
    .bindPopup("<p> <h3> Windmessstationstation Lampsenspitze </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(roterschrofen, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterstation Roter Schrofen </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(seirlöcherkogel, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterstation Seirlöcher Kogel </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seirloecherkogel.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(lämmerbichlalm, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterstation Lämmerbichl Alm </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(rastkogelwind, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Windmessstation Rastkogel </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(sonntagsköpfl, markeroptionen).addTo(markerGroup)
    .bindPopup("<p>Wetterstation Sonntagsköpfl <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(sonntagsköpflwind, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Windmessstation Sonntagsköpfl </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(tuxerjochschnee, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Schneemessstation Tuxer Joch </h3><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(tuxerjochwind, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Windmessstation Tuxer Joch </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(wandspitzeschnee, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Schneemessstation Wandspitze </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li></ul></P>")
    .openPopup();
L.marker(wandspitzewind, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Windmessstation Wandspitze </h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png' alt= 'Bild mit Wetterinformationen'/> <ul><li></li><li></li><ul></P>")
    .openPopup();

L.marker(schlickeralm, markeroptionen).addTo(markerGroup)
    .bindPopup("<p><h3>Wetterstation Schlicker Alm (1645m) und Sennjoch(2230)</h3> <img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png' alt= 'Bild mit Wetterinformationen'/><ul><li>Aktuelle Temp. (°C): 5,0</li><li><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png'/> </li> </ul></p><img style='width:400px'/>")
    .openPopup();

/*Option 2 - funktioniert noch nicht...
let awsdata = [
    {"lat":"[47.387131]","lng":"[11.133717]","name":"Gehrenspitze","temperatur":"0.6","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png"},
    {"lat":"47.312079","lng":"11.383623","name":"Hafelekar","temperatur":"1.6","datum":"2018-04-26T08:10:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png"},
    {"lat":"47.346295","lng":"11.080385","name":"Hohe Munde Gipfel","temperatur":"","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png"},
    {"lat":"47.346612","lng":"11.083694","name":"Hohe Munde Windstation","temperatur":"-4.1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png"},
    {"lat":"47.336922","lng":"10.862333","name":"Nassereith Wannig","temperatur":"-1.2","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png"},
    {"lat":"47.344376","lng":"10.849554","name":"Nassereither Alm","temperatur":"4","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png"},
    {"lat":"47.394844","lng":"11.152817","name":"Puitegg","temperatur":"5.3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png"},
    {"lat":"47.345909","lng":"11.104943","name":"Rauthhütte","temperatur":"11.7","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png"},
    {"lat":"47.342025","lng":"11.227903","name":"Rosshütte Windstation","temperatur":"4.1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png"},
    {"lat":"47.3063819943737","lng":"11.3779335010812","name":"Seegrube","temperatur":"3.1","datum":"2018-04-26T08:10:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png"},
    {"lat":"47.448514","lng":"11.751511","name":"Dalfazkamm","temperatur":"0.4","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png"},
    {"lat":"47.441861","lng":"11.762127","name":"Erfurterhütte","temperatur":"2.4","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png"},
    {"lat":"47.069889","lng":"10.862306","name":"Agetwoad","temperatur":"1.5","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/agetwoad.png"},
    {"lat":"47.0839527777778","lng":"11.0273833333333","name":"Breiter Grieskogel Schneestation","temperatur":"1.1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png"},
    {"lat":"47.1010555555556","lng":"11.0230388888889","name":"Breiter Grieskogel Windstation","temperatur":"-3.4","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png"},
    {"lat":"47.071488","lng":"10.76282","name":"Falkaunsalpe","temperatur":"2.2","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png"},
    {"lat":"47.099611","lng":"11.15541667","name":"Franz-Senn-Hütte Horntaler Spitzl","temperatur":"4.3","datum":"2018-04-25T20:40:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png"},
    {"lat":"47.0960000187559","lng":"11.1623888694066","name":"Franz-Senn-Hütte Kl Horntal","temperatur":"5.5","datum":"2018-04-25T20:40:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png"},
    {"lat":"47.153491","lng":"11.120722","name":"Lampsenspitze Schneestation","temperatur":"1.7","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png"},
    {"lat":"47.156075","lng":"11.095642","name":"Lampsenspitze Windstation","temperatur":"-0.8","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png"},
    {"lat":"47.04","lng":"10.7181","name":"Roter Schrofen","temperatur":"-1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png"},
    {"lat":"47.154432","lng":"11.303207","name":"Schlicker Alm","temperatur":"6.5","datum":"2018-04-26T07:50:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png"},
    {"lat":"47.0339","lng":"10.8528","name":"Seirlöcher Kogel","temperatur":"0","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seirloecherkogel.png"},
    {"lat":"47.181266","lng":"11.751717","name":"Lämmerbichlalm","temperatur":"3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png"},
    {"lat":"47.192132","lng":"11.767481","name":"Rastkogel Windstation","temperatur":"0.1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png"},
    {"lat":"47.2750109996958","lng":"11.7520860028295","name":"Sonntagsköpfl","temperatur":"1.2","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png"},
    {"lat":"47.271989","lng":"11.755802","name":"Sonntagsköpfl Windstation","temperatur":"3.3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png"},
    {"lat":"47.093149","lng":"11.648053","name":"Tuxerjoch Schneestation","temperatur":"6","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png"},
    {"lat":"47.089717","lng":"11.648987","name":"Tuxerjoch Windstation","temperatur":"1.5","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png"},
    {"lat":"47.121858","lng":"11.661969","name":"Wandspitze Schneestation","temperatur":"1.3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png"},
    {"lat":"47.120752","lng":"11.658062","name":"Wandspitze Windstation","temperatur":"-0.3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png"}
    ];
    





L.marker(awsdata, markeroptionen).addTo(markerGroup);
*/








