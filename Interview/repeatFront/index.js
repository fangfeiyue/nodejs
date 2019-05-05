/*
1.为什么有的编程规范要求使用void 0代替undefined
2.字符串有最大长度吗
3.0.1+0.2等于0.3吗？为什么js里不是这样的
4.ES6新加入的Symbol是什么？
5.为什么给对象添加的方法能用在基本类型上
6.七种数据类型
- undefined
- null
- boolean
- string
- number
- symbol
- object
*/

// javascript的代码undefined是一个变量，而并非是一个关键字，这是js语言公认的设计失误之一，所以，我们为了避免无意中被篡改，建议使用void 0来获取undefined值
const a = undefined;
let b = void 0;




//js中+0和-0在加法运算中它们没有区别，但是除法的场合则需要特别留意区分。
console.log(1/0); //Infinity 无穷大
console.log(1/-0); //-Infinity 无穷小



// 非整型number类型无法使用==和===来比较
console.log(0.1 + 0.2); // 0.30000000000000004
// 正确的比较方法是使用js提供的最小经度值
console.log(Math.abs(0.1+0.2-0.3) <= Number.EPSILON); // true



// Symbol
let mySymbol = Symbol('my Symbol');
console.log(mySymbol); // Symbol(my Symbol)



// Number、String 和 Boolean，三个构造器是两用的，当跟new搭配时，它们产生对象，当直接调用时，他们表示强制类型转换
console.log(new Number(3), 3 == new Number(3), 3 === new Number(3)); // Number true false



// 原生如何检测一个变量是否是一个数组
{
  const arr =[1, 2, 3];
  function isArray(value) {
    if (Array.isArray === "function") {
      return Array.isArray(value);
    }else {
      return Object.prototype.toString.call(value)==='[object Array]';
    }
  }
  
  console.log(isArray(arr), Object.prototype.toString.call(arr)); // true
}




// typeof
console.log(typeof undefined, typeof [1,2] ,typeof null, typeof NaN, typeof function(){}); // undefined object object number function


// undefined是否可以被赋值

undefined = null;
console.log(undefined); // undefined

function testUndefined() {
  var undefined = 2;
  console.log(undefined); // 2
}
testUndefined();