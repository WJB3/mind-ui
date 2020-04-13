
//可以让函数依次执行
function createChainedFunction(...params: any[]){
    const args=Array.prototype.slice.call(arguments,0);
    if(args.length===1){
        return args[0];
    }

    return function chainedFunction(){
        for(let i=0;i<args.length;i++){
            if(args[i] && args[i].apply){
                args[i].apply(this,arguments);
            }
        }
    }
}
//判断一个值是否是Null
function isNull(value:any){
    if(!value && typeof(value)!=="undefined" && value!==0){
        return true;
    }
    return false;
}


export {
    createChainedFunction,
    isNull
}