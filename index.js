import * as d3 from 'd3';
import data from './my_weather_data.json';

async function drawLineChart() {

    // define the accessor to enab le the access to the point after loading the data
  const yAccessor = (d) => d.temperatureMax;
  const parseDate = d3.timeParse('%Y-%m-%d');
  const xAccessor = (d) => parseDate(d.date);
  console.log(xAccessor(data[0]));
}

drawLineChart();
