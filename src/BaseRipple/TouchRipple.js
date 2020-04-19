import React,{useState} from 'react';
import { classNames } from './../components/helper/className';
import { getOffset } from './../components/helper/dom';
import { globalPrefix } from './../_config/variable';
import { TransitionGroup } from 'react-transition-group';
import Ripple from './Ripple';
import "./index.scss";
const componentName = "TouchRipple";

const TouchRipple = React.forwardRef((props, ref) => {

    const {
        disabled,
        rippleStyle,
        color,
        center,
        ...other
    }=props;

    const [circleRipples,setCircleRipples]=useState([]);

    const nextKey=React.useRef(0);

    const container=React.useRef(null);

    function getRippleStyle(event){
        const el= container?container.current:null;
        if (!el) return;
        const offset = getOffset(el);
        const elHeight = el.offsetHeight;
        const elWidth = el.offsetWidth;
        const isTouchEvent = event.touches && event.touches.length;
        const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
        const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
        const pointerX = pageX - offset.left;
        const pointerY = pageY - offset.top;
        const topLeftDiag = calcDiag(pointerX, pointerY);
        const topRightDiag = calcDiag(elWidth - pointerX, pointerY);
        const botRightDiag = calcDiag(elWidth - pointerX, elHeight - pointerY);
        const botLeftDiag = calcDiag(pointerX, elHeight - pointerY);
        const rippleRadius = Math.max(
            topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
        );
        const rippleSize = rippleRadius * 2;
        const left = pointerX - rippleRadius;
        const top = pointerY - rippleRadius;

        if(center){
            return {
                height: elWidth + 'px',
                width: elWidth + 'px',
                top: 0,
                left: 0,
            }
        }
 
        return {
            height: rippleSize + 'px',
            width: rippleSize + 'px',
            top: top + 'px',
            left: left + 'px',
        };
    }

    function calcDiag (a, b) {//勾股定理求得对角线长度
        return Math.sqrt((a * a) + (b * b));
    }

    const start=React.useCallback(
        (event={},options={},cb)=>{
            const {

            }=options;
            
            setCircleRipples((oldRipples)=>[
                ...oldRipples,
                <Ripple 
                    key={nextKey.current}
                    style={getRippleStyle(event)}
                />
            ]);
            nextKey.current += 1;
        },[]
    )

    const stop=React.useCallback(()=>{
        setCircleRipples((oldRipples)=>{
            if(oldRipples.length>0){
                return oldRipples.splice(1);
            }
            return oldRipples;
        });
    },[]);

    React.useImperativeHandle(
        ref,
        ()=>({
            start,
            stop,
        }),
        [start,stop]
    )

    const classes=classNames(
        `${globalPrefix}-${componentName}`,
    )

    return (
        <span className={classNames(classes)} ref={container} {...other}>
            <TransitionGroup component={null} exit exter>
                {
                    circleRipples
                }
            </TransitionGroup>
        </span>
    )

});

export default TouchRipple;