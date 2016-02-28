'use strict';

var d3 = require('d3');
var topojson = require('topojson');

var ukChart = function () {
    function link(scope, el) {

        var width = 400,
            height = 400,
            centered;

        var projection = d3.geo.albers()
            .center([-2, 55.4])
            .rotate([4.4, 0])
            .parallels([50, 60])
            .scale(800 * 5)
            .translate([width / 4, height / 4]);

        var path = d3.geo.path()
            .projection(projection);


        var svg = d3.select(el[0]).append("svg")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g");

        scope.$watch('outline', function(uk){
            if (!uk) { return; }

            g.append("g")
                .attr("id", "outline")
                .selectAll(".subunit")
                .data(topojson.feature(uk, uk.objects.subunits).features)
                .enter().append("path")
                .attr("class", function(d) { return "subunit " + d.id; })
                .attr("d", path);

            g.append("path")
                .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
                .attr("d", path)
                .attr("class", "subunit-boundary");

            g.append("path")
                .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
                .attr("d", path)
                .attr("class", "subunit-boundary IRL");
            g.selectAll(".subunit-label")
                .data(topojson.feature(uk, uk.objects.subunits).features)
                .enter().append("text")
                .attr("class", function(d) { return "subunit-label " + d.id; })
                .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .text(function(d) { return d.properties.name; });
        });

    }
    return {
        link:link,
        restrict: 'E',
        scope: {
            outline: '=',
            data: '=',
            boundaries: '=',
            blogEntry: '=',
            ladBoundaries: '='
        }
    }
};

ukChart.$inject = [];
module.exports = ukChart;