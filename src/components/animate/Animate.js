import React, { useEffect, useState,Fragment, useCallback,Children,useRef } from 'react';
import { classNames } from '../helper/className';
import { toArrayChildren,isSameChildren } from './ChildrenUtils';

const defaultKey=`wonderful_animation_${Date.now()}`;

//得到默认的react孩子节点
function getChildrenFromProps(props){
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


let isAnimate=true;

const Animate =(AnimateProps)=>{

    const {
       children,
       transitionName,
       transitionEnter,
       transitionAppear,
       transitionLeave
    }=AnimateProps;

    let createRef={}

    const overlayAnimation = [{ opacity: 0 }, { opacity: 0.3 }];
    const animationSettings = { duration: 150, fill: "both" };

    const animateIn = useCallback(() => {
        createRef[toArrayChildren(getChildrenFromProps(AnimateProps)).length-1].current.animate(overlayAnimation, animationSettings);
    }, [animationSettings, overlayAnimation]);

    const [childrenState,setChildrenState]=useState(toArrayChildren(getChildrenFromProps(AnimateProps)));

    function createRefFunc(){
        children.forEach((item,index)=>{
            createRef[index]=useRef(null);
        })
    }

    useEffect(()=>{
        // createRefFunc();
        if(!isSameChildren(children,childrenState)){
         
            setChildrenState(children);
            
        }
        
         
    })

    function getChildren(){
        return childrenState.map((child)=>{
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