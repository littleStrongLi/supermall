//防抖函数
export function debounce(func, delay){
  let timer = null;
  //...args可以传入一个或多个参数
  return function (...args){
    if(timer) clearTimeout(timer);

    timer = setTimeout(()=>{
      func.apply(this, args)
    }, delay)
  }
}

//
export function formatDate(date, fmt) {
  //获取年份（2019）
  //yyyy -- 2019
  //yy -- 19
  //y -- 9
  //yyy -- 019
  //y+ -- 表示1个或者多个y
  //y* -- 表示0个或者多个y
  //y? -- 表示0个或者1个y
  
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};