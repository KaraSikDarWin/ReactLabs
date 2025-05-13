import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';

const ChartDraw = ({ data, oy, graphType }) => {
  const chartRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(parseFloat(svg.style('width')));
    setHeight(parseFloat(svg.style('height')));
  }, []);

  const margin = { top: 100, bottom: 100, left: 50, right: 50 };
  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  const allValues = data.flatMap((d) => d.values.map((v) => v.value));
  const [min, max] = d3.extent(allValues);

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.labelX))
      .range([0, boundsWidth])
      .padding(0.1);
  }, [data, boundsWidth]);


  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min * 0.85, max * 1.1])
      .range([boundsHeight, 0]);
  }, [boundsHeight, min, max]);


  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

  
    const xAxis = d3.axisBottom(scaleX);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    const yAxis = d3.axisLeft(scaleY).ticks(25);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    const pointsData = data.flatMap((d) =>
      d.values.map((v) => ({
        labelX: d.labelX,
        value: v.value,
        type: v.type,
      }))
    );

    if (graphType === 'dotted') {
      svg
        .selectAll('.dot')
        .data(pointsData)
        .enter()
        .append('circle')
        .attr('r', 4)
        .attr('cx', (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr('cy', (d) => scaleY(d.value))
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .style('fill', (d) => colorColumn(d.type));
    }

    if (graphType === 'histogram') {
      svg
        .selectAll('.bar')
        .data(pointsData)
        .enter()
        .append('rect')
        .attr('x', (d) => {
          const base = scaleX(d.labelX);
          const offset = {
            min: 0,
            max: scaleX.bandwidth() / 3,
            avg: (2 * scaleX.bandwidth()) / 3,
          }[d.type];
          return base + offset;
        })
        .attr('y', (d) => scaleY(d.value))
        .attr('width', scaleX.bandwidth() / oy.filter(Boolean).length)
        .attr('height', (d) => boundsHeight - scaleY(d.value))
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .style('fill', (d) => colorColumn(d.type));
    }

    if (graphType === 'line') {
      const dataByType = {};
      pointsData.forEach((point) => {
        if (!dataByType[point.type]) {
          dataByType[point.type] = [];
        }
        dataByType[point.type].push(point);
      });

      const lineGenerator = d3
        .line()
        .x((d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .y((d) => scaleY(d.value));

      Object.keys(dataByType).forEach((type) => {
        let sortedData = [...dataByType[type]].sort(
          (a, b) => scaleX(a.labelX) - scaleX(b.labelX)
        );
        svg
          .append('path')
          .datum(sortedData)
          .attr('d', lineGenerator)
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
          .style('stroke-width', '3')
          .style('stroke', colorColumn(type))
          .style('fill', 'none');
      });
    }
  }, [scaleX, scaleY, data, oy, graphType]);


  const colorColumn = (typeGraph) => {
    if (typeGraph === 'avg') return 'yellow';
    if (typeGraph === 'max') return 'red';
    if (typeGraph === 'min') return 'blue';
  };

  return <svg ref={chartRef} width="100%" height="400px"></svg>;
};

export default ChartDraw;