import React, { useState, useEffect, Fragment,useRef } from 'react';
import { classNames } from '../helper/className';
import "./../styles/notification.scss";
import Animate from '../animate/Animate';
import { useAnimate } from '../_utils/hooks';
import Ripple from '../../BaseRipple';
import Icon from '../icon';

let closeTimer;//计算关闭的定时器
let classTimer;//去除class的定时器

 
const Notice  = (NoticeProps) => {


    const {
        duration,
        onClose,
        children,
        keyIndex,
        message,
        description,
        isCloseAuto,
        status,
        backgroundColor,
        icon,
        btn,
        style={}
    } = NoticeProps;

    const { onRemove, onLeave, className } = useAnimate({ className: "item-wrapper",delay:250 });

    function startCloseTimer() {//开始计时的定时器
        //duration 默认为1.5秒。
        if (duration && !isCloseAuto) {
            closeTimer[keyIndex] = setTimeout(() => {
                closeNotice()
            }, duration ? duration * 1000 : 1500)
        }
    }

    function startClassNameTimer() {
        if (className) {
            classTimer = setTimeout(() => {
                onRemove()
            }, 300)
        }
    }

    function clearCloseTimer() {//清除定时器
        if (closeTimer[keyIndex]) {
            clearTimeout(closeTimer[keyIndex]);
            closeTimer[keyIndex] = null;
        }
    }

    function closeNotice() {//关闭notice提醒
     
        clearCloseTimer();
        
        if (onClose) {
            onLeave().then(() => {
                onClose()
            })
        }
    }

    function restartCloseTimer() {//重启关闭组件的定时器。重启前，先清除定时器。
        clearCloseTimer();
        startCloseTimer();
    }

    function handleClose(){
        closeNotice()
    }

    useEffect(() => {
        startClassNameTimer()
        startCloseTimer()
    }, [])

    const classes = classNames("wonderful-notice", "item-wrapper", [className]);
    
    return (
            <Ripple
                component="div"
                className={classes}
                onMouseEnter={() => clearCloseTimer()}
                onMouseLeave={() => startCloseTimer()}
                key={keyIndex}
                style={backgroundColor?{backgroundColor:backgroundColor,...style}:{...style}}
            >
               
                <div className={"wonderful-notice-content"} style={(status||!!icon)?{display:"flex"}:{}}>
                    { status && <div  className={classNames(`wonderful-notice-icon-${status}`,'wonderful-notice-icon')} ><Icon name={status}/></div>}
                    {!status && !!icon && <div  className={classNames(`wonderful-notice-icon-${status}`,'wonderful-notice-icon')} >{icon}</div>}
                    <div style={(status||!!icon||btn)?{flex:1,display:"flex",flexDirection:"column"}:{}}>
                        <div className={"wonderful-notice-message"}>{message}</div>
                        <div className={"wonderful-notice-description"}>{description}</div>
                        { btn && <div className={"wonderful-notice-content-close"} >{btn}</div>}
                    </div>
                </div>
                <div className={"wonderful-notice-close"} onClick={handleClose}>
                    <Icon name={"close"} />
                </div>
            </Ripple>

    )
}

export default Notice;