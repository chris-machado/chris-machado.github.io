mapboxgl.accessToken = 'pk.eyJ1IjoiY21hY2hhZG8xMSIsImEiOiJjbDhnMDV3eXkwZDAzM3ZuaGJwd2szMXJlIn0.0Cne7g_lGUfAgU00_PUkDw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [-76.2170,37.0281],
    zoom: 10
});

map.on('load', () => {
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
            {
                'type': 'Feature',
                'properties': {
                    'id': 'Sewells Point',
                    'station_id':'8638610',
                    'description':
                    '<canvas id="myChart" width="600" height="400"></canvas>',
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-76.3287, 36.9427]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'id': 'Money Point',
                    'station_id': '8639348',
                    'description':
                    '<canvas id="myChart" width="600" height="400"></canvas>',
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-76.3019, 36.7782]
                    }
            },
            {
                'type': 'Feature',
                'properties': {
                    'id': 'Kiptopeke',
                    'station_id': '8632200',
                    'description':
                    '<canvas id="myChart" width="600" height="400"></canvas>',
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-75.9884, 37.1652]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'id':'Chesapeake Bay Bridge Tunnel',
                    'station_id': '8638901',
                    'description':
                    '<canvas id="myChart" width="600" height="400"></canvas>',
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-76.0833, 37.0329]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'id': 'Yorktown',
                    'station_id': '8637689',
                    'description':
                    '<canvas id="myChart" width="600" height="400"></canvas>',
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-76.4788, 37.2265]
                }
            }
        
    
        ]
    }
});
// Add a layer showing the places.
map.addLayer({
    'id': 'places',
    'type': 'circle',
    'source': 'places',
    'paint': {
        'circle-color': 'red',
        'circle-radius': 10,
        'circle-stroke-width': 2,
        'circle-stroke-color': 'black'
    }
});

// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false    
});


map.on('mouseover', 'places', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
    
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;
    const station_id = e.features[0].properties.station_id;
    
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    } 

    // Populate the popup and set its coordinates
    // based on the feature found.
    //popup_element = popup.setLngLat(coordinates).setHTML(description);
    popup_element = popup.setLngLat(coordinates).setHTML(description);
    
    popup_element.addTo(map);
    tides(station_id);
////////////////
    async function tides(station_id) {
        let url_str = "http://ec2-18-233-120-8.compute-1.amazonaws.com:8080/get?station=" + station_id;
        const response = await fetch(url_str);
        const obs = await response.json();
        const data = {};
            for (let t in obs) {
                let dt = t.slice(5);
                data[dt] = obs[t];
            } 
 
        console.log(data)

        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
            label: 'Water Level',
            data: data,
            // borderWidth: .2,
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: false
            }
            },
            spanGaps: true,
            showLine: true,
        }
        });
    }
});

map.on('click', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

});


  