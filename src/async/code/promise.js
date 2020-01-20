// new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve("success")
//     },2000);
// }).then((result)=>{
//     console.log(result);
// })

// new Promise(((resolve, reject) => {
//     resolve(1);//resolve 不是代码的终结标志
//     console.log(2)
// })).then((result)=>{
//     console.log(result);
// })//2 1
// new Promise(((resolve, reject) => {
//     resolve(1);//Promise的状态已经确定是resolve 在之后抛出错误也不会被捕获
//      throw new Error("1111")
// })).then((result)=>{
//     console.log(result);
// })
// new Promise((resolve, reject) => {
//     throw new Error("dsfsd");//同样的道理，如果本书已经error 了 后面resolve 也没有意义
//     reject(1);
// }).then(result=>{
//     console.log(result);
// }).catch(e=>{
//     console.log(e);
// })
// const timer=(time=>setTimeout(()=>console.log(time),time));
// const p1=new Promise((resolve, reject) => {
//     timer(1000);
//     resolve("success");
// })
// const p2=new Promise((resolve, reject) => {
//     timer(2000);
//     resolve("error");
// })
// Promise.all([p1,p2,2])
//     .then(result=>console.log(result))//[ 'success', 'error', 2 ]
// .catch(e=>console.log(e));

// const timer=(time=>setTimeout(()=>console.log(time),time));
// const p1=new Promise((resolve, reject) => {
//     timer(1000);
//     reject("success");
// })
// const p2=new Promise((resolve, reject) => {
//     timer(2000);
//     reject("error");
// })
// Promise.all([p1,p2,2])
//     .then(result=>console.log(result))//error
//     .catch(e=>console.log(e));

// const timer=(time=>setTimeout(()=>console.log(time),time));
// const p1=new Promise((resolve, reject) => {
//     timer(1000);
//     resolve("success");
// })
// const p2=new Promise((resolve, reject) => {
//     timer(2000);
//     resolve("error");
// })
// Promise.race([p1,p2,2])
//     .then(result=>console.log(result))//success
//     .catch(e=>console.log(e));

// const timer=(time=>setTimeout(()=>console.log(time),time));
// const p1=new Promise((resolve, reject) => {
//     timer(1000);
//     reject("error");
// })
// const p2=new Promise((resolve, reject) => {
//     timer(2000);
//     resolve("success2");
// })
// Promise.race([p1,p2,5])
//     .then(result=>console.log(result))//error
//     .catch(e=>console.log(e));

// const step1=(resolve,reject)=>{
//     setTimeout(()=>resolve(1),2000);
// }
// const step2=(resolve,reject)=>{
//     setTimeout(()=>resolve(2),2000);
// }
// const step3=(resolve,reject)=>{
//     setTimeout(()=>resolve(3),2000);
// }
// new Promise(step1)
//     .then(result=>new Promise(step2))
//     .then(()=>new Promise(step3))
//     .then(result=>console.log(result));

// Promise.resolve()
//     .then(() => {
//         throw new Error('error!!!')
//     })
//     .then((res) => {
//         console.log('then: ', res)
//     })
//     .catch((err) => {
//         console.log('catch: ', err);//catch:  Error: error!!!
//     });

// Promise.resolve()
//     .then(() => {
//         return new Error('error!!!')
//
//     })
//     .then((res) => {
//         console.log('then: ', res)
//     })
//     .catch((err) => {
//         console.log('catch: ', err)
//     });

// const promise = Promise.resolve()
//     .then(() => {
//         return promise
//     })
// promise.catch(console.error)

new Promise(((resolve, reject) => {
    throw new Error("ddd")
}))