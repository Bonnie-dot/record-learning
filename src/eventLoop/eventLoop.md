## javascript 运行机制
### 进程 vs 线程 vs 协程
- 进程（process）: 进程具有独立的执行环境，有一个完整的私有的运行资源，特别是每个进程有自己**独立**的运行空间。
- 线程（thread）: 线程有时候被叫做轻量级的进程，线程和进程都要求执行环境，但是线程要求较少的资源比起创建一个进程。线程存在于一个进程中，每一个线程
至少有一个进程。线程共享进程的资源，可以有效通信.
- 协程（coroutine）：多个线程互相合作，完成异步任务。协程有点像函数有有点像线程。这个跟fiber 是一个相似概念。generator 函数是协程在es6中的体现。
### javascript 是单线程
> 单线程就是同一时间做一件事。Javascript的任务分为两种同步和异步。
- 同步（synchronous）：在主线程中排队，只有前一个任务执行完毕，才能执行后一个任务。
- 异步（asynchronous）：不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
  常见的异步包括XHR、dom、计时器等等。
### Event Loop
<div align="center"><img src="https://github.com/chenqing2016/learn-javascript/blob/master/src/eventLoop/img/eventLoop2.png" width="500"/></div>
  首先先搞清楚图上面的画的意思，我们看到在主进程中有栈和堆的存在。我们需要来理解一下栈和堆分别代表什么。
这个要从内存角度理解，主要目的是用来存放数据的一块内存区域。
- stack是有结构的，每个区块按照一定次序存放，可以明确知道每个区块的大小，后进先出（last-in-first-out），
在js中比如基本类型的数据就存放在这里，基本数据类型的数据占空间固定，按值访问；
- heap是没有结构的，数据可以任意存放。引用类型的数据是存放在堆中的，因为大小不固定，但是实际的内存地址是存放在
栈中的，所以有按引用来访问的。因此，stack的寻址速度要快于heap。

> stack 和heap 可以从不同的角度来理解在js中，具体可以看这个链接（https://www.ruanyifeng.com/blog/2013/11/stack.html）

👆这个图可以和👇这个图配合👀，就能理解运行机制啦。

<div align="center"><img src="https://github.com/chenqing2016/learn-javascript/blob/master/src/eventLoop/img/eventLoop.png" width="500"/></div>


参考资料

- https://juejin.im/post/59e85eebf265da430d571f89
- http://www.ruanyifeng.com/blog/2014/10/event-loop.html
