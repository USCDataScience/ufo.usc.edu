import define1 from "../../js/team4/draw_legend.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["../../data/team4/time_urgency_for_d3.csv",new URL("../../data/team4/input",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Stacked Bar Chart

Number of attack emails in each hour of the day. For attack emails, there are two types: urgent emails and not urgent emails.`
)});
  main.variable(observer("key")).define("key", ["legend","color"], function(legend,color){return(
legend({color, title: "Urgency"})
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","series","color","x","y","formatValue","xAxis","yAxis"], function(d3,width,height,series,color,x,y,formatValue,xAxis,yAxis)
{
const svg = d3.create("svg")
.attr("viewBox", [0, 0, width, height]);

svg.append("g")
.selectAll("g")
.data(series)
.join("g")
.attr("fill", d => color(d.key))
.selectAll("rect")
.data(d => d)
.join("rect")
.attr("x", (d, i) => x(d.data.Time))
.attr("y", d => y(d[1]))
.attr("height", d => y(d[0]) - y(d[1]))
.attr("width", x.bandwidth())
.append("title")
.text(d => `${d.data.Time} ${d.key}
${formatValue(d.data[d.key])}`);

svg.append("g")
.call(xAxis);

svg.append("g")
.call(yAxis);

return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("../../data/team4/time_urgency_for_d3.csv").text(), (d, i, columns) => (d3.autoType(d), d.total = d3.sum(columns, c => d[c]), d))
)});
  main.variable(observer("series")).define("series", ["d3","data"], function(d3,data){return(
d3.stack()
.keys(data.columns.slice(2))
(data)
.map(d => (d.forEach(v => v.key = d.key), d))
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleBand()
.domain(data.map(d => d.Time))
.range([margin.left, width - margin.right])
.padding(0.1)
)});
  main.variable(observer("y")).define("y", ["d3","series","height","margin"], function(d3,series,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top])
)});
  main.variable(observer("scheme")).define("scheme", function(){return(
["#D53E4F",
"#F46D43",
"#FDAE61",
"#FEE08B",
"#FFFFBF",
"#E6F598",
"#ABDDA4",
"#66C2A5",
"#3288BD",
]
)});
  main.variable(observer("color")).define("color", ["d3","series","scheme"], function(d3,series,scheme){return(
d3.scaleOrdinal()
  .domain(series.map(d => d.key))
  .range(scheme)
  .unknown("#ccc")
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x"], function(height,margin,d3,x){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove())
)});
  main.variable(observer("formatValue")).define("formatValue", function(){return(
x => isNaN(x) ? "N/A" : x.toLocaleString("en")
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 10, right: 10, bottom: 20, left: 40}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  return main;
}
