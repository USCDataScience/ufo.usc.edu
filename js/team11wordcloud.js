
    function getJSONData (url) {
         var xmlhttp=new XMLHttpRequest();

         try{
         xmlhttp.open("GET",url,false); 
         xmlhttp.setRequestHeader("Content-type", "application/json");
         
         xmlhttp.send(); 
         }
         catch(err){
              alert("Entered file does not exist");
              return "";
         }
         if(xmlhttp.status==404){
             alert("Entered file does not exist");
             return "";
         }
         jsonDoc=xmlhttp.responseText;
         // console.log(jsonDoc);
         return jsonDoc;
    }

    var cities = getJSONData("../data/team11wordcloudcities.json");
    var frequency_list = JSON.parse(cities);

    var description = getJSONData("../data/team11wordcloudocr.json");
    var frequency_list1 = JSON.parse(description);


    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#D0CFCF","#e8c9c9","#efa7a7","#f58484","#d882a0","#eaae6b","#efa350","#f3850c","#c74573","#ef6464","#9c4108","#9c4108"]
);

            var color1 = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
             .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

    

// if(d.freq>120) return 40; if(d.freq>100) return 30; 
//                 if(d.freq>80) return 20; if(d.freq>60) return 10; return 5;

    d3.layout.cloud().size([800, 500])
            .words(frequency_list)
            .rotate(function(d) { return Math.floor(Math.random() * Math.floor(30)); })
            .fontSize(function(d) { return d.freq+20; })
            .on("end", draw_cities)
            .start();

    d3.layout.cloud().size([1200, 600])
            .words(frequency_list1).padding(5)
            .rotate(0)//function(d) { return Math.floor(Math.random() * Math.floor(45)); })
            .text(function(d) { return d.text; })
            .fontSize(function(d) { return d.freq-80; })
            .on("end", draw_description)
            .start();

    function draw_description(words) {
        d3.select("#description").append("svg")
                .attr("width", 1200)
                .attr("height", 450)
                .attr("class", "wordcloud")
                .append("g")
                .attr("transform", "translate(500,200)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return (d.freq-140) + "px"; })
                .style("fill", function(d, i) { return color1(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }

   



    function draw_cities(words) {
        d3.select("#cities").append("svg")
                .attr("width", 800)
                .attr("height", 500)
                .attr("class", "wordcloud")
                .append("g")
                .attr("transform", "translate(360,300)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return (d.freq+10) + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
            }