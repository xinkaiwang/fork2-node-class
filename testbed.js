var Class = require('./myclass.js');

var A = Class({
  foo: function(a,b) {
    return [a,b];
  }
});

var B = Class({
  foo: function(a,b) {
    return B.super("foo",a*10,b*100);
  }
},A);

var C = Class({
  foo: function(a,b) {
    return C.super("foo",a*10,b*100);
  }
},B);

var c = new C()
var result = c.foo(1,2); // should get [100,20000]
console.log(result);
