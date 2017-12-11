
var Accelerator = function()
{
    this.motion = new Vector3();
    this.strength = 5;
};

Accelerator.prototype.handleMotionEvent = function(e)
{
    var input = new Vector3(e.acceleration.y, e.acceleration.x, e.acceleration.z);
    this.motion = Vector3.div(Vector3.add(Vector3.mul(this.motion, Vector3.fromScalar(this.strength-1)), input), Vector3.fromScalar(this.strength));
};