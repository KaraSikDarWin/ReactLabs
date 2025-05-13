import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = ({ data, oy, graphType }) => {
  const chartRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(parseFloat(svg.style("width")));
    setHeight(parseFloat(svg.style("height")));
  }, []);

  const margin = { top: 10, bottom: 60, left: 40, right: 10 };
  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  const allValues = data.flatMap(d => {
    const result = [];
    if (oy[0]) result.push(d.values[1]); // max
    if (oy[1]) result.push(d.values[0]); // min
    return result;
  });

  const [min, max] = d3.extent(allValues);

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map(d => d.labelX))
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
    svg.selectAll("*").remove();

    const xAxis = d3.axisBottom(scaleX);
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

    const yAxis = d3.axisLeft(scaleY);
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    // отрисовка данных
    oy.forEach((isChecked, indexOY) => {
      if (!isChecked) return;

      if (graphType === "dotted") {
        svg.selectAll(`.dot-${indexOY}`)
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
          .attr("cy", d => scaleY(d.values[indexOY]))
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("fill", indexOY === 1 ? "red" : "blue");
      }

      if (graphType === "histogram") {
        svg.selectAll(`.bar-${indexOY}`)
          .data(data)
          .enter()
          .append("rect")
          .attr("x", d => {
            const base = scaleX(d.labelX);
            return base + (indexOY === 0 ? 0 : scaleX.bandwidth() / 2);
          })
          .attr("y", d => scaleY(d.values[indexOY]))
          .attr("width", scaleX.bandwidth() / (oy.filter(Boolean).length))
          .attr("height", d => boundsHeight - scaleY(d.values[indexOY]))
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("fill", indexOY === 1 ? "red" : "blue");
      }
    });
  }, [scaleX, scaleY, data, oy, graphType]);

  return <svg ref={chartRef} width="100%" height="400px"></svg>;
};

export default ChartDraw;
