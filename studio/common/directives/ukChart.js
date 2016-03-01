'use strict';

var d3 = require('d3');
var topojson = require('topojson');
var $ = require('jquery');

var ukChart = function () {

    var width = undefined;
    var height = undefined;

    var el = undefined;
    var parent = undefined;
    var scope = undefined;

    var uk, g, path, svg, projection;

    var init = function () {

        projection = d3.geo.albers()
            .center([-2.3, 53.5])
            .rotate([4.4, 0])
            .parallels([50, 60])
            .scale(800 * 3)
            .translate([width / 4, height / 3]);

        path = d3.geo.path()
            .projection(projection);


        scope.$watch('outline', function (data) {
            uk = data;
            drawOutline();
        });
    };

    var resize = function () {
        if (parent) {
            width = parent.width();
            height = parent.width();
            drawOutline();
        }
    };

    var drawOutline = function () {

        if (!uk) {
            return;
        }

        if (svg) {
            svg.remove();
        }

        svg = d3.select(el[0]).append("svg")
            .attr("width", width)
            .attr("height", height);

        g = svg.append("g");

        g.append("g")
            .attr("id", "outline")
            .selectAll(".subunit")
            .data(topojson.feature(uk, uk.objects.subunits).features)
            .enter().append("path")
            .attr("class", function (d) {
                return "subunit " + d.id;
            })
            .attr("d", path);

        g.append("path")
            .datum(topojson.mesh(uk, uk.objects.subunits, function (a, b) {
                return a !== b && a.id !== "IRL";
            }))
            .attr("d", path)
            .attr("class", "subunit-boundary");

        g.append("path")
            .datum(topojson.mesh(uk, uk.objects.subunits, function (a, b) {
                return a === b && a.id === "IRL";
            }))
            .attr("d", path)
            .attr("class", "subunit-boundary IRL");

        g.selectAll(".subunit-label")
            .data(topojson.feature(uk, uk.objects.subunits).features)
            .enter().append("text")
            .attr("class", function (d) {
                return "subunit-label " + d.id;
            })
            .attr("transform", function (d) {
                return "translate(" + path.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .text(function (d) {
                return d.properties.name;
            });
    };

    function link($scope, element) {

        el = element;
        parent = $(el).parent();
        scope = $scope;

        resize();

        init();

        window.addEventListener('resize', function () {
            resize();
        })

    }

    return {
        link: link,
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