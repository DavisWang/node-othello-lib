var othello = require("./src/othello_factory.js");

o = othello.create();
o2 = othello.create();

console.log(o.processMove(2,4)); //X
console.log(o.processMove(4,5)); //O
console.log(o.processMove(5,6)); //X
console.log(o.processMove(2,3)); //O
console.log(o.processMove(2,2)); //X
console.log(o.processMove(1,3)); //O

console.log(o2.processMove(4,2)); //X
console.log(o2.processMove(5,4)); //O
console.log(o2.processMove(3,5)); //X
console.log(o2.processMove(2,2)); //O
console.log(o2.processMove(6,4)); //X
console.log(o2.processMove(3,6)); //O
console.log(o2.processMove(1,1)); //X
console.log(o2.processMove(3,2)); //O
console.log(o2.processMove(2,6)); //X
console.log(o2.processMove(6,3)); //O
