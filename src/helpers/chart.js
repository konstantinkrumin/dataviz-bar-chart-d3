import * as d3 from "d3";

const render = (dataset, ref, width, height) => {
  const svg = d3.select(ref.current);

  const xValue = d => d[0];
  const yValue = d => d[1];
  const textValue = d => d[2];
  const margin = { top: 40, right: 60, bottom: 40, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const barWidth = innerWidth / dataset.length;

  const titleText = "United States GDP";
  const titleXAxisPos = innerWidth / 2;
  const titleYAxisPos = 10;

  const yAxisLabelText = "Gross Domestic Product";
  const yAxisLabelXPos = -100;
  const yAxisLabelYPos = 30;

  // Initiate a barchart
  const barchart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Append a title
  barchart
    .append("text")
    .attr("id", "title")
    .attr("x", titleXAxisPos)
    .attr("y", titleYAxisPos)
    .text(titleText);

  // Establish scale range
  const xScale = d3
    .scaleTime()
    .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, yValue)])
    .range([innerHeight, 0]);

  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.timeFormat("%Y"))
    .tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

  barchart
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis);

  const yAxisG = barchart
    .append("g")
    .attr("id", "y-axis")
    .call(yAxis);

  yAxisG
    .append("text")
    .attr("id", "yAxis-label")
    .attr("x", yAxisLabelXPos)
    .attr("y", yAxisLabelYPos)
    .attr("transform", "rotate(-90)")
    .text(yAxisLabelText);

  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  // Append bars to the barchart
  barchart
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * barWidth + 1.8)
    .attr("y", d => yScale(yValue(d)))
    .attr("width", barWidth)
    .attr("height", d => innerHeight - yScale(yValue(d)))
    .attr("class", "bar")
    .attr("data-date", d => xValue(d))
    .attr("data-gdp", d => yValue(d))
    .on("mouseover", (d, i) => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip
        .html(`${textValue(d)} </br>$${yValue(d)} Billion`)
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 150 + "px")
        .attr("data-date", xValue(d));
    })
    .on("mouseout", d => {
      tooltip
        .transition()
        .duration(500)
        .style("opacity", 0);
    });
};

export { render };
