import * as d3 from 'd3';
import data from './my_weather_data.json';

async function drawHistogram() {
  // Create the accessor
  const xAccessor = (d) => d.humidity;
  const yAccessor = (d) => d.length;
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
  dms.boundedWidth = dms.width - dms.margin.left - dms.margin.right;

  // draw the canvas
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dms.width)
    .attr('height', dms.height)
    .attr('fill', 'green');
  const bound = wrapper
    .append('g')
    .style('transform', `translate(${dms.margin.left}px,${dms.margin.top}px)`);

  // draw the scale
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dms.boundedWidth])
    .nice();

  const binsGenerator = d3
    .bin()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(12);

  const bins = binsGenerator(data);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dms.boundedHeight, 0])
    .nice();

  console.log(yScale.domain());
}
drawHistogram();
