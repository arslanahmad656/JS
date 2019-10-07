"use strict";

/*
  Desstructing assignment in JavaScript is a syntax that makes it possible to
  unpack values from arrays, or properties from object in to distinct variables.

  Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Syntax
*/

(function driver() {
  // demoSyntax();
  // demoDefaultValues();
  // changingPropertyNamesAndDefaultValuesInObjectLiterals();
  // destructingInFunctionArguments();
  destructingInForOf();
})();

function demoSyntax() {
  var [a, b, ... rest] = [1, 2, 3, 4, 5, 6];
  console.log(a);
  console.log(b);
  console.log(rest);

  var {x, y, ...rest} = {x: 10, y: 20, z: 100, z2: 200};
  console.log(x);
  console.log(y);
  console.log(rest);
}

function demoDefaultValues() {
  var [a = 1, b = 2, c = {m: 20, n: 100}] = [10];
  var {x = 10, y = 20} = {x: 50};

  console.log(a, b, c);
  console.log(x, y);
}

function changingPropertyNamesAndDefaultValuesInObjectLiterals() {
  var obj = {a: 10, b: 20, c: {x: 1, y: 2}};

  var {a: foo} = obj;
  console.log(foo);

  var {a: bar = 100, b, c, d: someValue = 200} = obj;
  console.log(bar, someValue);
}

function destructingInFunctionArguments() {
  var student = {
    id: 10,
    fullname: {
      firstName: 'Arslan',
      lastName: 'Ahmad'
    },
    rollNumber: 2012068
  };

  getStudentId(student);
  printStudentInfo(student);

  function getStudentId({id}) {
    console.log('Student ID:', id);
  }

  function printStudentInfo({fullname: {firstName}, rollNumber}) {
    console.log(`${firstName}'s roll number ${rollNumber}`);
  }
}

function destructingInForOf() {
  var people = [
    {
      name: 'Mike Smith',
      family: {
        mother: 'Jane Smith',
        father: 'Harry Smith',
        sister: 'Samantha Smith'
      },
      age: 35
    },
    {
      name: 'Tom Jones',
      family: {
        mother: 'Norah Jones',
        father: 'Richard Jones',
        brother: 'Howard Jones'
      },
      age: 25
    }
  ];

  for (let {name: n, family: {father: f}} of people) {
    console.log(`${n}, Father: ${f} `);
  }
}
