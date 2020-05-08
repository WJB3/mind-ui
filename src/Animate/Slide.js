import React, { forwardRef, cloneElement, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import useForkRef from '../_utils/useForkRef';

function getTranslateValue(direction,node){
    const rect=node.getBoundingClientRect();
    console.log(node)
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

    if(direction==="left"){
        return `translateX(${window.innerWidth}px) `
    }
}

export function setTranslateValue(direction,node){

}

const Slide = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        in: inProps,
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
    }

    return <CSSTransition
        classNames={classNames(classNames(prefixCls))}
        appear
        in={inProps}
        timeout={300}
        onEnter={handleEnter}
        {...restProps}
    >
        {
            (state, childProps) => {
                return cloneElement(children, {
                    ref: handleRef,
                    style: {
                        visibility: state === 'exited' && !inProps ? "hidden" : undefined
                    },
                    ...childProps
                })
            }
        }
    </CSSTransition>
});

export default Slide;