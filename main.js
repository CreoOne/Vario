
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var CanvasDataHolder = function()
{
    this.size = new Vector2();
    this.middle = new Vector2();
};

var canvasDataHolder = new CanvasDataHolder();

var resizeHandler = function(e)
{
    canvasDataHolder.size = new Vector2(window.screen.width, window.screen.height);
    canvasDataHolder.middle = Vector2.div(canvasDataHolder.size, Vector2.fromScalar(2));

    canvas.width = canvasDataHolder.size.x;
    canvas.height = canvasDataHolder.size.y;
}

window.addEventListener("resize", resizeHandler, false);

var SpatialDataHolder = function()
{
    this.acceleration = new Vector3();
    this.rawOrientation = new Vector3();
    this.orientation = new Vector3();
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
    if(spatialDataHolder.rawOrientation.z < -30 && e.gamma > 30)
    {
        spatialDataHolder.rawOrientation.x -= spatialDataHolder.rawOrientation.x >= 180 ? 180 : -180;
    }

    else if(spatialDataHolder.rawOrientation.z > 30 && e.gamma < -30)
    {
        spatialDataHolder.rawOrientation.x += spatialDataHolder.rawOrientation.x >= 180 ? -180 : 180;
    }

    var move = new Vector3(calculateMove(spatialDataHolder.rawOrientation.x, e.alpha, 0, 360), calculateMove(spatialDataHolder.rawOrientation.y, e.beta, -180, 180), calculateMove(spatialDataHolder.rawOrientation.z, e.gamma, -90, 90));

    spatialDataHolder.rawOrientation = new Vector3(e.alpha, e.beta, e.gamma);
    spatialDataHolder.orientation = Vector3.add(spatialDataHolder.orientation, move);
};

window.addEventListener("deviceorientation", deviceOrientationHandler, false);

var deviceMotionHandler = function(e)
{
    spatialDataHolder.acceleration = new Vector3(e.acceleration.x, e.acceleration.y, e.acceleration.z);
};

window.addEventListener("devicemotion", deviceMotionHandler, false);

var redraw = function()
{
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasDataHolder.size.x, canvasDataHolder.size.y);

    var x = canvasDataHolder.middle.x + spatialDataHolder.orientation.x;
    var y = canvasDataHolder.middle.y - spatialDataHolder.orientation.z;

    context.fillStyle = "white";
    context.fillRect(x - 5, y - 5, 10, 10);

    context.font = "10px Arial";
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.fillText("r: "+Math.round(spatialDataHolder.rawOrientation.x)+" "+Math.round(spatialDataHolder.rawOrientation.y)+" "+Math.round(spatialDataHolder.rawOrientation.z), 10, 15);
    context.fillText("o: "+Math.round(spatialDataHolder.orientation.x)+" "+Math.round(spatialDataHolder.orientation.y)+" "+Math.round(spatialDataHolder.orientation.z), 10, 25);

    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);
//var redrawHandle = window.setInterval(redraw, 10);
resizeHandler();
