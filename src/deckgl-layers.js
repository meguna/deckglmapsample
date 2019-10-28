import {ScatterplotLayer} from 'deck.gl';

const PARK_COLOR = [134, 250, 118];
const PUBLIC_COLOR = [2, 187, 117];

export default function renderLayers(props) {
  const { data, onHover, settings } = props;
  return [
      new ScatterplotLayer({
        id: 'scatterplot',
        getPosition: d => [Number(d.X), Number(d.Y)],
        getFillColor: d => (d.TYPE === 'Tree in Park') ? PARK_COLOR : PUBLIC_COLOR,
        getRadius: d => 10,
        opacity: 0.5,
        pickable: true,
        radiusMinPixels: 0.25,
        radiusMaxPixels: 30,
        data,
        onHover,
        ...settings
      }),
  ];
}