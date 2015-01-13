module.exports = convexHull;

function convexHull(points) {
  if (points.length < 3) {
    return points; // This one is easy... Not precise, but should be enough for now.
  }

  // let p0 be the point in Q with the minimum y-coordinate, or the leftmost
  // such point in case of a tie
  var p0Idx = 0,
    i;
  for (i = 0; i < points.length; ++i) {
    if (points[i].y < points[p0Idx].y) {
      p0Idx = i;
    } else if (points[i].y === points[p0Idx].y && points[i].x < points[p0Idx].x) {
      p0Idx = i;
    }
  }

  var p0 = points[p0Idx];
  // let <p1; p2; ... pm> be the remaining points
  points.splice(p0Idx, 1);
  // sorted by polar angle in counterclockwise order around p0
  var sortedPoints = polarAngleSort(p0, points);
  if (sortedPoints.length < 2) {
    return sortedPoints;
  }

  // let S be empty stack
  var s = [];
  s.push(p0);
  s.push(sortedPoints[0]);
  s.push(sortedPoints[1]);
  var sLength = s.length;
  for (i = 2; i < sortedPoints.length; ++i) {
    while (!ccw(s[sLength - 2], s[sLength - 1], sortedPoints[i])) {
      s.pop();
      sLength -= 1;
    }

    s.push(sortedPoints[i]);
    sLength += 1;
  }

  return s;
}

function polarAngleSort(basePoint, points) {
  var sortedPoints = points.sort(byCosAngle),
    // If more than one point has the same angle, remove all but the one that is farthest from basePoint:
    lastPoint = sortedPoints[0],
    lastAngle = cosAngle(lastPoint),
    dx = lastPoint.x - basePoint.x,
    dy = lastPoint.y - basePoint.y,
    lastDistance = dx * dx + dy * dy,
    curDistance,
    i;

  for (i = 1; i < sortedPoints.length; ++i) {
    lastPoint = sortedPoints[i];
    var angle = cosAngle(lastPoint);
    if (angle === lastAngle) {
      dx = lastPoint.x - basePoint.x;
      dy = lastPoint.y - basePoint.y;
      curDistance = dx * dx + dy * dy;

      if (curDistance < lastDistance) {
        sortedPoints.splice(i, 1);
      } else {
        sortedPoints.splice(i - 1, 1);
      }
    } else {
      lastAngle = angle;
    }
  }

  return sortedPoints;

  function byCosAngle(p1, p2) {
    return cosAngle(p2) - cosAngle(p1);
  }

  function cosAngle(p) {
    var dx = p.x - basePoint.x,
      dy = p.y - basePoint.y,
      sign = dx > 0 ? 1 : -1;

    // We use squared dx, to avoid Sqrt operation and improve performance.
    // To avoid sign loss during dx * dx operation we precompute its sign:
    return sign * dx * dx / (dx * dx + dy * dy);
  }
}

/**
 * Returns true if angle formed by points p0, p1, p2 makes left turn.
 * (counterclockwise)
 */
function ccw(p0, p1, p2) {
  return ((p2.x - p0.x) * (p1.y - p0.y) - (p2.y - p0.y) * (p1.x - p0.x)) < 0;
}
