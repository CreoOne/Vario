
// intro
(function(){
    
    var v = new Vector2(1, 2);
    
    console.assert(v !== undefined);
    console.assert(v.x === 1);
    console.assert(v.y === 2);
    
})();

// magnitudeSquared
(function(){
    
    var m = new Vector2(2, 2).magnitudeSquared();
    
    console.assert(m !== undefined);
    console.assert(m === 8);
    
})();

// magnitude
(function(){
    
    var m = new Vector2(3, 4).magnitude();
    
    console.assert(m !== undefined);
    console.assert(m === 5);
    
})();

// normalize
(function(){
    
    var n0 = new Vector2(10, 0).normalize();
    
    console.assert(n0 !== undefined);
    console.assert(n0.x === 1);
    console.assert(n0.y === 0);

    var n1 = new Vector2(0, 10).normalize();
    
    console.assert(n1 !== undefined);
    console.assert(n1.x === 0);
    console.assert(n1.y === 1);
    
})();

// fromScalar
(function(){
    
    var v = Vector2.fromScalar(2);
    
    console.assert(v !== undefined);
    console.assert(v.x === 2);
    console.assert(v.y === 2);
    
})();

// closeEnough
(function(){
    
    var q = new Vector2(1.5, 1.5);
    var r = new Vector2(1.7, 1.7);

    console.assert(Vector2.closeEnough(q, r, 0.5) === true);
    console.assert(Vector2.closeEnough(q, r, 0.1) === false);
    
})();

// add
(function(){
    
    var q = new Vector2(1, 2);
    var r = new Vector2(3, 4);
    
    var v = Vector2.add(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 4);
    console.assert(v.y === 6);
    
})();

// sub
(function(){
    
    var q = new Vector2(5, 6);
    var r = new Vector2(2, 4);
    
    var v = Vector2.sub(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 3);
    console.assert(v.y === 2);
    
})();

// mul
(function(){
    
    var q = new Vector2(2, 3);
    var r = new Vector2(3, 4);
    
    var v = Vector2.mul(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 6);
    console.assert(v.y === 12);
    
})();

// div
(function(){
    
    var q = new Vector2(6, 12);
    var r = new Vector2(2, 3);
    
    var v = Vector2.div(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 3);
    console.assert(v.y === 4);
    
})();

// dot
(function(){
    
    var q = new Vector2(1, 0);
    var r = new Vector2(-0.5, 1);
    
    var v = Vector2.dot(q, r);

    console.assert(v !== undefined);
    console.assert(v === -0.5);
    
})();

// cross TODO
(function(){
    
    var q = new Vector2(1, 0);
    
    var v = Vector2.cross(q);

    console.assert(v !== undefined);
    
})();

// lerp
(function(){
    
    var q = new Vector2(1, 0);
    var r = new Vector2(0, 1);
    
    var v = Vector2.lerp(q, r, 0.5);

    console.assert(v !== undefined);
    console.assert(v.x === 0.5);
    console.assert(v.y === 0.5);
    
})();

// intro
(function(){
    
    var v = new Vector3(1, 2, 3);
    
    console.assert(v !== undefined);
    console.assert(v.x === 1);
    console.assert(v.y === 2);
    console.assert(v.z === 3);
    
})();

// magnitudeSquared
(function(){
    
    var m = new Vector3(2, 2, 2).magnitudeSquared();
    
    console.assert(m !== undefined);
    console.assert(m === 12);
    
})();

// magnitude
(function(){
    
    var m = new Vector3(2, 3, 6).magnitude();
    
    console.assert(m !== undefined);
    console.assert(m === 7);
    
})();

// normalize
(function(){
    
    var n0 = new Vector3(10, 0, 0).normalize();
    
    console.assert(n0 !== undefined);
    console.assert(n0.x === 1);
    console.assert(n0.y === 0);
    console.assert(n0.z === 0);

    var n1 = new Vector3(0, 10, 0).normalize();
    
    console.assert(n1 !== undefined);
    console.assert(n1.x === 0);
    console.assert(n1.y === 1);
    console.assert(n1.z === 0);

    var n2 = new Vector3(0, 0, 10).normalize();
    
    console.assert(n2 !== undefined);
    console.assert(n2.x === 0);
    console.assert(n2.y === 0);
    console.assert(n2.z === 1);
    
})();

// fromScalar
(function(){
    
    var v = Vector3.fromScalar(2);
    
    console.assert(v !== undefined);
    console.assert(v.x === 2);
    console.assert(v.y === 2);
    console.assert(v.z === 2);
    
})();

// closeEnough
(function(){
    
    var q = new Vector3(1.5, 1.5, 1.5);
    var r = new Vector3(1.7, 1.7, 1.7);

    console.assert(Vector3.closeEnough(q, r, 0.5) === true);
    console.assert(Vector3.closeEnough(q, r, 0.1) === false);
    
})();

// add
(function(){
    
    var q = new Vector3(1, 2, 3);
    var r = new Vector3(4, 5, 6);
    
    var v = Vector3.add(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 5);
    console.assert(v.y === 7);
    console.assert(v.z === 9);
    
})();

// sub
(function(){
    
    var q = new Vector3(5, 6, 7);
    var r = new Vector3(1, 3, 5);
    
    var v = Vector3.sub(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 4);
    console.assert(v.y === 3);
    console.assert(v.z === 2);
    
})();

// mul
(function(){
    
    var q = new Vector3(2, 3, 4);
    var r = new Vector3(4, 6, 7);
    
    var v = Vector3.mul(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 8);
    console.assert(v.y === 18);
    console.assert(v.z === 28);
    
})();

// div
(function(){
    
    var q = new Vector3(6, 12, 25);
    var r = new Vector3(2, 3, 5);
    
    var v = Vector3.div(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 3);
    console.assert(v.y === 4);
    console.assert(v.z === 5);
    
})();

// dot
(function(){
    
    var q = new Vector3(0, 0, 1);
    var r = new Vector3(1, 0, -0.5);
    
    var v = Vector3.dot(q, r);

    console.assert(v !== undefined);
    console.assert(v === -0.5);
    
})();

// cross
(function(){
    
    var q = new Vector3(1, 0, 0);
    var r = new Vector3(0, 1, 0);
    
    var v = Vector3.cross(q, r);

    console.assert(v !== undefined);
    console.assert(v.x === 0);
    console.assert(v.y === 0);
    console.assert(v.z === 1);
    
})();

// lerp
(function(){
    
    var q = new Vector3(1, 0, -1);
    var r = new Vector3(0, 1, 0);
    
    var v = Vector3.lerp(q, r, 0.5);

    console.assert(v !== undefined);
    console.assert(v.x === 0.5);
    console.assert(v.y === 0.5);
    console.assert(v.z === -0.5);
    
})();

// rotateAroundAxis
(function(){
    
    var q = new Vector3(1, 0, 0);
    var axis = new Vector3(0, 0, 1);
    
    var v = Vector3.rotateAroundAxis(q, axis, Math.PI / 2);

    console.assert(v !== undefined);
    console.assert(Vector3.closeEnough(v, new Vector3(0, 1, 0), 1e-6) === true);
    
})();