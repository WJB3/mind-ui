import React, { useCallback, useState, cloneElement, useRef, forwardRef, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import ReactDOM from 'react-dom';
import setRef from '../_utils/setRef';

import "./index.scss";

const Carousel = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children: childrenProps,
        style,
        loop,
        interval = 1000,
        axis = "x",
        duration = 1000,
        ...restProps
    } = props;

    const wrapperRef=useRef(null);

    const { getPrefixCls } = React.useContext(ConfigContext);
    //获取当前可视区容器宽度
    const prefixCls = getPrefixCls("carousel", customizePrefixCls);

    const classes = classNames(prefixCls, className, `${prefixCls}-wrapper`);

    const [children, setChildren] = useState([].concat(childrenProps || []));//children

    const [current, setCurrent] = useState(0);//current

    const [childrenWidth, setChildrenWidth] = useState(0);

    const [childrenHeight, setChildrenHeight] = useState(0);

    useEffect(() => {
        prepareAutoSlide();
    }, []);

    const prepareAutoSlide = React.useCallback(() => {
        if (children.length < 2) return;
        if (loop) {
            const slideTimeoutID = setTimeout(this.autoSlide, interval)

        }
    }, [children]);

    const updateFrameSize=React.useCallback((cb) =>{
        const { width, height } = window.getComputedStyle(this.wrapperRef.current);
        setChildrenWidth(width);
        setChildrenHeight(height);
    },[this.wrapperRef])

    const transitFramesTowards = ((direction) => {
        const { prev, current, next } = this.state.movingFrames
        const { duration, axis, onTransitionEnd } = this.props

        let newCurrentId = this.state.current
        switch (direction) {
            case 'up':
                translateXY(current, 0, -this.state.frameHeight, duration)
                translateXY(next, 0, 0, duration)
                newCurrentId = this.getFrameId('next')
                break
            case 'down':
                translateXY(current, 0, this.state.frameHeight, duration)
                translateXY(prev, 0, 0, duration)
                newCurrentId = this.getFrameId('prev')
                break
            case 'left':
                translateXY(current, -this.state.frameWidth, 0, duration)
                translateXY(next, 0, 0, duration)
                newCurrentId = this.getFrameId('next')
                break
            case 'right':
                translateXY(current, this.state.frameWidth, 0, duration)
                translateXY(prev, 0, 0, duration)
                newCurrentId = this.getFrameId('prev')
                break
            default: // back to origin
                translateXY(current, 0, 0, duration)
                if (axis === 'x') {
                    translateXY(prev, -this.state.frameWidth, 0, duration)
                    translateXY(next, this.state.frameWidth, 0, duration)
                } else if (axis === 'y') {
                    translateXY(prev, 0, -this.state.frameHeight, duration)
                    translateXY(next, 0, this.state.frameHeight, duration)
                }
        }
    }, [])


    // auto slide to 'next' or 'prev'
    const autoSlide = React.useCallback((rel) => {
        switch (rel) {
            case 'prev':
                this.transitFramesTowards(axis === 'x' ? 'right' : 'down')
                break
            case 'next':
            default:
                this.transitFramesTowards(axis === 'x' ? 'left' : 'up')
        }

        // prepare next move after animation
        setTimeout(() => this.prepareAutoSlide(), duration)
    }, []);

    return (
        <div className={classes}>
            <div ref={wrapperRef} className={classNames(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-hidden`)}>
                {
                    React.Children.map(children, (child, index) => {
                        const only = index + 1;
                        return <div ref={`itemRef${only}`}
                            key={only}
                            style={{ zIndex: 99 - only }}>
                            {child}
                        </div>
                    })
                }
            </div>
        </div>
    )
});

export default Carousel;