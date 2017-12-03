
var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext("2d");

var canvasDataHolder = function()
{
    this.size = [0, 0];
    this.middle = [0, 0];
};

var resizeHandler = function(e)
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasDataHolder.size = [canvas.clientWidth, canvas.clientHeight];
    canvasDataHolder.middle = [canvasDataHolder.size[0] / 2.0, canvasDataHolder.size[1] / 2.0];
}

window.addEventListener("resize", resizeHandler, false);

var spatialDataHolder = function()
{
    this.acceleration = [0, 0, 0];
    this.orientation = [0, 0, 0];
};

var deviceOrientationHandler = function(e)
{
    spatialDataHolder.orientation = [e.alpha, e.beta, e.gamma];
};

window.addEventListener("deviceorientation", deviceOrientationHandler, false);

var deviceMotionHandler = function(e)
{
    spatialDataHolder.acceleration = [e.acceleration.x, e.acceleration.y, e.acceleration.z];
};

window.addEventListener("devicemotion", deviceMotionHandler, false);

var redraw = function()
{
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasDataHolder.size[0], canvasDataHolder.size[1]);

    var x = canvasDataHolder.middle[0] + spatialDataHolder.orientation[0];
    var y = canvasDataHolder.middle[1] + spatialDataHolder.orientation[2];

    context.fillStyle = "white";
    context.fillRect(x - 5, y - 5, 10, 10);
};

var redrawHandle = window.setInterval(redraw, 100);
resizeHandler(this);
