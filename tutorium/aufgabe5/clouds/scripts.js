/// <reference path="Cloud.ts" />
/// <reference path="Circle.ts" />
var cloud_animation;
(function (cloud_animation) {
    var layerCount = 20;
    var cloudsPerLayer = 5;
    var minCloudCircleCount = 5;
    var maxCloudCircleCount = 7;
    var minCircleOffsetX = 20;
    var maxCircleOffsetX = 60;
    var minCircleOffsetY = 10;
    var maxCircleOffsetY = 30;
    var minCircleRadius = 30;
    var maxCircleRadius = 80;
    var minRedChannel = 25;
    var maxRedChannel = 252;
    var minGreenChannel = 52;
    var maxGreenChannel = 255;
    var minBlueChannel = 65;
    var maxBlueChannel = 245;
    var context;
    var clouds;
    window.onload = init;
    function init() {
        var canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        clouds = createClouds();
        setTimeout(animate, 20);
    }
    function animate() {
        update();
        draw();
        setTimeout(animate, 20);
    }
    function update() {
        for (var i = 0; i < clouds.length; i++) {
            moveCloud(clouds[i]);
        }
    }
    function draw() {
        context.fillStyle = "#3E606F";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i = 0; i < clouds.length; i++) {
            drawCloud(clouds[i]);
        }
    }
    function createClouds() {
        var temp = [];
        for (var i = 0; i < layerCount; i++) {
            for (var j = 0; j < cloudsPerLayer; j++) {
                temp.push(createCloud(i));
            }
        }
        return temp;
    }
    function createCloud(_layer) {
        var x = random(0, context.canvas.width);
        var y = random(0, context.canvas.height);
        var circleCount = random(minCloudCircleCount, maxCloudCircleCount);
        var cloud = {
            x: x,
            y: y,
            layer: _layer,
            circles: createCircles(circleCount)
        };
        return cloud;
    }
    function createCircles(_count) {
        var temp = [];
        for (var i = 0; i < _count; i++) {
            temp.push(createCircle());
        }
        return temp;
    }
    function createCircle() {
        return {
            offsetX: random(minCircleOffsetX, maxCircleOffsetX),
            offsetY: random(minCircleOffsetY, maxCircleOffsetY),
            radius: random(minCircleRadius, maxCircleRadius)
        };
    }
    function drawCloud(_cloud) {
        for (var i = 0; i < _cloud.circles.length; i++) {
            var x_1 = _cloud.x + _cloud.circles[i].offsetX;
            var y_1 = _cloud.y + _cloud.circles[i].offsetY;
            drawCircle(x_1, y_1, _cloud.circles[i].radius, getColor(_cloud.layer));
        }
    }
    function drawCircle(_x, _y, _radius, _color) {
        context.beginPath();
        context.arc(_x, _y, _radius, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = _color;
        context.fill();
    }
    function getColor(_layer) {
        var red = ((maxRedChannel - minRedChannel) / (layerCount - 1)) * _layer + minRedChannel;
        var green = ((maxGreenChannel - minGreenChannel) / (layerCount - 1)) * _layer + minGreenChannel;
        var blue = ((maxBlueChannel - minBlueChannel) / (layerCount - 1)) * _layer + minBlueChannel;
        return "rgb(" + red + "," + green + "," + blue + ")";
    }
    function moveCloud(_cloud) {
        _cloud.x += (_cloud.layer + 1) / 7;
        if (checkBoundaries(_cloud)) {
            _cloud.x = -50;
        }
    }
    function checkBoundaries(_cloud) {
        var temp = context.canvas.width;
        for (var i = 0; i < _cloud.circles.length; i++) {
            var leftPosition = _cloud.x + _cloud.circles[i].offsetX - _cloud.circles[i].radius;
            temp = (temp > leftPosition) ? temp = leftPosition : temp;
        }
        return temp == context.canvas.width;
    }
    function random(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }
})(cloud_animation || (cloud_animation = {}));
//# sourceMappingURL=scripts.js.map