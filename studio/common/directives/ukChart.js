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

    var drag;

    var m0,
        o0;

    var init = function () {

        projection = d3.geo.albers()
            .center([-2.3, 53.5])
            .rotate([4.4, 0])
            .parallels([50, 60])
            .scale(800 * 3)
            .translate([width / 4, height / 3]);

        path = d3.geo.path()
            .projection(projection);

        drag = d3.behavior.drag()
            .on("dragstart", function() {
                var proj = projection.rotate();
                m0 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
                o0 = [-proj[0],-proj[1]];
            })
            .on("drag", function() {
                if (m0) {
                    var m1 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY],
                        o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
                    projection.rotate([-o1[0], -o1[1]]);
                }

                // Update the map
                path = d3.geo.path().projection(projection);
                d3.selectAll("path").attr("d", path);
            });



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

        g = svg.append("g")
            .call(drag);

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