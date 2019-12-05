import * as React from 'react';

function toArrayChildren(children){
    const ret=[];
    React.Children.forEach(children,c=>{
        ret.push(c);
    });
    return ret;
}



export {
    toArrayChildren,
}