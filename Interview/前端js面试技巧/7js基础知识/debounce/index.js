// window.onscroll = _.debounce(printMsg, 2000, 5000);

// function printMsg () {
//   console.log(1)
// }


{
  function debounce(fn, delay) {
    var timer; // 维护一个 timer
    return function () {
      var _this = this; // 取debounce执行作用域的this
      var args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
      }, delay);
    };
  }

  function testDebounce(e, content) {
    console.log('函数防抖');
  }

  var testDebounceFn = debounce(testDebounce, 1000); // 防抖函数

  // 测试代码
  document.onmousemove = function (e) {
    testDebounceFn(e, 'debounce');
  };
}

{
  function throttle(fn, delay) {
    let timer;
    return function () {
      const _this = this;
      const args = arguments;

      if (timer) {
        return;
      }

      timer = setTimeout(function () {
        fn.apply(_this, args);
        timer = null;
      }, delay);
    }
  }

  function testThrottle(e, content) {
    console.log(e, content);
  }

  const testThrottleFn = throttle(testThrottle, 2000); // 节流函数

  document.onmousemove = function(e) {
    testThrottleFn(e, '节流');
  };

  const obj = {
    name: 'fang',
    test(){
      setTimeout(() => {
        console.log(this, this.name);
      }, 1000);
    },
    test1(){
      setTimeout(function() {
        console.log(this, this.name);
      }, 1000);
    }
  };

  obj.test();
  obj.test1();
}