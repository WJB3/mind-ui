import React, { useState,useEffect } from 'react';
import { classNames } from './../helper/className';
import "./../styles/notification.scss";
 
let closeTimer:any;//计算关闭的定时器

interface NoticeProps{
    duration?:number,//组件挂载多久后关闭
    children?:any,//子元素
    onClose?:()=>{},//关闭的回调函数,
    keyIndex?:string
}

const Notice:React.FunctionComponent<NoticeProps>=(NoticeProps)=>{

    const {
        duration,
        onClose,
        children,
        keyIndex
    }=NoticeProps;
    
    function startCloseTimer(){//开始计时的定时器
        //duration 默认为1.5秒。
        if(duration){
            closeTimer=setTimeout(()=>{
                closeNotice()
            },duration?duration*1000:1500)
        }
    }

    function clearCloseTimer(){//清除定时器
        if(closeTimer){
            clearTimeout(closeTimer);
            closeTimer=null;
        }
    }

    function closeNotice(){//关闭notice提醒
        clearCloseTimer();
        if(onClose){
            onClose()
        }
    }

    function restartCloseTimer(){//重启关闭组件的定时器。重启前，先清除定时器。
        clearCloseTimer();
        startCloseTimer();
    }

    useEffect(()=>{
        startCloseTimer()
        restartCloseTimer()
    })

    const classes=classNames("wonderful-notice")
  
    return(
        <div 
            className={classes} 
            onMouseEnter={()=>clearCloseTimer()}
            onMouseLeave={()=>startCloseTimer()}    
            key={keyIndex}
        >
           {children}
        </div>
    )
}

export default Notice;