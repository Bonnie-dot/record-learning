### 数据类型和数据结构
#### 数据类型
7种原始类型:
- Boolean
- Null
- Undefined
- Number
- String 
- BigInt
- Symbol
> 这里要重点说的是后面两个, BigInt,它可以表示**任意精度格式的整数**,symbol 紧接着讲
#### Symbol
symbol 表示一种独一无二的值，即使是同一个key 值也是不一样的值。**主要使用在对象的属性名**上面，因为
同一个对象可能多个人在维护，就有可能出现属性名的冲突，所以现在可以使用Symbol()来表示属性名了。
##### Symbol 作为属性名
- 采用Object.getOwnPropertySymbols(),可以获得指定的属性名，其他的遍历方法(for循环，Object.keys)访问不到。
- Reflect.ownKeys 能获得所有的key ,包括symbol
##### method
- Symbol.for(),创建Symbol, 如果已经存在，则返回同一个;如果不存在，则重新创建。与Symbol不同的是，Symbol.for()创建的会放入一个注册表，
  每次调用创建时，是会查找这个注册表里面是否存在，但是不会查找Symbol创建的。
- Symbol.keyFor() 返回已经存在的通过Symbol.for()创建的key 值。
```
var symbol1=Symbol(1);
console.log(Symbol.for(1)===symbol1);//false
console.log(Symbol.for(1)===Symbol.for(1));//true
console.log(Symbol.keyFor(symbol1));//undefined
console.log(Symbol.keyFor(Symbol.for(1)));//1
```
#### 数据结构
#### Set 
> 类似与数组，但是成员之间的值，是**不能重复**的。如果重复了，则只能出现一个；可以接受一个数组，进行初始化的；不能进行类型转换。
##### Set.prototype
- size 返回长度
- add|delete|has|clear
#### WeakSet
> 用于存放对象，只能是对象。
WeakSet是弱引用，垃圾回收器不会考虑这个里面的引用关系，**所有适合存放一些临时对象**，可以不用手动释放资源，WeakMap 类似，
#### Map
 > 键值对的集合，hash 结构
 ##### Map.prototype
 - size
 - set(key,value)|get(key)|has(key)|delete(key)|clear()
 ##### WeakMap 与WeakSet类似，只接受对象作为key