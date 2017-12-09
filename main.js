
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

var accelerator = new Accelerator();
window.addEventListener("devicemotion", function(e){ accelerator.handleMotionEvent(e); }, false);

var gyroscope = new Gyroscope();
window.addEventListener("deviceorientation", function(e){ gyroscope.handleOrientationEvent(e); }, false);

var timer = new Timer();

var redraw = function(t)
{
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasDataHolder.size.x, canvasDataHolder.size.y);
    
    var gx = canvasDataHolder.middle.x + gyroscope.orientation.x * canvasDataHolder.middle.x;
    var gy = canvasDataHolder.middle.y - gyroscope.orientation.y * canvasDataHolder.middle.y;
    
    context.lineCap = "butt";
    context.strokeStyle = "rgba(255, 255, 255, 0.4)";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(gx, gy, 8, 0, Math.PI * 2);
    context.stroke();

    var ax = canvasDataHolder.middle.x + accelerator.position.x;
    var ay = canvasDataHolder.middle.y - accelerator.position.y;

    context.lineCap = "butt";
    context.strokeStyle = "rgba(255, 0, 0, 0.4)";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(ax, ay, 8, 0, Math.PI * 2);
    context.stroke();
    
    context.font = "10px Arial";
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.fillText("fps: " + Math.round(timer.fps), 10, 15);
    context.fillText("s: " + canvasDataHolder.size.x + " " + canvasDataHolder.size.y, 10, 25);
    context.fillText("o: "+Math.round(gyroscope.orientation.x * 100)+" "+Math.round(gyroscope.orientation.y * 100)+" "+Math.round(gyroscope.orientation.z * 100), 10, 35);
    context.fillText("p: "+Math.round(accelerator.position.x)+" "+Math.round(accelerator.position.y)+" "+Math.round(accelerator.position.z), 10, 45);
    
    timer.tick();
    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);
resizeHandler();
