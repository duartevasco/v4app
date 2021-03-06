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
                    text: 'AV12 installations'
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
                        text: 'Unique installations that contacted our servers / week'
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
                    type: 'spline',
                    name: 'xp installations of AV12',
                    pointInterval: 24 * 3600 * 1000,
                    data: data
                }]
            });
            return chart
        }
        
        load_data()

    });
    
});
