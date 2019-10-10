/*
  Source:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420

  extends keyword is used to make a class child (subclass) of another class.
  This syntax is syntactic sugar for prototypal inheritance.

  Classes can subclass traditional function based classes
*/

(function demoSubclassing() {
  // demoSubClass();
  // demoSubclassingFromFunctions();
  subClassingObjects();
})();

function subClassingObjects() {
  const Animal = {
    speak() { // using shorthand syntax
      console.log(`${this.name} makes a noise.`);
    }
  }

  class Dog {
    constructor (name) {
      this.name = name;
    }
  }

  // subclassing the object:
  Object.setPrototypeOf(Dog.prototype, Animal);

  // Usage:
  let d = new Dog('Mitzie');
  d.speak(); // Mitzie makes a noise

  console.log('Dog instance of Dog:', d instanceof Dog);
  try {
    console.log('Dog instance of Animal:', d instanceof Animal);
  } catch (e) {
    console.log(e.name, e.message);
  }

  console.log('Dog is prototype of dog object:', Dog.prototype.isPrototypeOf(d));
  console.log('Animal is prototype of dog object:', Dog.prototype.isPrototypeOf(d));
}

function demoSubclassingFromFunctions() {
  function Animal(name, weight) {
    this.name = name;
    this.weight = weight;
  }

  // defining instance methods on super class
  Animal.prototype.eat = function() {
    return `${this.name} is eating!`;
  };

  Animal.prototype.sleep = function() {
    return `${this.name} is going to sleep!`;
  };

  Animal.prototype.wakeUp = function() {
    return `${this.name} is waking up!`;
  };

  class Gorilla extends Animal {  // a subclass (child class) of Animal
    constructor (name, weight, breed) {
      super(name, weight);
      this.breed = breed;
    }

    climbTrees() {
      return `${this.name} is climbing trees!`;
    }

    poundChest() {
        return `${this.name} is pounding its chest!`;
    }

    showVigour() {
        return `${super.eat()} ${this.poundChest()}`;
    }

    dailyRoutine() {
        return `${super.wakeUp()} ${this.poundChest()} ${super.eat()} ${super.sleep()}`;
    }
  }

  // usage:
  var animal = new Animal("abstract animal", 55);
  console.log('Animal name:', animal.name);
  console.log(animal.sleep());
  try {
      console.log(animal.climbTrees());
  } catch (e) {
    console.log(e);
  }

  var gorilla = new Gorilla("A gorilla", 135, "African");
  console.log('Name:', gorilla.name);
  console.log('Breed:', gorilla.breed);
  console.log('Daily routine:', gorilla.dailyRoutine());

  console.log('Type of animal:', typeof animal);
  console.log('Type of gorilla:', typeof gorilla);
  console.log('Prototype of animal:', Object.getPrototypeOf(animal));
  console.log('Prototype of gorilla:', Object.getPrototypeOf(gorilla));
  console.log('Is animal instance of animal:', animal instanceof Animal);
  console.log('Is gorilla instance of animal:', gorilla instanceof Animal);
  console.log('Does Animal.prototype appear in prototypal chain of gorialla:', Animal.prototype.isPrototypeOf(animal));
  console.log('Does prototype of Animal appear in prototypal chain of Gorilla:', Animal.prototype.isPrototypeOf(Gorilla.prototype));
  console.log("Constructor of animal:", animal.constructor);
  console.log("Constructor of gorilla:", gorilla.constructor);
}

function demoSubClass() {
  (function conventialTechnique() {
    console.log('Using conventional technique.');
    // defining the super class
    function Animal(name, weight) {
      this.name = name;
      this.weight = weight;
    }

    // defining instance methods on super class
    Animal.prototype.eat = function() {
      return `${this.name} is eating!`;
    };

    Animal.prototype.sleep = function() {
      return `${this.name} is going to sleep!`;
    };

    Animal.prototype.wakeUp = function() {
      return `${this.name} is waking up!`;
    };

    // defining a Subclass
    function Gorilla(name, weight, breed) {
      Animal.call(this, name, weight);
      this.breed = breed;
    }

    // establish the prototypal linkage
    Object.setPrototypeOf(Gorilla.prototype, Animal.prototype);
    Gorilla.prototype.constructor = Gorilla;

    // defining instance methods on base class
    Gorilla.prototype.climbTrees = function() {
      return `${this.name} is climbing trees!`;
    };

    Gorilla.prototype.poundChest = function() {
      return `${this.name} is pounding its chest!`;
    };

    Gorilla.prototype.showVigour = function() {
      return `${Animal.prototype.eat.call(this)} ${this.poundChest()}`;
    };

    Gorilla.prototype.dailyRoutine = function() {
      return `${Animal.prototype.wakeUp.call(this)} ${this.poundChest()} ${Animal.prototype.eat.call(this)} ${Animal.prototype.sleep.call(this)}`;
    };

    var animal = new Animal("abstract animal", 55);
    console.log('Animal name:', animal.name);
    console.log(animal.sleep());
    try {
        console.log(animal.climbTrees());
    } catch (e) {
      console.log(e);
    }

    var gorilla = new Gorilla("A gorilla", 135, "African");
    console.log('Name:', gorilla.name);
    console.log('Breed:', gorilla.breed);
    console.log('Daily routine:', gorilla.dailyRoutine());

    console.log('Type of animal:', typeof animal);
    console.log('Type of gorilla:', typeof gorilla);
    console.log('Prototype of animal:', Object.getPrototypeOf(animal));
    console.log('Prototype of gorilla:', Object.getPrototypeOf(gorilla));
    console.log('Is animal instance of animal:', animal instanceof Animal);
    console.log('Is gorilla instance of animal:', gorilla instanceof Animal);
    console.log('Does Animal.prototype appear in prototypal chain of gorialla:', Animal.prototype.isPrototypeOf(animal));
    console.log('Does prototype of Animal appear in prototypal chain of Gorilla:', Animal.prototype.isPrototypeOf(Gorilla.prototype));
    console.log("Constructor of animal:", animal.constructor);
    console.log("Constructor of gorilla:", gorilla.constructor);
  })();

  (function classTechnique() {
    console.log('Using class technique');
    class Animal {  // A super class (parent class)
      constructor (name, weight) {
        this.name = name;
        this.weight = weight;
      }

      eat() {
        return `${this.name} is eating!`;
      }

      sleep() {
          return `${this.name} is going to sleep!`;
      }

      wakeUp() {
          return `${this.name} is waking up!`;
      }
    }

    class Gorilla extends Animal {  // a subclass (child class) of Animal
      constructor (name, weight, breed) {
        super(name, weight);
        this.breed = breed;
      }

      climbTrees() {
        return `${this.name} is climbing trees!`;
      }

      poundChest() {
          return `${this.name} is pounding its chest!`;
      }

      showVigour() {
          return `${super.eat()} ${this.poundChest()}`;
      }

      dailyRoutine() {
          return `${super.wakeUp()} ${this.poundChest()} ${super.eat()} ${super.sleep()}`;
      }
    }

    var animal = new Animal("abstract animal", 55);
    console.log('Animal name:', animal.name);
    console.log(animal.sleep());
    try {
        console.log(animal.climbTrees());
    } catch (e) {
      console.log(e);
    }

    var gorilla = new Gorilla("A gorilla", 135, "African");
    console.log('Name:', gorilla.name);
    console.log('Breed:', gorilla.breed);
    console.log('Daily routine:', gorilla.dailyRoutine());

    console.log('Type of animal:', typeof animal);
    console.log('Type of gorilla:', typeof gorilla);
    console.log('Prototype of animal:', Object.getPrototypeOf(animal));
    console.log('Prototype of gorilla:', Object.getPrototypeOf(gorilla));
    console.log('Is animal instance of animal:', animal instanceof Animal);
    console.log('Is gorilla instance of animal:', gorilla instanceof Animal);
    console.log('Does Animal.prototype appear in prototypal chain of gorialla:', Animal.prototype.isPrototypeOf(animal));
    console.log('Does prototype of Animal appear in prototypal chain of Gorilla:', Animal.prototype.isPrototypeOf(Gorilla.prototype));
    console.log("Constructor of animal:", animal.constructor);
    console.log("Constructor of gorilla:", gorilla.constructor);
  })();
}
