

export function areInputsEqual(newInputs,lastInputs){
    if(newInputs.length!==lastInputs.length){
        return false;
    }

    for(let i=0;i<newInputs.length;i++){
        if(newInputs[i]!==lastInputs[i]){
            return false;
        }
    }

    return true;
}

export default function memoizeOne(resultFn,isEqual=areInputsEqual){
    let lastThis;
    let lastArgs=[];
    let lastResult;
    let calledOnce=false;

    function memoized(...newArgs){ 
        if(calledOnce && lastThis===this && isEqual(newArgs,lastArgs)){
            return lastResult;
        }

        lastResult=resultFn.apply(this,newArgs);
        calledOnce=true;
        lastThis=this;
        lastArgs=newArgs;
        return lastResult;
    }

    return memoized;
}