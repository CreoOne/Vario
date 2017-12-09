
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

var gyroscope = new Gyroscope();
window.addEventListener("deviceorientation", gyroscope.handleOrientationEvent, false);

var deviceMotionHandler = function(e)
{
    spatialDataHolder.acceleration = new Vector3(e.acceleration.x, e.acceleration.y, e.acceleration.z);
};

window.addEventListener("devicemotion", deviceMotionHandler, false);

var redraw = function()
{
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasDataHolder.size.x, canvasDataHolder.size.y);

    var x = canvasDataHolder.middle.x + gyroscope.orientation.x * canvasDataHolder.middle.x;
    var y = canvasDataHolder.middle.y - gyroscope.orientation.y * canvasDataHolder.middle.y;

    context.fillStyle = "white";
    context.fillRect(x - 5, y - 5, 10, 10);

    context.font = "10px Arial";
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.fillText("o: "+Math.round(gyroscope.orientation.x * 100)+" "+Math.round(gyroscope.orientation.y * 100)+" "+Math.round(gyroscope.orientation.z * 100), 10, 15);

    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);
resizeHandler();
