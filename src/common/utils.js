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