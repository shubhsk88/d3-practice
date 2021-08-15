import * as d3 from 'd3';
import data from './my_weather_data.json';

async function drawHistogram() {
  // Create the accessor
  const xAccessor = (d) => d.humidity;
  const width = 600;

  // Define the dimensions 
  const dms = {
    width,
    height: width * 0.6,
    margin: {
      top: 30,
      bottom: 50,
      left: 50,
      right: 10,
    },
  };

  dms.boundedHeight = dms.height - dms.margin.bottom - dms.margin.top;
  dms.boundedWidth=dms.width-dms.margin.left-dms.margin.right
}

drawHistogram();
