
var Gyroscope = function()
{
    this.previousRawOrientation = new Vector3();
    this.orientation = new Vector3();
};

Gyroscope.prototype.handleOrientationEvent = function(e)
{
    if(!e.alpha || !e.beta || !e.gamma)
        return;

    var raw = new Vector3(e.alpha / 180 - 1, e.gamma / 90, e.beta / 180);
    var move = Vector3.mod(Vector3.sub(this.previousRawOrientation, raw), Vector3.fromScalar(0.25));
    this.previousRawOrientation = raw;
    this.orientation = Vector3.add(this.orientation, move);
};
