import React, { useEffect, useState,Fragment, Children,useRef } from 'react';
import { classNames } from './../helper/className';
import "./../styles/c_animation.scss";
import { toArrayChildren,isSameChildren } from './ChildrenUtils';

const defaultKey=`wonderful_animation_${Date.now()}`;

//得到默认的react孩子节点
function getChildrenFromProps(props:any){
    const children=props.children;
    if(React.isValidElement(children)){
        if(!children.key){
            return React.cloneElement(children,{
                key:defaultKey
            })
        }
    }
    return children;
}

interface AnimateProps{
    children?:any,
    transitionName?:string,
    transitionEnter?:boolean,
    transitionAppear?:boolean,
    transitionLeave?:boolean
}

let isAnimate=true;

const Animate:React.FunctionComponent<AnimateProps>=(AnimateProps)=>{

    const {
       children,
       transitionName,
       transitionEnter,
       transitionAppear,
       transitionLeave
    }=AnimateProps;

    const [childrenState,setChildrenState]=useState(toArrayChildren(getChildrenFromProps(AnimateProps)));

    function createRefFunc(){
         
    }

    useEffect(()=>{
        if(!isSameChildren(children,childrenState)){
            setChildrenState(children)
        }
        console.log(children);
        console.log(childrenState);
    })

    function getChildren(){
        return childrenState.map((child:any)=>{
            if(child===null||child===undefined){
                return child;
            }
            if(!child.key){
                throw new Error("must set key from <animate> children");
            }
            return <Fragment key={child.key}>
                {child}
            </Fragment>
        })
    }

    const classes=classNames("wonderful-animate")
  
    return getChildren()
}

export default Animate;