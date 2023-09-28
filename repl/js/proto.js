
let runnable_proto = {
  speed: 0,
  run() {
    console.log(`Runnable ${this.name} runnig with speed ${this.speed}`);
  }
}
let saible_proto = {
  say() {
    console.log(`${this.name} say hello`); 
  }
}

function Auto(name, speed) {
  this.name = name;
  this.speed = speed;
}
Auto.prototype = {...runnable_proto, ...saible_proto};

function Wolf(name, speed) {
  this.name = name;
  this.speed = speed;
  this.type ='хищник';
}
Wolf.prototype = runnable_proto;

let wolf_1 = new Wolf('wolf_1', 30)
let wolf_2 = new Wolf('wolf_2', 25)

wolf_1.run();
wolf_2.run();

console.log(Object.keys(wolf_1))
console.log(Object.keys(Object.getPrototypeOf(wolf_1)))

