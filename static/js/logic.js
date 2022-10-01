// IMPORT DATA & SET-UP MAP
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Create the map object
var myMap = L.map("map", {
    center: [28.304381, -196.526448],
    zoom: 2.5
  });
  
  // Adding the tile layer for Open Street Map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Definite URL variable of geoJSON link
  var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson?";
  
  // CREATE FUNCTIONS TO CALL LATER
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  // Create a function for the radius of markers related to magnitude
  function calculateRadius (magnitude) {
    return magnitude * 3
  }
  
  // Create a function for coloring the markers according to depth
  function colorMarker (depth) {
    if (depth > 90 ) {
      return "#ea2c2c"
    }
    if (depth > 70) {
      return "	#ea822c"
    }
    if (depth > 50) {
      return "	#ee9c00"
    }
    if (depth > 30) {
      return "	#eecc00"
    }
    if (depth > 10) {
      return "	#d4ee00"
    }
    else {
      return "#98ee00"
    }
  }
  
  // IMPORT & VISUALIZE DATA
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  // Call in the data and visualize on map
  d3.json(baseURL).then(function (data) {
    L.geoJSON(data, {
      pointToLayer: function (feature, latLng) {
        return L.circleMarker(latLng)
        
      },
  
      //Bind Popups to each feature
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Magnitude: " + feature.properties.mag +  "</p><p>Depth: " + feature.geometry.coordinates[2] );
      },
      
      // Style markers
      style: function (feature, layer) {
        return {
          radius: calculateRadius(feature.properties.mag),
          opacity: 0,
          fillOpacity: .75, 
          color: colorMarker(feature.geometry.coordinates[2])
        }
      }
  
    }).addTo(myMap);
  
  })
  
  // CREATE THE LEGEND
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  // Create a legend control object.
  // Completed this code with assistance from my tutor, Ryan.
  var legend = L.control({
    position: "bottomright"
  });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [-10, 10, 30, 50, 70, 90];
    var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"];
    // Loop through our intervals and generate a label with a colored square for each interval.
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += "<div class = 'color-text-combo'><i style='background: "
        + colors[i]
        + "'></i> "
        + grades[i]
        + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "</div><br>" : "+");
    }
    return div;
  };
  // We add our legend to the map.
  legend.addTo(myMap);