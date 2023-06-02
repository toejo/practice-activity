// A function to determine the marker size based on the population
function markerSize(population) {
  return Math.sqrt(population) * 50;
}

// An array that contains all the information needed to create city and state markers
// Population Data Source: U.S. 2020 Decennial Census
let locations = [
  {
    coordinates: [40.7128, -74.0059],
    state: {
      name: "New York State",
      population: 20201249
    },
    city: {
      name: "New York",
      population: 8804190
    }
  },
  {
    coordinates: [34.0522, -118.2437],
    state: {
      name: "California",
      population: 39538223
    },
    city: {
      name: "Lost Angeles",
      population: 3898747
    }
  },
  {
    coordinates: [41.8781, -87.6298],
    state: {
      name: "Illinois",
      population: 12812508
    },
    city: {
      name: "Chicago",
      population: 2746388
    }
  },
  {
    coordinates: [29.7604, -95.3698],
    state: {
      name: "Texas",
      population: 29145505
    },
    city: {
      name: "Houston",
      population: 2304580
    }
  },
  {
    coordinates: [41.2524, -95.9980],
    state: {
      name: "Nebraska",
      population: 1961504
    },
    city: {
      name: "Omaha",
      population: 486051
    }
  }
];

// Define arrays to hold the created city and state markers.
let cityMarkers = [];
let stateMarkers = [];

// Loop through locations, and create the city and state markers.
for (let i = 0; i < locations.length; i++) {
  // Set the marker radius for the state by passing the population to the markerSize() function.
  stateMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "blue",
      fillColor: "blue",
      radius: markerSize(locations[i].state.population)
    })
  );

  // Set the marker radius for the city by passing the population to the markerSize() function.
  cityMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(locations[i].city.population)
    })
  );
}

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


// Create two separate layer groups: one for the city markers and another for the state markers.
let stateLayer = L.layerGroup(stateMarkers);
let cityLayer = L.layerGroup(cityMarkers);

// Create a baseMaps object to contain the streetmap and the darkmap.
let baseMaps = {
  Street: street,
  Topography: topo
};

// Create an overlayMaps object to contain the "State Population" and "City Population" layers
let overlayMaps = {
  "City Population": cityLayer, 
  "State Population": stateLayer
  
};


// Modify the map so that it has the streetmap, states, and cities layers
let myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [street, cityLayer, stateLayer]
});

// Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
L.control.layers(baseMaps, overlayMaps).addTo(myMap);