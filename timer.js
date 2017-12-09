
var Timer = function()
{
    this.lastTick = new Date().getTime();
    this.delta = 0;
    this.fps = 0;
};

Timer.prototype.tick = function(t)
{
    var stamp = t || new Date().getTime();
    this.delta = (stamp - this.lastTick) / 1000;
    this.lastTick = stamp;

    if(this.delta > 0)
        this.fps = 1 / this.delta;
};