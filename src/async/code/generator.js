// function* f() {
//    var m= yield 4;
//     yield m+5;
//     return "end"
// }
// function* f(x) {
//     var m= yield x+4;
//     yield m+5;
//     return "end"
// }
// var f=f(7);
// console.log(f.next());//{ value: 4, done: false }
// console.log(f.next(90));//{ value: 5, done: false }
// console.log(f.next());//{ value: end, done: true }

// function* f() {
//     try{
//         yield console.log(88);
//         yield console.log(5);
//     }catch (e) {
//         console.log(e);
//     }
// }
// var fn=f();
// fn.next();
// fn.throw();
// function* inner() {
//     yield 1;
//     yield 2;
//     yield* [3,4,5];
// }
// function* outer() {
//     yield* inner();
// }
// // for(let key of outer()){
// //     console.log(key);//1,2,3,4,5
// // }
// var f=outer();
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());

// var obj={name:"dog",color:"black",age:"3"};
// function * iterator(){
//     yield "name:"+obj.name;
//     yield "color:"+obj.color;
//     yield "age:"+obj.age;
// }
// obj[Symbol.iterator]=iterator;
// for (let key of obj){
//     console.log(key);
// }
// console.log(obj[Symbol.iterator]===iterator);

// function timer() {
// setTimeout(()=>{
//     console.log("timer")
// },3000)
// }
// var promiseFN=()=>{
//     new Promise(resolve =>{
//         timer();
//         resolve("success");
//     } ).then(result=>{
//         console.log(result);
//         fn.next();
//     })
// }
// function* f() {
//     yield promiseFN();
//     yield console.log(3);
// }
// var fn=f();
// fn.next();

var f1=()=>{
    console.log(1);
}
var f2=()=>{
    console.log(2);
}
var f3=()=>{
    console.log(3);
}
function* f(){
    yield f1();
    yield f2();
    yield f3();
}
var fn=f();
console.log(fn.next())
fn.next()
fn.next()