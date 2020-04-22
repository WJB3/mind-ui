import React from 'react';
import { raf } from './raf';

//React对象转数组
export function toArray(children){
    const ret = [];
    React.Children.forEach(children, function each(c) {
        ret.push(c);
    });
    return ret;
}
//节流函数
export function throttle(func,wait){
  
    let previous=0;
    return function(){
        let now=Date.now();
        let context=this;
        let args=arguments;
        if(now-previous>wait){
            func.apply(context,args);
            previous=now;
        }
    }
}
//判断是否是window对象
export function isWindow(obj){
    return obj!==null && obj!==undefined && obj===obj.window;
}

export function getScroll(target,top){
  
    if(typeof window==="undefined"){
        return 0;
    }
    const method = top ? 'scrollTop' : 'scrollLeft';
    let result=0;
    if(isWindow(target)){
        result=target[top?`pageYOffset`:"pageXOffset"];
    }else if(target instanceof Document){
        result=target.documentElement[method];
    }else if(target){
        result=target[method];
    }
    if (target && !isWindow(target) && typeof result !== 'number') {
        result = (target.ownerDocument ||  Document.documentElement)[method];
    }
    return result;
}

export function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
      return (cc / 2) * t * t * t + b;
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}
 
export function scrollTo(y, options) {
    const { getContainer=window, callback, duration = 450 } = options;
  
    const container = getContainer;
    const scrollTop = getScroll(container, true);
    const startTime = Date.now();
  
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
      if (isWindow(container)) {
        container.scrollTo(window.pageXOffset, nextScrollTop);
      } else if (container instanceof Document) {
        container.documentElement.scrollTop = nextScrollTop;
      } else {
        container.scrollTop = nextScrollTop;
      }
      if (time < duration) {
        raf(frameFunc);
      } else if (typeof callback === 'function') {
        callback();
      }
    };
    raf(frameFunc);
}
