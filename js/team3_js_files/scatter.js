// Static version for the demo site (no ES required).
// Original used $.es.Client to localhost:9200 for closest airport distances.
// Now loads from CSV so the scatter tab renders.

$(function(){
  // Use queue + d3.csv for consistency with other team3 viz
  queue()
    .defer(d3.csv, "../../data_files/scatter_airport_distances.csv")
    .await(function(error, rows) {
      if (error) {
        d3.select("body").append("div").text("Scatter data load failed: " + error);
        return;
      }
      var data = rows.map(function(d) {
        return {
          x: parseFloat(d.closest_MEDIUM_airport_distance || d.x),
          y: parseFloat(d.closest_LARGE_airport_distance || d.y)
        };
      }).filter(function(d){ return !isNaN(d.x) && !isNaN(d.y); });

      if (!data.length) {
        data = [{x:12.5,y:45.3},{x:8.2,y:22.1},{x:15,y:67.8},{x:3.1,y:18.9},{x:25.4,y:55}]; // fallback
      }

        var margin = { top: 20, right: 10, bottom: 30, left: 30 };
        width = 900 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var x = d3.scaleLinear()
              .range([0, width])
              .nice();

        var y = d3.scaleLinear()
            .range([height, 0]);

        var xAxis = d3.axisBottom(x).ticks(12),
            yAxis = d3.axisLeft(y).ticks(12 * height / width);

        var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
            idleTimeout,
            idleDelay = 350;

        var svg = d3.select("body").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", 0)
            .attr("y", 0);

        var xExtent = d3.extent(data, function (d) { return d.x; });
        var yExtent = d3.extent(data, function (d) { return d.y; });
        x.domain(d3.extent(data, function (d) { return d.x; })).nice();
        y.domain(d3.extent(data, function (d) { return d.y; })).nice();

        var scatter = svg.append("g")
             .attr("id", "scatterplot")
             .attr("clip-path", "url(#clip)");

        scatter.selectAll(".dot")
            .data(data)
          .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .attr("cx", function (d) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); })
            .attr("opacity", 0.5)
            .style("fill", "#4292c6");

        // x axis
        svg.append("g")
           .attr("class", "x axis")
           .attr('id', "axis--x")
           .attr("transform", "translate(0," + height + ")")
           .call(xAxis);

        svg.append("text")
         .style("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 8)
         .text("Medium Airport Distance");

        // y axis
        svg.append("g")
            .attr("class", "y axis")
            .attr('id', "axis--y")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "1em")
            .style("text-anchor", "end")
            .text("Large Airport Distance");

        scatter.append("g")
            .attr("class", "brush")
            .call(brush);

        function brushended() {

            var s = d3.event.selection;
            if (!s) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
                x.domain(d3.extent(data, function (d) { return d.x; })).nice();
                y.domain(d3.extent(data, function (d) { return d.y; })).nice();
            } else {

                x.domain([s[0][0], s[1][0]].map(x.invert, x));
                y.domain([s[1][1], s[0][1]].map(y.invert, y));
                scatter.select(".brush").call(brush.move, null);
            }
            zoom();
        }

        function idled() {
            idleTimeout = null;
        }

        function zoom() {

            var t = scatter.transition().duration(750);
            svg.select("#axis--x").transition(t).call(xAxis);
            svg.select("#axis--y").transition(t).call(yAxis);
            scatter.selectAll("circle").transition(t)
            .attr("cx", function (d) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); });
        }

      });  // close the queue .await callback for static scatter data

  })

})
