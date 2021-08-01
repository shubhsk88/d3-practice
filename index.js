import * as d3 from 'd3';
import data from './my_weather_data.json';

async function drawLineChart() {
  // define the accessor to enab le the access to the point after loading the data
  const yAccessor = (d) => d.temperatureMax;
  const parseDate = d3.timeParse('%Y-%m-%d');
  const xAccessor = (d) => parseDate(d.date);
  console.log(xAccessor(data[0]));
  // Defining the dimenstion of the wrapper and bounds of the graph
  let dms = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  };
  dms.boundedWidth = dms.width - dms.margin.left - dms.margin.right;
  dms.boundedHeight = dms.height - dms.margin.top - dms.margin.bottom;
  console.log(dms);
}

drawLineChart();
