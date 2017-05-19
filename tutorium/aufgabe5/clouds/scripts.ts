/// <reference path="Cloud.ts" />
/// <reference path="Circle.ts" />

namespace cloud_animation {
    let layerCount: number = 20;
    let cloudsPerLayer: number = 5;
    let minCloudCircleCount: number = 5;
    let maxCloudCircleCount: number = 7;
    let minCircleOffsetX: number = 20;
    let maxCircleOffsetX: number = 60;
    let minCircleOffsetY: number = 10;
    let maxCircleOffsetY: number = 30;
    let minCircleRadius: number = 30;
    let maxCircleRadius: number = 80;
    let minRedChannel: number = 25;
    let maxRedChannel: number = 252;
    let minGreenChannel: number = 52;
    let maxGreenChannel: number = 255;
    let minBlueChannel: number = 65;
    let maxBlueChannel: number = 245;

    let context: CanvasRenderingContext2D;
    let clouds: Cloud[];


    window.onload = init;

    function init(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
        context = canvas.getContext("2d");
        clouds = createClouds();


        setTimeout(animate, 20);
    }

    function animate(): void {
        update();
        draw();

        setTimeout(animate, 20);
    }

    function update(): void {
        for (let i: number = 0; i < clouds.length; i++) {
            moveCloud(clouds[i]);
        }
    }

    function draw(): void {
        context.fillStyle = "#3E606F";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        for (let i: number = 0; i < clouds.length; i++) {
            drawCloud(clouds[i]);
        }
    }

    function createClouds(): Cloud[] {
        let temp: Cloud[] = [];

        for (let i: number = 0; i < layerCount; i++) {
            for (let j: number = 0; j < cloudsPerLayer; j++) {
                temp.push(createCloud(i));
            }
        }

        return temp;
    }

    function createCloud(_layer: number): Cloud {
        let x: number = random(0, context.canvas.width);
        let y: number = random(0, context.canvas.height);
        let circleCount: number = random(minCloudCircleCount, maxCloudCircleCount);

        let cloud: Cloud = {
            x: x,
            y: y,
            layer: _layer,
            circles: createCircles(circleCount)
        };

        return cloud;
    }

    function createCircles(_count: number): Circle[] {
        let temp: Circle[] = [];

        for (let i: number = 0; i < _count; i++) {
            temp.push(createCircle());
        }

        return temp;
    }

    function createCircle(): Circle {
        return {
            offsetX: random(minCircleOffsetX, maxCircleOffsetX),
            offsetY: random(minCircleOffsetY, maxCircleOffsetY),
            radius: random(minCircleRadius, maxCircleRadius)
        };
    }

    function drawCloud(_cloud: Cloud): void {
        for (let i: number = 0; i < _cloud.circles.length; i++) {
            let x: number = _cloud.x + _cloud.circles[i].offsetX;
            let y: number = _cloud.y + _cloud.circles[i].offsetY;
            drawCircle(x, y, _cloud.circles[i].radius, getColor(_cloud.layer));
        }
    }

    function drawCircle(_x: number, _y: number, _radius: number, _color: string): void {
        context.beginPath();
        context.arc(_x, _y, _radius, 0 , 2 * Math.PI);
        context.closePath();
        context.fillStyle = _color;
        context.fill();
    }

    function getColor(_layer: number): string {
        let red: number = ((maxRedChannel - minRedChannel) / (layerCount - 1)) * _layer + minRedChannel;
        let green: number = ((maxGreenChannel - minGreenChannel) / (layerCount - 1)) * _layer + minGreenChannel;
        let blue: number = ((maxBlueChannel - minBlueChannel) / (layerCount - 1)) * _layer + minBlueChannel;

        return "rgb(" + red + "," + green + "," + blue + ")";
    }

    function moveCloud(_cloud: Cloud): void {
        _cloud.x += (_cloud.layer + 1) / 7;

        if (checkBoundaries(_cloud)) {
            _cloud.x = -50;
        }
    }

    function checkBoundaries(_cloud: Cloud): boolean {
        let temp: number = context.canvas.width;
        for (let i: number = 0; i < _cloud.circles.length; i++) {
            let leftPosition: number = _cloud.x + _cloud.circles[i].offsetX - _cloud.circles[i].radius;
            temp = (temp > leftPosition) ? temp = leftPosition : temp;
        }

        return temp == context.canvas.width;
    }

    function random(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }
}