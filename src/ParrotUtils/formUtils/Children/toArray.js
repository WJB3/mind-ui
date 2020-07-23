import React from 'react';

export default function toArray(children){
    let ret=[];

    React.Children.forEach(children,(child)=>{
        if(child===undefined || child===null){
            return ;
        }

        if(Array.isArray(child)){
            ret=ret.concat(toArray(child));
        }else if(React.isValidElement(child) &&child.props){
            ret=ret.concat(toArray(child.props.children))
        }else{
            ret.push(child);
        }
    });

    return ret;
}