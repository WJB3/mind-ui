import React, { forwardRef, cloneElement, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import useForkRef from '../_utils/useForkRef';

function getTranslateValue(direction,node){
    const rect=node.getBoundingClientRect();
    let transform;
    if(node.fakeTransform){
        transform=node.fakeTransform;
    }else{
        const computedStyle=window.getComputedStyle(node);
        transform=computedStyle.getPropertyValue("-webkit-transform")||
            compoutedStyle.getPropertyValue("transform");
    }
    let offsetX=0;
    let offsetY=0;
    if(transform && transform!=="none"&&typeof transform==="string"){
        const transformValues = transform.split('(')[1].split(')')[0].split(',');
        offsetX = parseInt(transformValues[4], 10);
        offsetY = parseInt(transformValues[5], 10);
    }

    if(direction==="right"){
        return `translateX(${window.innerWidth}px)`;
    }

    if(direction==="left"){
        return `translateX(-${rect.left+rect.width-offsetX}px)`;
    }

    if(direction==="top"){
        return `translateY(-${rect.top+rect.height-offsetY}px)`;
    }

    if(direction==="bottom"){
        return `translateY(${window.innerHeight}px)`;
    }

    return `translateX(-${rect.top+rect.height-offsetY}px)`
}

export function setTranslateValue(direction,node){
    const transform=getTranslateValue(direction,node);
    if(transform){
        node.style.webkitTransform=transform;
        node.style.transform=transform;
    }
}

const Slide = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        in: inProps,
        onEnter,
        onEntering,
        onExit,
        onExited,
        onExtered,
        direction="down",
        ...restProps
    } = props;

    const childrenRef = useRef(null);

    const handleOwnRef = useCallback((instance) => {
        //findDOMNode是获取真实节点的
        childrenRef.current = ReactDOM.findDOMNode(instance);
    }, []);

    const handleRef = useForkRef(ref, handleOwnRef);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("animate-slide", customizePrefixCls);

    const handleEnter = (_, isAppearing) => {
 
        const node=childrenRef.current;
        setTranslateValue(direction,node);
        if(onEnter){
            onEnter(node,isAppearing);
        }
    }

    const handleEntered = (_, isAppearing) => {
        const node=childrenRef.current;
        if(onExtered){
            onExtered(node, isAppearing)
        }
    }

    const handleEntering=(_,isAppearing)=>{
        const node=childrenRef.current;
        node.style.webkitTransition="transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms";
        node.style.transition="transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms";
        node.style.webkitTransform = 'none';
        node.style.transform = 'none';
        if(onEntering){
            onEntering(node,isAppearing);
        }
    }

    const handleExit=()=>{
        const node = childrenRef.current;
        node.style.webkitTransition="transform 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms";
        node.style.transition="transform 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms";
        setTranslateValue(direction,node);
        if(onExit){
            onExit(node)
        }
    }

    const handleExited=()=>{
        const node = childrenRef.current;
        node.style.webkitTransition="";
        node.style.transition="";
        if(onExited){
            onExited(node);
        }
    }

    return <CSSTransition
        classNames={classNames(classNames(prefixCls))}
        appear
        in={inProps}
        timeout={300}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onExit={handleExit}
        onExited={handleExited}
        onEntered={handleEntered}
        {...restProps}
    >
        {
            (state, childProps) => {
                return cloneElement(children, {
                    ref: handleRef,
                    style: {
                        visibility: state === 'exited' && !inProps ? "hidden" : undefined,
                        ...children.props.style,
                    },
                    ...childProps
                })
            }
        }
    </CSSTransition>
});

export default Slide;