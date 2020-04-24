import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { CSSTransition } from 'react-transition-group';
import useForkRef from '../_utils/useForkRef';
import "./index.scss";

function getTranslateValue(direction, node) {
    const rect = node.getBoundingClientRect();
    let transform;
    if (node.fakeTransform) {
        transform = node.fakeTransform;
    } else {
        const computedStyle = window.getComputedStyle(node);
        transform = computedStyle.getPropertyValue('-webkit-transform') ||
            computedStyle.getPropertyValue('transform');
    }
    let offsetX = 0;
    let offsetY = 0;
    if (transform && transform !== 'none' && typeof transform === 'string') {
        const transformValues = transform.split('(')[1].split(')')[0].split(',');
        offsetX = parseInt(transformValues[4], 10);
        offsetY = parseInt(transformValues[5], 10);
    }
    if (direction === 'left') {
        return `translateX(${window.innerWidth}px) translateX(-${rect.left - offsetX}px)`;
    }

    if (direction === 'right') {
        return `translateX(-${rect.left + rect.width - offsetX}px)`;
    }

    if (direction === 'up') {
        return `translateY(${window.innerHeight}px) translateY(-${rect.top - offsetY}px)`;
    }

    // direction === 'down'
    return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

export function setTranslateValue(direction, node) {
    const transform = getTranslateValue(direction, node);
    if (transform) {
        node.style.webkitTransform = transform;
        node.style.transform = transform;
    }
}

const Slide = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        in: inProp,
        direction = "down",
        isDestory = true
    } = Props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("animate-zoom", customizePrefixCls);

    const childrenRef = React.useRef(null);

    const handleOwnRef = React.useCallback((instance) => {
        // #StrictMode ready
        childrenRef.current = ReactDOM.findDOMNode(instance);
    }, []);

    const handleRefIntermediary = useForkRef(children.ref, handleOwnRef);

    const handleRef = useForkRef(handleRefIntermediary, ref);

    const handleEnter = (_, isAppearing) => {
        const node = childrenRef.current;
        setTranslateValue(direction, node);
    }

    return (
        <CSSTransition
            in={inProp}
            timeout={300}
            classNames={classNames(prefixCls)}
            onEnter={handleEnter}
            unmountOnExit={isDestory}
        >
            {
                React.cloneElement(children, {
                    ref: handleRef
                })
            }
        </CSSTransition>

    )
});

export default Slide;