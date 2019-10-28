import React, {Component} from 'react';
import './App.css';
import StaticMap from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from 'deck.gl';
import renderLayers from './deckgl-layers.js';
import trees from './temp.json';

const INITIAL_VIEW_STATE = {
  longitude: -71,
  latitude: 42.36,
  zoom: 11,
  minZoom: 5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log(trees);
    return (
      <div className="App">
        <DeckGL
          layers={renderLayers({data: trees})}
          initialViewState={INITIAL_VIEW_STATE}
          controller
        >
          <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN} />
        </DeckGL>
      </div>
    );
  }
}

export default App;
