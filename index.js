import * as d3 from 'd3';
import data from './my_weather_data.json';

async function drawScatterPlot() {
  //define accessor
  const xAccessor = (d) => d.dewPoint;
  const yAccessor = (d) => d.humidity;

  //decide the dimension
  const width = d3.min([window.innerHeight * 0.9, window.innerWidth * 0.9]);
  const dms = {
    width,
    height: width,
    margin: {
      left: 40,
      right: 10,
      top: 10,
      bottom: 40,
    },
  };
  dms.boundedWidth = dms.width - dms.margin.left - dms.margin.right;
  dms.boundedHeight = dms.height - dms.margin.top - dms.margin.bottom;

  // Draw Canvas
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dms.width)
    .attr('height', dms.height)
    .style('border', '1px solid green');
  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dms.margin.left}px,${dms.margin.bottom}px)`
    );

  // Draw the scales

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dms.boundedWidth]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dms.boundedHeight, 0]);

  // Draw the graph

  // data.forEach((dots) => {
  //   bounds
  //     .append("circle")
  //     .attr("cx", xScale(xAccessor(dots)))
  //     .attr("cy", yScale(yAccessor(dots)))
  //     .attr("r", 5);
  // });

  // .enter()
  //   .append("circle")
  //   .merge(dots)=>join('circle')
  const dots = bounds.selectAll('circle').data(data);
  dots
    .join('circle')
    .attr('r', 5)
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)));
  console.log(dots);
}

drawScatterPlot();
