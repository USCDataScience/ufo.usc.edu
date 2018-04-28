d3.select("input[value=\"total\"]").property("checked", true);
    d3.json("../data/timeMonths.json", function(data){
        //console.log(data);
        new_data = []
        for (item in data)
        {
            temp_data = []
            //console.log(data[item]);
            for(month in data[item])
            {
                val = {label:month,value:+data[item][month]}
                temp_data.push(val);
            }
            new_data.push(temp_data);
        }
        //console.log(new_data)
        
    
    //     datasetOption3 = [
    //         {label: "OCT", value: 61},
    //         {label: "AUG", value: 54},
    //         {label: "MAR", value: 42},
    //         {label: "APR", value: 65},
    //         {label: "SEP", value: 38},
    //         {label: "MAY", value: 58},
    //         {label: "JAN", value: 7},
    //         {label: "JUN", value: 35},
    //         {label: "JUL", value: 57},
    //         {label: "FEB", value: 24},
    //         {label: "NOV", value: 5},
    //         {label: "DEC", value: 3} ]
    // datasetTotal = [
    //     {label:"Category 1", value:19},
    //     {label:"Category 2", value:5},
    //     {label:"Category 3", value:13},
    //     {label:"Category 4", value:17},
    //     {label:"Category 5", value:19},
    //     {label:"Category 6", value:27}
    // ];

    // datasetOption1 = [
    //     {label:"Category 1", value:22},
    //     {label:"Category 2", value:33},
    //     {label:"Category 3", value:4},
    //     {label:"Category 4", value:15},
    //     {label:"Category 5", value:36},
    //     {label:"Category 6", value:0}
    // ];

    // datasetOption2 = [
    //     {label:"Category 1", value:10},
    //     {label:"Category 2", value:20},
    //     {label:"Category 3", value:30},
    //     {label:"Category 4", value:5},
    //     {label:"Category 5", value:12},
    //     {label:"Category 6", value:23}
    // ];

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

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    change(new_data[23]);

    function selectDataset()
    {
        var value = this.value;
        switch(value) {
            case "total":
                change(new_data[23]);
                break;
            case "1":
                change(new_data[0]);
                break;
            case "2":
                change(new_data[1]);
                break;
            case "3":
                change(new_data[2]);
                break;
            case "4":
                change(new_data[3]);
                break;
            case "5":
                change(new_data[4]);
                break;
            case "6":
                change(new_data[5]);
                break;
            case "7":
                change(new_data[6]);
                break;
            case "8":
                change(new_data[7]);
                break;
            case "9":
                change(new_data[8]);
                break;
            case "10":
                change(new_data[9]);
                break;
            case "11":
                change(new_data[10]);
                break;
            case "12":
                change(new_data[11]);
                break;
            case "13":
                change(new_data[12]);
                break;
            case "14":
                change(new_data[13]);
                break;
            case "15":
                change(new_data[14]);
                break;
            case "16":
                change(new_data[15]);
                break;
            case "17":
                change(new_data[16]);
                break;
            case "18":
                change(new_data[17]);
                break;
            case "19":
                change(new_data[18]);
                break;
            case "20":
                change(new_data[19]);
                break;
            case "21":
                change(new_data[20]);
                break;
            case "22":
                change(new_data[21]);
                break;
            case "23":
                change(new_data[22]);
                break;
            default:
                change(new_data[23]);
                break
        }
    }
    function change(dataset) {

        x.domain(dataset.map(function(d) { return d.label; }));
        y.domain([0, d3.max(dataset, function(d) { return d.value; })]);

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                ;

        svg.select(".y.axis").remove();
        svg.select(".x.axis").remove();

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("UFO Sighting Counts");

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
    };
});