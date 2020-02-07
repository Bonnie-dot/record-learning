// var symbol1=Symbol(1);
// var symbol2=Symbol(2);
// var obj={
//     [symbol1]:"1",
//     [symbol2]:"2",
//     m:"3"
// };
// for(let key in obj){
//     console.log(key);
//     console.log(obj[key]);
// }
// var keys=Object.getOwnPropertySymbols(obj);
// for (let i = 0; i < keys.length; i++) {
//     let key=keys[i];
//     console.log(obj[key]);//1,2
// }
// console.log(Reflect.ownKeys(obj));
var symbol1=Symbol(1);
console.log(Symbol.for(1)===symbol1);//false
console.log(Symbol.for(1)===Symbol.for(1));//true
console.log(Symbol.keyFor(symbol1));//undefined
console.log(Symbol.keyFor(Symbol.for(1)));//1