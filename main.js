
"use strict";


var deviceOrientationHandler = function(o, e)
{
    console.log("device orientation", e);
};

window.addEventListener("deviceorientation", deviceOrientationHandler, false);

var deviceMotionHandler = function(o, e)
{
    console.log("device motion", e);
};

window.addEventListener("devicemotion", deviceMotionHandler, false);
