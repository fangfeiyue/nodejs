// 本代码仅在chrome浏览器测试过

const res = { 
  "code": 0,
  "data": { 
    "lines": "20路,301路,5路,地铁5号线,机场大巴线,107路,机场快轨", 
    "lineids": "lzbd,lwes,lxid,lwic,lwdf,ldfx,loin", 
    "linedetails": {
      "lwdf": { "name": '机场大巴线' },
      "lwes": { "name": '301路' }, 
      "lwic": { "name": '地铁5号线' }, 
      "ldfx": { "name": '107路' }, 
      "lzbd": { "name": '20路' },
      "lxid": { "name": '5路' },
      "loin": { "name": '机场快轨' }
    }
  }
};
function sortNumber(a, b){
  return a - b;
}
function sortString(a, b){
  if (a.length > b.length) {
      return 1
  }
  if (a.length < b.length) {
      return -1
  }
  return 0
}
function getBusLines(arr, ids, linedetails) {
  const regex = /\d+路$/g;
  return arr.filter(item=>item.match(regex)).map(item=>parseInt(item)).sort(sortNumber).map(item=>item+'路')
}
function getSubwayLines(arr, ids, linedetails) {
  const regex = /^地铁\d+/;
  return arr.filter(item=>item.match(regex)).map(item=>item.replace(/[^0-9]/ig,"")).sort(sortNumber).map(item=>`地铁${item}号线`)
}
function getOtherLines(arr, busAndSubwayLines) {
  let a = arr.concat(busAndSubwayLines).filter(function(v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  });
  a = a.sort(sortString);
  return busAndSubwayLines.concat(a);
}
function parse(res) {
  const { lines, lineids, linedetails } = res.data;
  const arr = lines.split(',');
  const ids = lineids.split(',');

  let busLines = getBusLines(arr, ids, linedetails);
  let subwayLines = getSubwayLines(arr, ids, linedetails);
  let busAndSubwayLines = busLines.concat(subwayLines);
  let result = getOtherLines(arr, busAndSubwayLines).map(item=>{
    let index = arr.indexOf(item);
    return {[ids[index]]: linedetails[ids[index]]};
  });
  
  console.log(result);
}
parse(res);

/*
[{ lxid: { name: '5路' } }, 
{ lzbd: { name: '20路' } }, 
{ ldfx: { name: '107路' } }, 
{ lwes: { name: '301路' } }, 
{ lwic: { name: '地铁5号线' } }, 
{ loin: { name: '机场快轨' } },
{ lwdf: { name: '机场大巴线' } }]
 */
