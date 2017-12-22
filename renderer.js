
var Renderer = function()
{
    this.size = new Vector2();
    this.half = new Vector2();

    this.deviceDiagonal = 1;
    this.ocularSpacing = 0;
    this.ocularDistance = 0;
    this.ocularShift = 0;
    this.screenDiagonal = 1;

    this.leftView = document.createElement("canvas");
    this.leftContext = this.leftView.getContext("2d");

    this.rightView = document.createElement("canvas");
    this.rightContext = this.rightView.getContext("2d");

    this.motionShift = new Vector3();
    this.rotation = new Vector3();
};

Renderer.prototype.resize = function(size)
{
    var size = Vector2.div(size, new Vector2(2, 1));
    this.size = new Vector2(Math.floor(size.x), Math.floor(size.y));

    var half = Vector2.div(this.size, Vector2.fromScalar(2));
    this.half = new Vector2(Math.floor(half.x), Math.floor(half.y));

    this.screenDiagonal = new Vector2(size.x, size.y).magnitude();

    this.recalibrate();

    this.leftView.width = this.size.x;
    this.leftView.height = this.size.y;

    this.rightView.width = this.size.x;
    this.rightView.height = this.size.y;
};

Renderer.prototype.recalibrate = function()
{
    this.ocularShift = Math.floor(this.half.x - this.centimetersToPixels(this.ocularSpacing / 2));
};

Renderer.prototype.centimetersToPixels = function(cm)
{
    return (this.screenDiagonal / this.deviceDiagonal) * cm;
};

Renderer.prototype.pixelsToCentimeters = function(px)
{
    return (this.deviceDiagonal / this.screenDiagonal) * px;
};

Renderer.prototype.setCalibrationInfo = function(deviceDiagonal, ocularSpacing, ocularDistance)
{
    this.deviceDiagonal = deviceDiagonal;
    this.ocularSpacing = ocularSpacing;
    this.ocularDistance = ocularDistance;

    this.recalibrate();
};

Renderer.prototype.render = function(context)
{
    context.save();
    context.beginPath();
    context.rect(0, 0, this.size.x, this.size.y);
    context.clip();
    context.drawImage(this.leftView, -this.ocularShift, 0);
    context.restore();

    context.save();
    context.beginPath();
    context.rect(this.size.x, 0, this.size.x, this.size.y);
    context.clip();
    context.drawImage(this.rightView, this.size.x + this.ocularShift, 0);
    context.restore();

    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(this.size.x, 0);
    context.lineTo(this.size.x, this.size.y);
    context.stroke();
};

Renderer.prototype.clear = function()
{
    this.leftContext.fillStyle = "black";
    this.leftContext.fillRect(0, 0, this.size.x, this.size.y);

    this.rightContext.fillStyle = "black";
    this.rightContext.fillRect(0, 0, this.size.x, this.size.y);
};

Renderer.prototype.uiText = function(text, position, color, font)
{
    this.leftContext.font = font;
    this.leftContext.fillStyle = color;
    this.leftContext.fillText(text, position.x, position.y);

    this.rightContext.font = font;
    this.rightContext.fillStyle = color;
    this.rightContext.fillText(text, position.x, position.y);
};

Renderer.prototype.uiCircle = function(position, radius, color, width)
{
    this.leftContext.lineWidth = width;
    this.leftContext.strokeStyle = color;
    this.leftContext.beginPath();
    this.leftContext.arc(position.x, position.y, radius, 0, Math.PI * 2);
    this.leftContext.stroke();

    this.rightContext.lineWidth = width;
    this.rightContext.strokeStyle = color;
    this.rightContext.beginPath();
    this.rightContext.arc(position.x, position.y, radius, 0, Math.PI * 2);
    this.rightContext.stroke();
};

Renderer.prototype.propCircle = function(position, radius, color, width)
{
    var trueLeftPosition = this.applyPerspective(this.applyOcularShift(this.applyMotionShift(this.applyRotation(position)), true));
    var trueRightPosition = this.applyPerspective(this.applyOcularShift(this.applyMotionShift(this.applyRotation(position)), false));

    if(trueLeftPosition.z > 1e-3 && trueRightPosition.z > 1e-3)
    {
        this.leftContext.lineWidth = width / trueLeftPosition.z;
        this.leftContext.strokeStyle = color;
        this.leftContext.beginPath();
        this.leftContext.arc(this.half.x + trueLeftPosition.x, this.half.y - trueLeftPosition.y, radius / trueLeftPosition.z, 0, Math.PI * 2);
        this.leftContext.stroke();

        this.rightContext.lineWidth = width / trueRightPosition.z;
        this.rightContext.strokeStyle = color;
        this.rightContext.beginPath();
        this.rightContext.arc(this.half.x + trueRightPosition.x, this.half.y - trueRightPosition.y, radius / trueRightPosition.z, 0, Math.PI * 2);
        this.rightContext.stroke();
    }
};

Renderer.prototype.propLine = function(from, to, color, width)
{
    var trueLeftFrom = this.applyPerspective(this.applyOcularShift(this.applyMotionShift(this.applyRotation(from)), true));
    var trueLeftTo = this.applyPerspective(this.applyOcularShift(this.applyMotionShift(this.applyRotation(to)), true));

    var trueRightFrom = this.applyPerspective(this.applyOcularShift(this.applyMotionShift(this.applyRotation(from)), false));
    var trueRightTo = this.applyPerspective(this.applyOcularShift(this.applyMotionShift(this.applyRotation(to)), false));

    if(trueLeftFrom.z > 1e-3 && trueLeftTo.z > 1e-3 && trueRightFrom.z > 1e-3 && trueRightTo.z > 1e-3)
    {
        this.leftContext.lineWidth = width / trueLeftFrom.z;
        this.leftContext.strokeStyle = color;
        this.leftContext.beginPath();
        this.leftContext.moveTo(this.half.x + trueLeftFrom.x, this.half.y - trueLeftFrom.y);
        this.leftContext.lineTo(this.half.x + trueLeftTo.x, this.half.y - trueLeftTo.y);
        this.leftContext.stroke();

        this.rightContext.lineWidth = width / trueRightFrom.z;
        this.rightContext.strokeStyle = color;
        this.rightContext.beginPath();
        this.rightContext.moveTo(this.half.x + trueRightFrom.x, this.half.y - trueRightFrom.y);
        this.rightContext.lineTo(this.half.x + trueRightTo.x, this.half.y - trueRightTo.y);
        this.rightContext.stroke();
    }
};

Renderer.prototype.applyRotation = function(position)
{
    var zRot = Vector3.rotateAroundAxis(position, new Vector3(0, 0, 1), -this.rotation.z * Math.PI);
    var yRot = Vector3.rotateAroundAxis(zRot, new Vector3(1, 0, 0), (this.rotation.y / 2) * Math.PI);
    var xRot = Vector3.rotateAroundAxis(yRot, new Vector3(0, 1, 0), -this.rotation.x * Math.PI);

    return xRot;
};

Renderer.prototype.applyMotionShift = function(position)
{
    return Vector3.sub(position, this.motionShift);
};

Renderer.prototype.applyOcularShift = function(position, left)
{
    return Vector3.add(position, new Vector3(this.ocularSpacing / (left ? 40 : -40), 0, 0));
};

Renderer.prototype.applyPerspective = function(position)
{
    var divider = position.z / this.ocularDistance;
    var proportion = this.half.y / this.half.x;
    return Vector3.mul(Vector3.div(position, new Vector3(divider, divider, this.half.x / 2)), new Vector3(this.half.x / 2, this.half.y * proportion / 2, 1));
};
