import React from 'react';

export function toArrayChildren(children){
    const ret=[];
    React.Children.forEach(children,(child)=>{
        ret.push(child);
    });
    return ret;
}

export function isSameChildren(c1,c2){
    let same=c1.length===c2.length;
    if(same){
        c1.forEach((child,index)=>{
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