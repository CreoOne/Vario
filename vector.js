
var Vector2 = function(x, y)
{
    this.x = x || 0;
    this.y = y || 0;
};

Vector2.prototype.magnitudeSquared = function()
{
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
};

Vector2.prototype.magnitude = function()
{
    return Math.sqrt(this.magnitudeSquared());
};

Vector2.prototype.normalize = function()
{
    var magnitude = this.magnitude();
    return new Vector2(this.x / magnitude, this.y / magnitude);
};

Vector2.fromScalar = function(scalar)
{
    return new Vector2(scalar, scalar);
};

Vector2.closeEnough = function(q, r, precision)
{
    return Vector2.sub(q, r).magnitude() <= precision;
};

Vector2.add = function(q, r)
{
    return new Vector2(q.x + r.x, q.y + r.y);
};

Vector2.sub = function(q, r)
{
    return new Vector2(q.x - r.x, q.y - r.y);
};

Vector2.mul = function(q, r)
{
    return new Vector2(q.x * r.x, q.y * r.y);
};

Vector2.div = function(q, r)
{
    return new Vector2(q.x / r.x, q.y / r.y);
};

Vector2.dot = function(q, r)
{
    var m = Vector2.mul(q, r);
    return m.x + m.y;
};

Vector2.cross = function(v)
{
    return new Vector2(-v.y, v.x);
};

Vector2.lerp = function(q, r, position)
{
    return new Vector2(q.x + (r.x - q.x) * position, q.y + (r.y - q.y) * position);
};

var Vector3 = function(x, y, z)
{
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Vector3.prototype.magnitudeSquared = function()
{
    return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
};

Vector3.prototype.magnitude = function()
{
    return Math.sqrt(this.magnitudeSquared());
};

Vector3.prototype.normalize = function()
{
    var magnitude = this.magnitude();
    return new Vector3(this.x / magnitude, this.y / magnitude, this.z / magnitude);
};

Vector3.fromScalar = function(scalar)
{
    return new Vector3(scalar, scalar, scalar);
};

Vector3.closeEnough = function(q, r, precision)
{
    return Vector3.sub(q, r).magnitude() <= precision;
};

Vector3.add = function(q, r)
{
    return new Vector3(q.x + r.x, q.y + r.y, q.z + r.z);
};

Vector3.sub = function(q, r)
{
    return new Vector3(q.x - r.x, q.y - r.y, q.z - r.z);
};

Vector3.mul = function(q, r)
{
    return new Vector3(q.x * r.x, q.y * r.y, q.z * r.z);
};

Vector3.div = function(q, r)
{
    return new Vector3(q.x / r.x, q.y / r.y, q.z / r.z);
};

Vector3.dot = function(q, r)
{
    var m = Vector3.mul(q, r);
    return m.x + m.y + m.z;
};

Vector3.cross = function(q, r)
{
    return new Vector3(q.y * r.z - q.z * r.y, q.z * r.x - q.x * r.z, q.x * r.y - q.y * r.x);
};

Vector3.lerp = function(q, r, position)
{
    return new Vector3(q.x + (r.x - q.x) * position, q.y + (r.y - q.y) * position, q.z + (r.z - q.z) * position);
};