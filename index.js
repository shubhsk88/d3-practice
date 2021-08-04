import * as d3 from 'd3';
import data from './my_weather_data.json';

async function drawScatterPlot() {
  // define the accessor for x and y and then see the data through

  const xAccessor = (d) => d.dewPoint;
  const yAccessor = (d) => d.humidity;
  console.log(xAccessor(data[0]), yAccessor(data[0]));
}

// drawLineChart();

drawScatterPlot();
