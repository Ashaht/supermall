//节流
//括号里可以写成delay=50来给delay一个默认值
export function debounce(func, delay) {
  let timer = null

  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

//格式化时间戳
//正则表达式是干什么的? 字符串匹配 利器(难, 规则太多)
export function formatDate(date, fmt) {
  // 1.获取年份
  //y+ -> 1个或者多个y
  //y* -> 0个或者多个y
  //y? -> 0个或者1个y
  // yyyy - 2019
  // yy - 19
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 2.获取
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

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};