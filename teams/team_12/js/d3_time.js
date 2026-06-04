d3.json("../data/timeMonths.json", function(data){
        var new_data = [];
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                var temp_data = [];
                for (var month in data[item]) {
                    if (data[item].hasOwnProperty(month)) {
                        temp_data.push({label: month, value: +data[item][month]});
                    }
                }
                new_data.push(temp_data);
            }
        }

    d3.selectAll("select").on("change", selectDataset);

    var margin = {top: (parseInt(d3.select('#time-graph').style('height'), 10)/10), right: (parseInt(d3.select('#time-graph').style('width'), 10)/20), bottom: (parseInt(d3.select('#time-graph').style('height'), 10)/10), left: (parseInt(d3.select('#time-graph').style('width'), 10)/20)},
            width = parseInt(d3.select('#time-graph').style('width'), 10) - margin.left - margin.right,
            height = parseInt(d3.select('#time-graph').style('height'), 10) - margin.top - margin.bottom;

    var div = d3.select("body").append("div").attr("class", "toolTip");

    var formatPercent = d3.format("");

    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .2, 0.5);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

    var svg = d3.select("#time-graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // initial x axis placeholder (replaced in change)
    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")");

    // bg rect for dark theme
    d3.select("#time-graph svg").insert("rect", "g")
        .attr("x", 0).attr("y", 0)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("fill", "#111");

    change(new_data[23]);

    function selectDataset()
    {
        var value = this.value;
        var idx = (value === "total") ? 23 : (parseInt(value, 10) - 1);
        if (idx < 0 || idx >= new_data.length) idx = 23;
        change(new_data[idx]);
    }

    function styleAxes() {
        svg.selectAll(".axis text").attr("fill", "#fff");
        svg.selectAll(".axis path, .axis line").attr("stroke", "#ccc");
        svg.selectAll(".y.axis text").attr("fill", "#fff");
    }

    function change(dataset) {

        x.domain(dataset.map(function(d) { return d.label; }));
        y.domain([0, d3.max(dataset, function(d) { return d.value; })]);

        svg.select(".y.axis").remove();
        svg.select(".x.axis").remove();

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .attr("fill", "#fff")
                .text("UFO Sighting Counts");

        styleAxes();

        var bar = svg.selectAll(".bar")
                .data(dataset, function(d) { return d.label; });
        // new data:
        bar.enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.label); })
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .attr("width", x.rangeBand());

        bar
                .on("mousemove", function(d){
                    div.style("left", d3.event.pageX+10+"px");
                    div.style("top", d3.event.pageY-25+"px");
                    div.style("display", "inline-block");
                    div.html((d.label)+"<br>"+(d.value)+"");
                });
        bar
                .on("mouseout", function(d){
                    div.style("display", "none");
                });

        // removed data:
        bar.exit().remove();
        // updated data:
        bar
                .transition()
                .duration(750)
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); });

        styleAxes();
    };
});