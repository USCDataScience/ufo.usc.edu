$(function(){
  queue()
  .defer(d3.csv, '../../data_files/uk_word_reduced_freq.csv')
  .await(handleData);

function handleData(error, data){


    var color = d3.scale.category20();
    d3.layout.cloud().size([1000, 500])
            .words(data)
            .rotate(0)
            .fontSize(function(d) { return (d.count/16); })
            .on("end", draw)
            .start();
    function draw(words) {
        d3.select("body").append("svg")
                .attr("width", 1160)
                .attr("height", 1160)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(450,270)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) {
                  return (d.count/16) + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.word; });
    }
  }
});
