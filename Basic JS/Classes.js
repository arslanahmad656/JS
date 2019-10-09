/*
  Classes in JavaScript (ES6 / ECMAScript2015).

  -----------------------------------------------------------------------------------
  IMPORTANT: CLASSES IN JAVASCRIPT DO NOT INTRODUCE A NEW OBJECT MODEL IN JAVASCRIPT!
  -----------------------------------------------------------------------------------

  Classes are syntactic sugar over traditional prototypal-inheritance in JavaScript.
  Classes make object mechanism more verbose and semantic (and much closer to class-oriented languages like C#)

  Points to remember about class:
  -------------------------------
  - Classes are special functions that are syntactic sugar over prototype-based inheritance.
  - Classes can be defined using either:
    - Class Declarations
    - Class Expressions
  - Classes can define the following attributes:
    - Constructors (At most one constructor can be defined in a class)
    - Static methods (Can be accessed only by using class)
    - Static Properties (Outside the class body)
    - Instance methods
    - Instance fields (Can be declared only inside methods. A proposal exists that, if approvded, allow a class to directly declare public instance fields)
    - Private instance fields (A proposal exists that, if approved, will allow the declaration of private fields inside class body)
    - Getters
    - Setters
  - Class definitions, whether declaration or expressions, are not hoisted.
  - Classes always execute in strict mode.
*/

(function demoClasses() {
  // demoSimpleClass();
  // demoClassHavingMethods();
  // demoClassWithStaticProperties();
  // demoClassWithFields();
  demoClassWithGetterAndSetter();
})();

function demoClassWithGetterAndSetter() {
  class SomeClass {
    constructor() {
      this.x = 10;
    }

    set x(val) {
      console.log('Setting x');
      this._x = val;
    }

    get x() {
      console.log('Returning x');
      return this._x;
    }
  }

  var obj = new SomeClass();
  console.log(obj.x);
  obj.x = 222;
  console.log(obj.x);
}

function demoClassWithFields() {
  class SomeClass {
    #privateField = 10;
    publicField = 20;

    getPrivate() {
      return this.#privateField;
    }
  }

  var obj = new SomeClass();
  console.log(obj.publicField);
  // console.log(obj.#privateField); // not allowed
  console.log(obj.getPrivate());  // OK
}

function demoClassWithStaticProperties() {
  class SomeClass {

  }

  SomeClass.staticProp = 10;
  console.log('Static property:', SomeClass.staticProp);
}

function demoClassHavingMethods() {
  let Point = class {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    pointToString() { // an instance method
      return `(${this.x}, ${this.y})`;
    }

    static getDistance(p1, p2) {
      if (!p1 instanceof Point || !p1 instanceof Point) {
        throw TypeError("Point expected");
      }

      const xComp = p2.x - p1.x;
      const yComp = p2.y - p1.y;
      const distance = Math.hypot(xComp, yComp);
      return distance;
    }
  }

  const p1 = new Point(10, 20);
  const p2 = new Point(-10, -20);
  const distance = Point.getDistance(p1, p2);
  console.log(`Distance between ${p1.pointToString()} and ${p2.pointToString()}: ${distance}`);
}

function demoSimpleClass() {
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }

    getArea() {
      return this.length * this.width;
    }
  }

  const rectangle = new Rectangle(5.5, 6.5);
  console.log('Area of rectangle:', rectangle.getArea());
}
