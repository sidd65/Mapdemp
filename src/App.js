import React, { useState } from 'react';
import './App.css';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import dummyData from '../src/tempData/data';
import RouteComponet from './componets/routeComponet'
function App() {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10
  });
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        // mapStyle="mapbox://styles/siddharthvaidya/ck8d3snzz2gy71inwoouscjzm"
        mapboxApiAccessToken="pk.eyJ1Ijoic2lkZGhhcnRodmFpZHlhIiwiYSI6ImNrOGQzY3E5djByb3AzZW1qZjVocTE1NDgifQ.fT4SdJA-bKajoF4Gv_0B6w"
        onViewportChange={setViewport}
      >
        <RouteComponet points={dummyData} />
        {
          dummyData.map((s)=>
          (
            <Marker key={s.id}
            latitude={ s.geometry.coordinates[1] }
            longitude={ s.geometry.coordinates[0] }
            >
              <button 
              onClick={(e)=>{
                e.preventDefault();
                setSelectedPark(s);
              }}
              className="marker-btn">
                <img src={require('./assets/images/marker.png')} alt="marker icon"></img>
              </button>
            </Marker>
          ))
        }
        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <p>{selectedPark.description}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
