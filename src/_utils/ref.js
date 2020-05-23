import React from 'react';

export function fillRef(ref,node){
    if(typeof ref==="function"){
        ref(node);
    }else if(typeof ref==="object" && ref && 'current' in ref){
        ref.current=node;
    }
}

export function composeRef(...refs){
    return (node)=>{
        refs.forEach(ref=>{
            fillRef(ref,node);
        })
    }
}

export function supportRef(nodeOrComponent){
    //Function component node
    if(nodeOrComponent.type &&
        nodeOrComponent.type.prototype &&
        !nodeOrComponent.type.prototype.render){
            return false;
    }
    //Class component
    if (
        typeof nodeOrComponent === 'function' &&
        nodeOrComponent.prototype &&
        !nodeOrComponent.prototype.render
    ) {
        return false;
    }

    return true;
}