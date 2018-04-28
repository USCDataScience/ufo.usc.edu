define(['scripts/d3.min', 'scripts/elasticsearch'], function (d3, es) {
    "use strict";
    
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace',
        connectionClass:"xhr",
        keepAlive:true
      });

    client.search({
        index: 'ufo_ds',
        size: 5,
        body: {

            // Aggregate on the results
            "aggs": {
                "shapes": {
                  "terms": {
                    "field": "shape.keyword",
                    "size": 5
                  }
                }
              }
        }

    }).then(function (resp) {
        console.log(resp);
        //D3 code goes here.
        var shapes = resp.aggregations.shapes.buckets;
        // d3 donut chart
        var width = 600,
            height = 300,
            radius = Math.min(width, height) / 2;
        var color = ['#131a00','#394d00','#608000', '#86b300', '#ace600', '#c6ff1a','#ccff33','#d2ff4d','#dfff80','#f2ffcc'];
        var arc = d3.arc()
            .outerRadius(radius - 60)
            .innerRadius(120);
        var pie = d3.pie()
            .sort(null)
            .value(function (d) { return d.doc_count; });
        var svg = d3.select("#donut-chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width/1.4 + "," + height/2 + ")");
        var g = svg.selectAll(".arc")
            .data(pie(shapes))
            .enter()
            .append("g")
            .attr("class", "arc");
        g.append("path")
            .attr("d", arc)
            .style("fill", function (d, i) { return color[i]; });
        g.append("text")
            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("fill", "black")
            .text(function (d) { return d.data.key; });
    });
});
