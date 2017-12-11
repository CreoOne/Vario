
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
window.addEventListener("devicemotion", function(e)
{
    accelerator.strength = timer.fps * 2;
    accelerator.handleMotionEvent(e);
    renderer.motionShift = accelerator.motion;

}, false);

var gyroscope = new Gyroscope();
window.addEventListener("deviceorientation", function(e)
{
    gyroscope.handleOrientationEvent(e);
    renderer.rotation = gyroscope.orientation;

}, false);

var redraw = function(t)
{
    context.fillStyle = "rgb(10, 10, 10)";
    context.fillRect(0, 0, renderer.size.x * 2, renderer.size.y);
    
    renderer.clear();

    /*var orientation = Vector2.add(renderer.half, Vector2.mul(new Vector2(-gyroscope.orientation.x, gyroscope.orientation.y), Vector2.fromScalar(400)));
    renderer.uiCircle(orientation, 8, "rgba(255, 255, 255, 1.0)", 1);

    var position = Vector2.add(renderer.half, Vector2.mul(new Vector2(accelerator.motion.x, accelerator.motion.y), Vector2.fromScalar(100)));
    renderer.uiCircle(position, 8, "rgba(255, 255, 255, 1.0)", 1);*/

    var circlesColor = "rgba(255, 255, 255, 1.0)";
    renderer.propCircle(new Vector3(0, 0, 0.1), 10, circlesColor, 0.1);
    renderer.propCircle(new Vector3(0, 0, 0.2), 10, circlesColor, 0.1);
    renderer.propCircle(new Vector3(0, 0, 0.3), 10, circlesColor, 0.1);

    var fontColor = "rgba(255, 255, 255, 1.0)";
    var textX = Math.max(-renderer.ocularShift + 20, 20);
    renderer.uiText("fps: " + Math.round(timer.fps), new Vector2(textX, 25), fontColor);
    renderer.uiText("s: " + renderer.size.x * 2 + " " + renderer.size.y, new Vector2(textX, 35), fontColor);
    renderer.uiText("o: " + round(gyroscope.orientation.x, -3) + " " + round(gyroscope.orientation.y, -3), new Vector2(textX, 45), fontColor);
    renderer.uiText("a: " + round(accelerator.motion.x, -3) + " " + round(accelerator.motion.y, -3) + " " + round(accelerator.motion.z, -3), new Vector2(textX, 55), fontColor);

    renderer.render(context);
    timer.tick();
    window.requestAnimationFrame(redraw);
};

resizeHandler();
window.requestAnimationFrame(redraw);
