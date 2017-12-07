
var canvasLeft = document.getElementById("canvasLeft");
var contextLeft = canvasLeft.getContext("2d");

var canvasRight = document.getElementById("canvasRight");
var contextRight = canvasRight.getContext("2d");

var CanvasDataHolder = function()
{
    this.size = [0, 0];
    this.middle = [0, 0];
};

var canvasDataHolder = new CanvasDataHolder();

var resizeHandler = function(e)
{
    canvasDataHolder.size = [Math.floor(window.screen.width / 2), window.screen.height];
    canvasDataHolder.middle = [canvasDataHolder.size[0] / 2, canvasDataHolder.size[1] / 2];

    canvasLeft.width = canvasDataHolder.size[0];
    canvasLeft.height = canvasDataHolder.size[1];

    canvasRight.width = canvasDataHolder.size[0];
    canvasRight.height = canvasDataHolder.size[1];
}

window.addEventListener("resize", resizeHandler, false);

var SpatialDataHolder = function()
{
    this.acceleration = [0, 0, 0];
    this.rawOrientation = [0, 0, 0];
    this.orientation = [0, 0, 0];
};

var spatialDataHolder = new SpatialDataHolder();

var calculateMove = function(a, b, min, max)
{
    var forward = b - a;
    var backward = (a - min) + (b - max);

    return Math.abs(forward) < Math.abs(backward) ? forward : backward;
};

var deviceOrientationHandler = function(e)
{
    if(spatialDataHolder.rawOrientation[2] < -30 && e.gamma > 30)
    {
        spatialDataHolder.rawOrientation[0] -= spatialDataHolder.rawOrientation[0] >= 180 ? 180 : -180;
    }

    else if(spatialDataHolder.rawOrientation[2] > 30 && e.gamma < -30)
    {
        spatialDataHolder.rawOrientation[0] += spatialDataHolder.rawOrientation[0] >= 180 ? -180 : 180;
    }

    var move = [calculateMove(spatialDataHolder.rawOrientation[0], e.alpha, 0, 360), calculateMove(spatialDataHolder.rawOrientation[1], e.beta, -180, 180), calculateMove(spatialDataHolder.rawOrientation[2], e.gamma, -90, 90)];
    var len = Math.sqrt(Math.pow(move[0], 2), Math.pow(move[1], 2), Math.pow(move[2], 2));

    spatialDataHolder.rawOrientation = [e.alpha, e.beta, e.gamma];
    spatialDataHolder.orientation = [spatialDataHolder.orientation[0] + move[0], spatialDataHolder.orientation[1] + move[1], spatialDataHolder.orientation[2] + move[2]];
};

window.addEventListener("deviceorientation", deviceOrientationHandler, false);

var deviceMotionHandler = function(e)
{
    spatialDataHolder.acceleration = [e.acceleration.x, e.acceleration.y, e.acceleration.z];
};

window.addEventListener("devicemotion", deviceMotionHandler, false);

var redraw = function()
{
    contextLeft.fillStyle = "black";
    contextLeft.fillRect(0, 0, canvasDataHolder.size[0], canvasDataHolder.size[1]);

    var x = canvasDataHolder.middle[0] + spatialDataHolder.orientation[0];
    var y = canvasDataHolder.middle[1] - spatialDataHolder.orientation[2];

    contextLeft.fillStyle = "white";
    contextLeft.fillRect(x - 5, y - 5, 10, 10);

    contextLeft.font = "10px Arial";
    contextLeft.fillText("r: "+Math.round(spatialDataHolder.rawOrientation[0])+" "+Math.round(spatialDataHolder.rawOrientation[1])+" "+Math.round(spatialDataHolder.rawOrientation[2]), 10, 15);
    contextLeft.fillText("o: "+Math.round(spatialDataHolder.orientation[0])+" "+Math.round(spatialDataHolder.orientation[1])+" "+Math.round(spatialDataHolder.orientation[2]), 10, 25);
};

var redrawHandle = window.setInterval(redraw, 10);
resizeHandler();
