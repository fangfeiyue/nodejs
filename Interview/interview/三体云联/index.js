// 'use strict';
var x = 0;
let a = {
  x: 1,
  y: 1,
  funx: function() {
    const x = 2;
    console.log(this.x);
  },
  funy: function() {
    const y = 2;
    console.log(this.y);
  },
  funz: function() {
    const y = 2;
    console.log(this.y);
  }
};

let b = {
  x: 3
};

let c = Object.create(a);
c.y = 9;

a.funx(); // 1
a.funz(); // 1
// bind返回一个函数，但此处并没有执行，所以没有输出
a.funx.bind(b); // 3
a.funx.bind(window)(); // 0
// ??
a.funx.bind(b).bind(window)(); // 3
a.funx.call(b); // 3
a.funx.call(window); // 0

// 普通模式下下面两个将会输出0，严格模式下会报错 
a.funx.call(null); // 0
a.funx.call(undefined); // 0

a.funx.apply(b); // 3

setTimeout(() => {
  // 这里是a调用的所以this指向的还是a
  a.funx(); // 1
}, 0);

setTimeout(() => {
  a.funx.bind(b)(); // 3
}, 0);
console.log()

// 这里是window调用的
setTimeout(a.funx, 0); // 0

setTimeout(a.funx.bind(b), 0); // 3

c.funx(); // 1
c.funy(); // 9
c.funz(); // 9

console.log(c.x, c.y, c.z) // 1 9 undefined

c.x = undefined;
console.log(a.x, c.x); // 1 undefined

const f = a;
f.x = 10;
console.log(f.x, a.x); // 10 10

// 下面会输出啥
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 5
  }, 1000);
}
console.log(i);//5

// 如何将上面函数改为输出0 - 4
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 0 - 4
  }, 1000);
}

for (var i = 0; i < 5; i++) {
  (function(i){
      setTimeout(function() {
        console.log(i); // 0 - 4
      }, 1000);
  })(i);
}
console.log(i); // 5

// 数组的slice和split方法有什么区别
/*
slice(start, end) 方法可从已有的数组中返回选定的元素。返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

splice(index, index, item1...向数组中添加新项目) 方法向/从数组中添加/删除项目，然后返回被删除的项目组成的数组。
*/

// 简述下React的事件机制
/*
React的事件是合成事件((Synethic event)，不是原生事件，合成事件与原生事件的区别

1. 写法不同，合成事件是驼峰写法，而原生事件是全部小写
2. 执行时机不同，合成事件全部委托到document上，而原生事件绑定到DOM元素本身
3. 合成事件中可以是任何类型，比如this.handleClick这个函数，而原生事件中只能是字符串

用户点击button按钮触发click事件后，DOM将event传给ReactEventListener，它将事件分发到当前组件及以上的父组件。然后ReactEventEmitter对每个组件进行事件的执行，先构造React合成事件，然后以队列的方式调用JSX中声明的callback。
*/

// react15和react16生命周期方法上有什么不同

// React在哪个生命周期方法里调用接口

// props改变后会依次调用哪些生命周期方法

// state改变后会依次调用哪些生命周期方法



