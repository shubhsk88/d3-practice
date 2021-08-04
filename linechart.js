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
  // Add the wrapper from dom and add an svg and add the attr of dimension
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dms.width)
    .attr('height', dms.height);
  const bound = wrapper
    .append('g')
    .style('transform', `translate(${dms.margin.left}px,${dms.margin.top}px)`);
  //Create scales for x axis and y-axis

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dms.boundedHeight, 0]);

  const freezingTemperaturePlacement = yScale(32);
  const freezingTemperature = bound
    .append('rect')
    .attr('x', 0)
    .attr('width', dms.boundedWidth)
    .attr('y', freezingTemperaturePlacement)
    .attr('height', dms.boundedHeight - freezingTemperaturePlacement)
    .attr('fill', '#e0f3f3');

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dms.boundedWidth]);

  //Draw data
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));
  const line = bound
    .append('path')
    .attr('d', lineGenerator(data))
    .attr('fill', 'none')
    .attr('stroke', 'cornflowerblue')
    .attr('stroke-width', 2);

  //Draw peripherals

  const yAxisGenerator = d3.axisLeft().scale(yScale);
  const yAxis = bound.append('g').call(yAxisGenerator);
  const xAxisGenerator = d3.axisBottom().scale(xScale);
  const xAxis = bound
    .append('g')
    .style('transform', `translateY(${dms.boundedHeight}px)`)
    .call(xAxisGenerator);
}
