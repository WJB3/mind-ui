var now=performance.now,
    root=typeof window==='undefined'?global:window,
    vendors=['moz','webkit'],
    suffix='AnimationFrame',
    raf=root['request'+suffix],
    caf=root['cancel'+suffix]||root['cancelRequest'+suffix];

for(let i=0;!raf&&i<vendors.length;i++){
    raf=root[vendors[i]+'Request'+suffix]
    caf=root[vendors[i]+'Cancel'+suffix]||root[vendors[i]+'CancelRequest'+suffix]
}

if(!raf||!caf){
    var last=0,id=0,queue=[],frameDuration=1000/60;

    raf=function(callback){
        if(queue.length===0){
            var _now=now(),next=Math.max(0,frameDuration-(_now-last));
            last=next+_now;
            setTimeout(function(){
                var cp=queue.slice(0);
                queue.length=0;
                for(let i=0;i<cp.length;i++){
                    if(!cp[i].cancelled){
                        try{
                            cp[i].callback(last)
                        }catch(e){
                            setTimeout(function(){throw e},0)
                        }
                    }
                }
            },Math.round(next));
        }
        queue.push({
            handle:++id,
            callback:callback,
            cancelled:false
        })
        return id;
    }

    caf=function(handle){
        for(let i=0;i<queue.length;i++){
            if(queue[i].handle===handle){
                queue[i].cancelled=true
            }
        }
    }
}

export {
    raf
}
// export function t(){
//     return raf.call(root,fn);
// }

// export function raf(fn){
//     return raf.call(root,fn);
// }

// export function cancelRaf(){
//     caf.apply(root,arguments);
// }
