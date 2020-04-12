import React from 'react';

export function toArrayChildren(children:any){
    const ret:any=[];
    React.Children.forEach(children,(child)=>{
        ret.push(child);
    });
    return ret;
}

export function isSameChildren(c1:any,c2:any){
    let same=c1.length===c2.length;
    if(same){
        c1.forEach((child:any,index:any)=>{
            const child2=c2[index];
            if (child && child2) {
                if ((child && !child2) || (!child && child2)) {
                  same = false;
                } else if (child.key !== child2.key) {
                  same = false;
                }
              }
        })
    }
    return same;
}