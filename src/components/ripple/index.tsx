import React,{ useState,useRef,useEffect } from 'react';
import { classNames } from './../helper/className';
import { getOffset } from './../helper/dom';
import "./../styles/ripple.scss";
import CircleRipple from './CircleRipple';
import { TransitionGroup } from 'react-transition-group';

interface RippleProps{
    children?:any,
    onClick?:()=>void,
    disabled?:boolean
}

const Ripple:React.FunctionComponent<RippleProps>=(RippleProps)=>{

    const {
        disabled
    }=RippleProps;

    const rippleWrapperRef=useRef(null);

    const [ circleRipple,setCircleRipple]=useState<any[]>([]);

    const [ nextKey,setNextKey]=useState(0);

    const classes=classNames("wonderful-ripple-wrapper");

    function calcDiag (a:any, b:any) {//勾股定理求得对角线长度
        return Math.sqrt((a * a) + (b * b));
    }

    function getRippleStyle(event:any){
        const el:any = rippleWrapperRef?rippleWrapperRef.current:"";
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
        return {
            directionInvariant: true,
            height: rippleSize + 'px',
            width: rippleSize + 'px',
            top: top + 'px',
            left: left + 'px'
        };
    }

    function handleMouseDown(event:any){//鼠标按下时触发
        if(disabled) return ;
        setCircleRipple([...circleRipple,{key:nextKey,style:getRippleStyle(event)}])
        setNextKey(nextKey+1);
    }

    function handleMouseUp(event:any){//鼠标左键松开时触发
        if (circleRipple.length === 0) return;
        circleRipple.splice(0,1);
        setCircleRipple([...circleRipple]);
    }

    useEffect(() => {
         
    });

    return(
        <div 
            className={classes} 
            onMouseDown={(event)=>handleMouseDown(event)} 
            ref={rippleWrapperRef} 
            onMouseUp={(event)=>handleMouseUp(event)}
        >
            <TransitionGroup
                component={null}
                enter
                exit
            >
                {
                    circleRipple.map(item=><CircleRipple key={item.key} mergeStyle={item.style}  />)
                }
            </TransitionGroup>
            
        </div>
    )
}

export default Ripple;