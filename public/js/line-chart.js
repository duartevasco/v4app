$(function () {
    var chart;
    $(document).ready(function() {

        var load_data = function() {
            $.getJSON("/graph/weeks.json", {
                    tags: "mount rainier",
                    tagmode: "any",
                    format: "json"
                },
                function(data) {
                    
                    
                    build_chart(data)
                    
//                    chart.series.data = [1,2,3,4,5,6,7]
//                    chart.redraw()
//                    pointInterval: 24 * 3600 * 1000,
//                    pointStart: Date.UTC(2010, 0, 01),
//                    data: [10,12,11,15,18,11,13,14,12,10,8,11,15]
                    
                    
//                    $.each(data.items, function(i,item){
//                    $("<img/>").attr("src", item.media.m).appendTo("#images");
//                    if ( i == 3 ) return false;
//                });
                });
        }
        
        var build_chart = function(data) {        
            chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    zoomType: 'xy',
                    spacingRight: 20
                },
                title: {
                    text: 'AV13 installations'
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' :
                        'Drag your finger over the plot to zoom in'
                },
                xAxis: {
                    type: 'datetime',
                    maxZoom: 14 * 24 * 3600000, // fourteen days
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        text: 'Active installations'
                    },
                    min: 0,
                    startOnTick: false,
                    showFirstLabel: false
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, 'rgba(2,0,0,0)']
                            ]
                        },
                        lineWidth: 1,
                        marker: {
                            enabled: false,
                            states: {
                                hover: {
                                    enabled: true,
                                    radius: 5
                                }
                            }
                        },
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        }
                    }
                },       
                series: [{
                    type: 'area',
                    name: 'xp installations of AV12',
                    pointInterval: 24 * 3600 * 1000,
                    pointStart: Date.UTC(2010, 0, 01),
                    data: data
                }]
            });
            return chart
        }
        
        load_data()

    });
    
});