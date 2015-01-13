# cnvx

Calculates [convex hull](http://courses.csail.mit.edu/6.006/spring11/rec/rec24.pdf)
for the set of 2d points. This code was part of [VivaGraph](https://github.com/anvaka/VivaGraphJS)
now I just extracted it here. Computation complexity is `O(n lg n)`.

[![Build Status](https://travis-ci.org/anvaka/cnvx.svg)](https://travis-ci.org/anvaka/cnvx)
# usage

``` javascript
var getConvexHull = require('cnvx');
var points = [
// square:
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
// And points inside
  { x: 0.5, y: 0.5 }
// ...
];

var hull = (points);
console.log(hull); // prints square points (0,0), (0,1), (1,0), (1,1);
```

Note: Current implementation modifies underlying collection of points. If you need
your original collection of points to remain intact - pass a copy to this method.


# install

With [npm](https://npmjs.org) do:

```
npm install cnvx
```

# license

MIT
