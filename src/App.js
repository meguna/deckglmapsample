import React, {Component} from 'react';
import StaticMap from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from 'deck.gl';
import renderLayers from './deckgl-layers.js';
import ls from './ls.json';
import './styles.css';

const INITIAL_VIEW_STATE = {
  longitude: -71.08,
  latitude: 42.32,
  zoom: 12,
  minZoom: 5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
      clickLoc: null
    }
  }

  onDataClick = (info, event) => {
    this.setState({
      clicked: info['object'],
      clickLoc: event['center']
    })
  }

  resetClick = () => {
    this.setState({
      clicked: null,
      clickLoc: null
    })
  }

  render() {
    const { clicked, clickLoc } = this.state;
    return (
      <div className="App">
        <div className="legend">
          <h3>AirBnb listings in Boston</h3>
          <p>More expensive listings are colored purple, while 
          cheaper listings are colored orange. Listings for entire apartments
          are filled in and listings for private rooms are not.</p>
          <p>Click on a listing to view specific information about it.</p>
        </div>
        {(clicked != null) && (
          <div className="tooltip" style={{top: clickLoc['y'], left: clickLoc['x']}}>
            <p>{clicked.name}</p>
            <p>{clicked.room_type}</p>
            <p>{`$${clicked.price}`}</p>
          </div>
        )}
        <DeckGL
          layers={renderLayers({data: ls})}
          initialViewState={INITIAL_VIEW_STATE}
          onClick={this.onDataClick}
          onViewStateChange={this.resetClick}
          controller
        >
          <StaticMap 
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}

export default App;
