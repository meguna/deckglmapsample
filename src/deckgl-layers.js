import {ScatterplotLayer} from 'deck.gl';

const PARK_COLOR = [252, 107, 23];
const PUBLIC_COLOR = [116, 35, 170];

const getFillColor = d => {
  if (d.room_type !== 'Entire home/apt') {
    return [0,0,0,0]
  } else {
    let p = Math.log(d.price / 100);
    p = (p > 1) ? 1 : p;
    p = (p < 0) ? 0 : p;
    return interpolatedColor(p, PARK_COLOR, PUBLIC_COLOR);
  }
}

const getLineColor = d => {
  if (d.room_type === 'Entire home/apt') {
    return [0,0,0,0];
  } else {
    let p = Math.log(d.price / 100);
    p = (p > 1) ? 1 : p;
    p = (p < 0) ? 0 : p;
    return interpolatedColor(p, PARK_COLOR, PUBLIC_COLOR);
  }
}

const interpolatedColor = (offset, c1, c2) => {
  const r = c1[0] + offset * (c2[0] - c1[0]);
  const g = c1[1] + offset * (c2[1] - c1[1]);
  const b = c1[2] + offset * (c2[2] - c1[2]);
  return [r,g,b];
}

export default function renderLayers(props) {
  const { data, onHover, settings } = props;
  return [
      new ScatterplotLayer({
        id: 'scatterplot',
        getPosition: d => [Number(d.longitude), Number(d.latitude)], //-71,42
        getFillColor,
        getLineColor,
        getRadius: d => 20,
        stroked: true,
        opacity: 0.5,
        pickable: true,
        radiusMinPixels: 0.25,
        radiusMaxPixels: 30,
        lineWidthMinPixels: 0.5,
        data,
        ...settings
      }),
  ];
}