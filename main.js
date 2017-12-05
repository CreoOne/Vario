
var canvasLeft = document.getElementById("canvasLeft");
var contextLeft = canvasLeft.getContext("2d");

var canvasRight = document.getElementById("canvasRight");
var contextRight = canvasRight.getContext("2d");

var canvasDataHolder = function()
{
    this.size = [0, 0];
    this.middle = [0, 0];
};

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

var spatialDataHolder = function()
{
    this.acceleration = [0, 0, 0];
    this.orientation = [0, 0, 0];
};

var deviceOrientationHandler = function(e)
{
    var alpha = e.alpha > 180 ? -360 + e.alpha : e.alpha;
    spatialDataHolder.orientation = [alpha, e.beta, e.gamma];
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
};

var redrawHandle = window.setInterval(redraw, 10);
resizeHandler();
