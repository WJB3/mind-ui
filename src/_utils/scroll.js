export function scrollIt(
    destination = 0,
    duration = 200,
    easing = "linear",
    callback
) {
    let easings = {
        linear(t) {
            return t;
        },
        easeInQuad(t) {
            return t * t;
        },
        easeOutQuad(t) {
            return t * (2 - t);
        },
        easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
            return t * t * t;
        },
        easeOutCubic(t) {
            return --t * t * t + 1;
        },
        easeInQuart(t) {
            return t * t * t * t;
        },
        easeOutQuart(t) {
            return 1 - --t * t * t * t;
        },
        // acceleration until halfway, then deceleration
        easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        },
        // accelerating from zero velocity
        easeInQuint(t) {
            return t * t * t * t * t;
        },
        // decelerating to zero velocity
        easeOutQuint(t) {
            return 1 + --t * t * t * t * t;
        },
        // acceleration until halfway, then deceleration
        easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
        }
    }
    // requestAnimationFrame()的兼容性封装：先判断是否原生支持各种带前缀的
    //不行的话就采用延时的方案
    (
        function(){
            var lastTime=0;
            var vendors=["ms","moz","webkit","o"];
            for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){
                window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"];
                window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"] ||
                    window[vendors[x]+"CancelRequestAnimationFrame"];
            }
            if(!window.requestAnimationFrame){
                window.requestAnimationFrame=function(callback,element){
                    var currTime=new Date().getTime();
                    var timeToCall=Math.max(0,16-(currTime-lastTime));
                    var id=window.setTimeout(function(){
                        callback(currTime+timeToCall);
                    },timeToCall);
                    lastTime=currTime+timeToCall;
                    return id;
                }
            }
            if(!window.cancelAnimationFrame){
                window.cancelAnimationFrame=function(id){
                    this.clearTimeout(id);
                };
            }
        }
    )();

    let startTime=Date.now();

    function scroll(){
        let now=Date.now();
        let time=Math.min(1,(now-startTime)/duration);
        let timeFunction=easings[easing](time);
    }
}