
var Accelerator = function()
{
    this.motion = new Vector3();
    this.position = new Vector3();
};

Accelerator.prototype.handleMotionEvent = function(e)
{
    var strength = 5;

    this.motion = Vector3.div(Vector3.add(Vector3.mul(this.motion, Vector3.fromScalar(strength-1)), new Vector3(e.acceleration.y, e.acceleration.x, e.acceleration.z)), Vector3.fromScalar(strength + 0.2));
    this.position = Vector3.add(this.position, this.motion);
};