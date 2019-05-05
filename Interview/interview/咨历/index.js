let arr1 = [1,1,2,3,4,5,4,3,4];
let arr2 = [4,5,6,7,8,9,4,6,7];

// 两个数组的并集
const result = Array.from(new Set(arr1.concat(arr2)));
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 两个数组的交集

// 两个数组中重复元素最多的π