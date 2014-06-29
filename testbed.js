var Class = require('./myclass.js');

  var A = Class({
    a: function() {
      return 1;
    }
  });

  var B = Class({
    b: function() {
      return 2;
    }
  },A);

  var b = new B();

var _a = b.a;
var _pa = A.prototype;
var _pb = B.prototype;
var _b = b.a();


