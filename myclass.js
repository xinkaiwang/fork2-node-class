
function Class(funcs, parent) {
  var constructor = function() {
    if (funcs.initialize !== null && typeof funcs.initialize === 'function') {
      funcs.initialize.apply(this, arguments);
    }
    else if (parent)
    {
      parent._constructor.apply(this, arguments);
    }
  };

  var klass = function() {
      klass._constructor.apply(this, arguments);
  };
  klass._constructor = constructor;

  if (parent) {
    function ctor() {
      // The surrogate constructor should satisfy "child.prototype.constructor == child.constructor"
      this.constructor = klass;
    }
    ctor.prototype = parent.prototype;
    klass.prototype = new ctor;
    klass.__super__ = parent;
  }
  else {
    klass.__super__ = Object;
  }

  // funcs
  for (name in funcs) {
    if (funcs.hasOwnProperty(name) && name !== 'initialize') {
      klass.prototype[name] = funcs[name];
    }
  }
  var current_class = [klass]; // Fixing Infinity Recursion (Part 2)
  // super
  klass.prototype['super'] = function() {
    var act = arguments[0];
    var args = [].slice.call(arguments,1);
    if(typeof current_class[current_class.length - 1].__super__.prototype[act] === 'function') {
      current_class.push(current_class[current_class.length - 1].__super__);
      var ret = current_class[current_class.length - 1].prototype[act].apply(this, args);
      current_class.pop();
      return ret;
    }
  };
  klass.super = klass.prototype.super; // Fixing Infinity Recursion (Part 1)
  return klass;
}

module.exports = Class;
