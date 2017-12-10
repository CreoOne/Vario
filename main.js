
var round = function(number, precision)
{
    var tenth = Math.pow(10, precision);
    return Math.round(number / tenth) * tenth;
};

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var Configuration = function()
{
    this.deviceDiagonal = 13.2;
    this.ocularsSpacing = 6.5;
    this.ocularsDistance = 4.5;
};

var configuration = new Configuration();
var timer = new Timer();

var renderer = new Renderer();
renderer.setCalibrationInfo(configuration.deviceDiagonal, configuration.ocularsSpacing, configuration.ocularsDistance);

var resizeHandler = function(e)
{
    var size = new Vector2(window.screen.width, window.screen.height);

    canvas.width = size.x;
    canvas.height = size.y;

    renderer.resize(size);
}

window.addEventListener("resize", resizeHandler, false);

var accelerator = new Accelerator();
window.addEventListener("devicemotion", function(e){ accelerator.handleMotionEvent(e); }, false);

var gyroscope = new Gyroscope();
window.addEventListener("deviceorientation", function(e){ gyroscope.handleOrientationEvent(e); }, false);

var redraw = function(t)
{
    context.fillStyle = "rgb(20, 20, 20)";
    context.fillRect(0, 0, renderer.size.x * 2, renderer.size.y);
    
    renderer.clear();

    var position = Vector2.add(renderer.half, Vector2.mul(new Vector2(-gyroscope.orientation.x, gyroscope.orientation.y), Vector2.fromScalar(400)));
    renderer.uiCircle(position, 8, "rgba(255, 255, 255, 0.3)", 2);

    var fontColor = "rgba(255, 255, 255, 0.7)";
    var textX = Math.max(-renderer.ocularShift + 10, 10);
    renderer.uiText("fps: " + Math.round(timer.fps), new Vector2(textX, 15), fontColor);
    renderer.uiText("s: " + renderer.size.x * 2 + " " + renderer.size.y, new Vector2(textX, 25), fontColor);
    renderer.uiText("o: " + round(gyroscope.orientation.x, -3) + " " + Math.round(gyroscope.orientation.y, -3), new Vector2(textX, 35), fontColor);

    renderer.render(context);
    timer.tick();
    window.requestAnimationFrame(redraw);
};

resizeHandler();
window.requestAnimationFrame(redraw);
