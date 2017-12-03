
var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext("2d");

var resizeHandler = function(e)
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeHandler, false);

var acc = [100, 0, 0];
var gyr = [0, 0, 0];

var deviceOrientationHandler = function(e)
{
    if(!e) return;

    gyr = [e.alpha, e.beta, e.gamma];
};

window.addEventListener("deviceorientation", deviceOrientationHandler, false);

var deviceMotionHandler = function(e)
{
    if(!e) return;

    acc = [e.acceleration.x, e.acceleration.y, e.acceleration.z];
};

window.addEventListener("devicemotion", deviceMotionHandler, false);


var index = 0;

var redraw = function()
{
    var size = [canvas.clientWidth, canvas.clientHeight];
    var middle = [size[0] / 2.0, size[1] / 2.0];
    
    context.fillStyle = "black";
    context.fillRect(0, 0, size[0], size[1]);

    index += 0.01;
    context.strokeStyle = "white";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(middle[0], middle[1]);
    context.lineTo(middle[0] + gyr[0] * 100, middle[1] + gyr[1] * 100);
    context.closePath();
    context.stroke();
};

var redrawHandle = window.setInterval(redraw, 100);
resizeHandler(this);
