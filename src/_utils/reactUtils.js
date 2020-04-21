import React from 'react';

export function toArray(children){
    const ret = [];
    React.Children.forEach(children, function each(c) {
        ret.push(c);
    });
    return ret;
}