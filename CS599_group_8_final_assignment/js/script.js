
function resizeCards(){
    $('.row').each(function(){
        boxes = $(this).find('.ufo_question_card');
        maxHeight = Math.max.apply(
            Math, boxes.map(function() {
                return $(this).height();
            }).get());
        boxes.height(maxHeight);
    });
}

$(document).ready(function(){

    /* resize cards */
    resizeCards();

    /* click events to go to pages */
    $("#site_logo_img").click(function(){
        location.href='../index.html';
    });


    $("#pop_culture_dash").click(function(){
        location.href='visualizations/pop_culture_sci_fi_viz.html';
    });

    $("#severe_weather_dash").click(function(){
        location.href='visualizations/severe_weather_bar_chart_viz.html';
    });

    $("#tika_vision_bubble_dash").click(function(){
        location.href='visualizations/tika_vision_classname_bubble_chart_viz.html';
    });

    $("#sighting_density_dash").click(function(){
        location.href='visualizations/sighting_density_map_viz.html';
    });

    $("#date_circos_dash").click(function(){
        location.href='visualizations/sighting_date_circos_viz.html';
    });

    $("#description_wordcloud_dash").click(function(){
        location.href='visualizations/ufo_description_wordclouds_viz.html';
    });

    $("#ocr_w_tree_dash").click(function(){
        location.href='visualizations/ocr_field_recognition_weighted_tree.html';
    });

    $("#airport_radar_dash").click(function(){
        location.href='visualizations/airbase_radar.html';
    });

    $("#ner_pie_dash").click(function(){
        location.href='visualizations/NER_pie.html';
    });

    $("#duration_areas_dash").click(function(){
        location.href='visualizations/area_sighting_length_viz.html';
    });





    $(window).resize(function() {
        resizeCards();
    });




});