import React, { useState, Component } from 'react';
import './App.css';
import ReactMapGL, { Marker, Popup, Layer, Source } from 'react-map-gl';
import dummyData from '../src/tempData/data';
import geoJson from '../src/tempData/geojson';

import RouteComponet from './componets/routeComponet'
const geojson = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', 
    geometry: { 
      type: 'Point', 
      coordinates: [-75.3372987731628, 45.383321536272049],
      coordinates: [-75.3372987731698, 45.383321536272099],
    } 
  }
  ]
};
// const [viewport, setViewport] = useState({
//   width: window.innerWidth,
//   height: window.innerHeight,
//   latitude: 45.4211,
//   longitude: -75.6903,
//   zoom: 10
// });
let viewport = {
  width: window.innerWidth,
  height: window.innerHeight,
  latitude: 45.662009,
  longitude: -121.900858,
  zoom: 10
}
const parkLayer = {
  id: 'landuse_park',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park']
};
// const [selectedPark, setSelectedPark] = useState(null);
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPark: null,
      viewport: viewport
    }
  }

  // componentDidMount = () => {
  //   const map = this.reactMap.getMap();
  //   map.on('load', () => {
  //     //add the GeoJSON layer here
  //     alert('s')
  //     map.addLayer(geojson)
  //   })
  // }

  setViewport = ({ latitude, longitude, zoom, height, width }) => {
    viewport = {
      width: width,
      height: height,
      latitude: latitude,
      longitude: longitude,
      zoom: zoom
    }
    this.setState({ viewport })
  }

  setSelectedPark = (park) => {
    this.setState({ selectedPark: park })
  }

  render() {
    return (
      <div className="App">
        <ReactMapGL
          {...viewport}
          // mapStyle="mapbox://styles/siddharthvaidya/ck8d3snzz2gy71inwoouscjzm"
          mapboxApiAccessToken="pk.eyJ1Ijoic2lkZGhhcnRodmFpZHlhIiwiYSI6ImNrOGQzY3E5djByb3AzZW1qZjVocTE1NDgifQ.fT4SdJA-bKajoF4Gv_0B6w"
          onViewportChange={(w) => this.setViewport(w)}
          ref={(reactMap) => this.reactMap = reactMap}
        >
          {/* <RouteComponet points={dummyData} /> */}
          {
            dummyData.map((s) =>
              (
                <Marker key={s.id}
                  latitude={s.geometry.coordinates[1]}
                  longitude={s.geometry.coordinates[0]}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setSelectedPark(s);
                    }}
                    className="marker-btn">
                    <img src={require('./assets/images/marker.png')} alt="marker icon"></img>
                  </button>
                </Marker>
              ))
          }
          {this.state.selectedPark ? (
            <Popup
              latitude={this.state.selectedPark.geometry.coordinates[1]}
              longitude={this.state.selectedPark.geometry.coordinates[0]}
              onClose={() => {
                this.setSelectedPark(null);
              }}
            >
              <div>
                <p>{this.state.selectedPark.description}</p>
              </div>
            </Popup>
          ) : null}
          <Source id="my-data" type="geojson" data={geoJson}>
          <Layer
            id="point"
            type="line"
            paint={{
              "line-color": 'red',
                "line-width": 10,
                "line-blur":4
            }}
            />
          </Source>
        </ReactMapGL>
      </div>
    )
  }
}

export default App;
