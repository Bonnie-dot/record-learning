## javascript 异步处理
最近在看阮一峰老师的《es6标准入门》，目前新增了几种异步处理的方式，包括promise、async、generator(异步)，
目测前端这边针对异步处理，已经有好几种方式，借此总结一下各自特点和使用场景。
### -.回调函数
<div style="text-align: center"><img src="https://github.com/chenqing2016/learn-javascript/blob/master/src/async/img/callback.png"/></div>
因为main method 有一个计时器所以会进入异步处理机制，其他的代码按照顺序执行。当异步处理完以后会放到callback queue 里面，然后主线程目前没有可执行的，会读取queue里面的执行。
- 优点：简单，容易理解，
- 缺点是耦合度高，要等到前一个函数执行了才执行后面的；且只能在函数内部捕获错误

### 二.Promise
Promise 是一个对象，存放着最终异步的计算结果。Promise 的状态是不受外界影响的，一共只有三种状态：Pending、Fulfilled、Rejected,
pending-> fulfilled 执行resolve，pending->rejected,执行rejected。

#### Promise.prototype
- Promise.prototype.then() 为promise添加状态改变的回调函数，第一个参数是回调函数是resolved，第二个参数是回调函数rejected，同时本身return
一个promise 实例，可以链式调用
- Promise.prototype.catch() 是then(null,rejected) 的别名，用于指定发生错误时的回调函数.推荐使用这种方式捕获错误
#### Promise.method
- Promise.all([promiseInstance]),接受一个数组，里面是promise的实例，即使不是实例也会通过Promise.resolve()进行转换
只有所有状态是fulfilled，这个实例的状态才是fulfilled。如果数组中有一个是rejected，则状态会变成rejected。如果实例返回的status
是fulfilled则，回调里面返回的是一个数组；然后如果是rejected则回调里面返回的是一个值。这个适用于同时发出几个请求，并无先后顺序。
- Promise.race([promiseInstance]),跟Promise.all一样，只是实现方式不一样，只要数组里面有一个改变了状态，则实例的状态就会跟着变化.
这个实例，回调里面只有一个值，就是率先执行的完的实例的返回值。这个适用request timeout  的场景。
- Promise.resolve(),可以将现有对象转换成promise对象
- Promise.reject() 与Promise.resolve()一样，只是返回的状态不一样而已
#### 注意
- 一定要注意Promise 构造函数是同步执行的，只有Promise.then/catch 是异步的。
- 在Then 和catch 中return 一个error 对象不会被catch 捕获
- 推荐练手的题（https://juejin.im/post/5a04066351882517c416715d）
##### 总结
- 优点：把异步操作以同步的流程表达出来，避免了嵌套多层；
- 缺点：无法取消promise；无法知道其进度；不适用于反复发生的场景

### Generator
generator 函数是es6 提供的一种异步编程解决方案。它是一个状态机，封装了多个内部状态。执行generator 函数会返回一个遍历器对象。
**generator 函数出了是一个状态机，还是一个遍历器对象生成器。**
#### 特点
- function 命令与函数名之间有一个*
- 函数内部使用yield语句定义不同的状态，generator 是分段执行的，yield 语句是暂停执行的标记。
如果yield表达式在另一个表达式中要是有圆括号包起来
- next 是恢复执行的标志，返回一个对象{value：xx,done:true/false},一旦返回true 则表示遍历结束。next可以带一个参数，
该参数会被当作上一条yield 语句的返回值.可以在generator的不同阶段从外部注入值到内部，从而调整函数的状态行为。
#### Generator.prototype
- Generator.prototype.throw 可以在函数体外抛出错误，然后在函数体内捕获,一旦generator函数抛出错误，则默认已经结束啦。
- Generator.prototype.return 可以返回指定的值，并终结
#### yield* 表达式
yield* 语句，用于一个generator里面执行另一个generator,也就是for...of  的一种形式。只要数据结构里有iterator 接口，
则可以被yield的遍历
#### 与iterator/for ...of 的关系
- 由于generator 本身就是遍历器生成函数，所以可以把[Symbol.iterator]=generator(),从而该对象上就具有了iterator接口就可以被遍历了
- for ... of 循环可以自动遍历generator函数生成的iterator对象，且不需要调用next 方法
#### 使用场景
- 可以把异步操作写在yield里面，等到相应的异步执行完了，在调用next method，改写了回调函数（不过感觉很奇怪看代码 可读性不高）
<div style="text-align: center"><img src="https://github.com/chenqing2016/learn-javascript/blob/master/src/async/img/implementAsync.png"/></div>
- 多步同步操作，比较耗时的，还是可以的。代码结构非常清晰，可读性好。
#### 异步应用（generator 最大的特点就是交出函数的执行权)
#### thunk 函数
> thunk 函数是自动执行generator的一种方法。 

#### 参数求值策略
- 传值调用，意思是进入函数体前就把表达式结果计算出来，但是可能根本就没有执行到那里去，却计算了表达式结果，造成性能浪费。
- 传名调用，就是只有用到表达式的时候再对表达式求值，但是在这期间，调用者可以修改其表达式，可能造成难以追踪bug。
##### javascript 里面的Thunk 函数
js是传值调用的，thunk 替换的不是表达式，而是多参数函数，将其替换成一个单参数函数。
```
//thunkify 源码
function thunkify(fn){
    return function(){
        var args = new Array(arguments.length);
        var ctx = this;

        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        return function(done){
            var called;
            //初看这部分是有点困惑的
            //最终明白了，是为了封装初原本调用函数的形式，类似于（arg1,arg2,callback）
            //这里致所有没有arg.push(done),是为了防止callback 被多次调用
             args.push(function(){
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });

            try {
                    fn.apply(ctx, args);
                } catch (err) {
                    done(err);
            }
        }
    }
};
```
**Thunk 能让generator 自动执行**
<div style="text-align: center"><img src="https://github.com/chenqing2016/learn-javascript/blob/master/src/async/img/thunkify.png"/></div>
result.value 返回的是thunkify  的第二层函数，然后把next(callback)传递进去，从而实现了异步调用。
类似的能让generator 执行的是co 模块，与thunkify 处理异步不同，thunkify处理异步是通过callback 来得到结果；而
co模块是通过Promise 来实现自动化的

#### 优缺点
- 优点：能够把异步写成同步的方式，方便阅读；
- 缺点：generator 把执行权交给了开发者，需要开发者去控制，但是可以配合co和thunkify 实现自动执行。

### async
**它是generator的语法糖。内置执行器，更加易读。**
- async 返回一个promise 对象，
- async 函数内部return语句返回的值就是then 回调函数的参数
- await 后面是一个promise对象，但是有可能会返回rejected所以最好加上try...catch
#### 优缺点
- 优点：易读；有内置执行器
### 其他的异步编程包括：事件回调，订阅（略）
