console.log('-----------1---------');
{
  // 下面打印的结果是什么？为什么？

  // 变量提升
  var a = 1;
  if (!(b in window)) {
    var b = 2;
    a += 1;
  }else {
    a += 2;
  }

  console.log(a); // 3
  console.log(b); // undefind
}
console.log('-----------2---------');
{
  // 下面打印的结果是什么？为什么？

  // 作用域
  var m = 1;

  function log() {
    var m = 2;
    return function() {
      m += 1;
    };
  }

  var _log = log();
  _log();
  console.log(m); // 1
}
console.log('-----------3---------');
{
  // 下面打印的结果是什么？为什么？

  // JS运行机制
  for (var i = 0; i < 5; i++) {
    (function(){
      setTimeout(() => {
        console.log(i); // 5 5 5 5 5
      }, 1000);
    })(i);
  }
}
console.log('-----------4---------');
{
  // 下面打印的结果是什么？为什么？
  function fun(){}
  console.log(typeof fun); // function
  console.log(fun instanceof Function); // true
  console.log(fun instanceof Object); // true
}
console.log('-----------5---------');
{
  // 下面打印的结果是什么？为什么？

  // this的指向
  var a = 1;
  var obj = {
    a: 2,
    getA: function() {
      return this.a;
    }
  };
  console.log(obj.getA()); // 2
  console.log(obj.getA.call()); // 1
  console.log(obj.getA.call({a: 10})); // 10
  // 如果getA换成箭头函数输出结果分别为 1 1 1
}
console.log('-----------6---------');
{
  // 下面打印的结果是什么？为什么？
  var arr = [1, 2, 3];
  
  function test(arr) {
    arr = [];
  }

  test(arr);
  console.log(arr); // [1, 2, 3]
}
console.log('-----------7---------');
{
  // 构造函数Fn，原型对象，实例对象，三者之间的关系
}
console.log('-----------8---------');
{
  // var const let的区别
}
console.log('-----------9---------');
{
  // 根据id快速找到对应的元素
  const tree = {
    id: 'root',
    children: [
      {id:1, children:[]},
      {id:2, children:[]},
      {id:3, children:[]},
      {id:4, children:[]},
    ]
  };
}
console.log('-----------10---------');
{
  // react组件生命周期安装载、更新、销毁三个阶段分别都有哪些？
}
console.log('-----------11---------');
{
  // 调用this.setState之后，react都做了哪些操作？怎么拿到改变后的值？
}
console.log('-----------12---------');
{
  // react父子组件是如何通信的？兄弟组件呢？
}
console.log('-----------13---------');
{
  // 改变this指向的方式有哪些？实现一个bind

  /*
    call和apply均可以改变this指向，call接受的参数为一个一个的，但是apply接受的参数只能为一个严格的数组(详情见如下的代码演示)
  */
}
console.log('-----------14---------');
{
  // <div class="parent"><div class="child"></div></div>父元素和子元素宽高不固定，如何实现水平垂直居中？
}
console.log('-----------15---------');
{
  // 移动端点击事件300ms延迟如何去掉？原因是什么？

  /*
    这要追溯至 2007 年初。苹果公司在发布首款 iPhone 前夕，遇到一个问题 —— 当时的网站都是为大屏幕设备所设计的。于是苹果的工程师们做了一些约定，应对 iPhone 这种小屏幕浏览桌面端站点的问题。这当中最出名的，当属双击缩放(double tap to zoom)。这也是会有上述 300 毫秒延迟的主要原因。

    当用户一次点击屏幕之后，浏览器并不能立刻判断用户是要进行双击缩放，还是想要进行单击操作。因此，iOS Safari 就等待 300 毫秒，以判断用户是否再次点击了屏幕。于是，300 毫秒延迟就这么诞生了。
  */

  // 简而言之，FastClick 在检测到 touchend 事件的时候，会通过 DOM 自定义事件立即触发一个模拟click 事件的click事件（自定义事件），并把浏览器在 300 毫秒之后真正触发的 click 事件阻止掉。
}
console.log('-----------15---------');
{
  function Foo() {
    getName = function() {
      console.log(1);
    }
    return this;
  }

  Foo.getName = function(){console.log(2);};
  Foo.prototype.getName = function(){console.log(3);};
  var getName = function(){console.log(4);};
  // function getName(){console.log(5);};

  // 输出结果
  Foo.getName(); // 2
  // getName(); // 4 Identifier 'getName' has already been declared
  Foo().getName(); // 1
  getName(); // 1 Identifier 'getName' has already been declared

  new Foo.getName(); // 2
  new Foo().getName(); // 3
  new new Foo.getName();
}