var test = require('tap').test,
    convex = require('../');

test('it can find convex hull', function(t) {
  var points = [
    // square:
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];
  for (var i = 0; i < 100; ++i) {
    points.push({
      x: Math.random() * 0.9 + 0.1,
      y: Math.random() * 0.9 + 0.1
    });
  }

  var hull = convex(points);
  t.equals(hull.length, 4, 'Four points of square are here');

  t.ok(findPointInHull({ x: 0, y: 0 }, hull, 'Hull point is found'));
  t.ok(findPointInHull({ x: 1, y: 0 }, hull, 'Hull point is found'));
  t.ok(findPointInHull({ x: 0, y: 1 }, hull, 'Hull point is found'));
  t.ok(findPointInHull({ x: 1, y: 1 }, hull, 'Hull point is found'));

  t.end();

  function findPointInHull(point, hull) {
    for (var i = 0; i < hull.length; ++i) {
      var hullPoint = hull[i];
      if (point.x === hullPoint.x &&
          point.y === hullPoint.y) {
        return true;
      }
    }

    return false;
  }
});
