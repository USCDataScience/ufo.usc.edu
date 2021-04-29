d3.csv("../../data/team4/time_urgency_for_d3.csv").then(function(data) {
    console.log(data);
    var series = d3.stack().keys(data.columns.slice(1))(data).map(d => (d.forEach(v => v.key = d.key), d));
    console.log(series);
    console.log(series.length);
    
    var margin = {top: 10, right: 10, bottom: 10, left: 10};

    var x = d3.scaleBand()
    .domain(data.map(d => d.Time))
    .range([margin.left, width - margin.right])
    .padding(0.1);


    var y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top]);


    var color = d3.scaleOrdinal(d3.schemeCategory10);
    // .domain(series.map(d => d.key))
    // .range(d3.schemeSpectral[series.length])
    // .unknown("#ccc");
   


    var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove());


    var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove());

    var formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en");


    var svg = d3.select("#chart").append("svg")
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
        ${formatValue(d.data[d.key])}`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
            .attr("transform", function (d) {
                return "rotate(-90)";})
        // .style("text-anchor", "end")
        // .classed('rotation', true)
        // .attr('transform', (d,i)=>{
        //     return 'translate( '+xScale(i)+' , '+220+'),'+ 'rotate(45)';})
        //     .attr('x', 0)
        //     .attr('y', 0)
       

        

        svg.append("g")
        .call(xAxis);

        svg.append("g")
        .call(yAxis);



})


var width = 1500;
    
var height = 1200;
