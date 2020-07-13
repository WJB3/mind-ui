import React, { useEffect, Fragment } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useComponentEffects from '../_utils/useComponentEffect';
import Alert from '../Alert';
 
let closeTimer={};//计算关闭的定时器
 
const Notice  = React.forwardRef((NoticeProps,ref) => {
    const {
        effect="grow",
        className,
        message,
        type="normal",
        prefixCls:customizePrefixCls,
        in:inProp,
        duration=1.5,
        keyIndex,
        onCloseEffect,
        direction="top"
    } = NoticeProps;

    const TransitionComponent=useComponentEffects(effect);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("notice", customizePrefixCls);

    function startCloseTimer() {//开始计时的定时器
        //duration 默认为1.5秒。
        if (duration) {
            closeTimer[keyIndex] = setTimeout(() => {
                closeNotice()
            }, duration ? duration * 1000 : 1500)
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
        
        if(onCloseEffect){
            onCloseEffect(keyIndex)
        }
    }

    useEffect(()=>{
        startCloseTimer()
    },[])
    
    return (
        <TransitionComponent in={inProp} unmountOnExit direction={direction}> 
            <Alert className={classNames(prefixCls,className)} type={type}>{message}</Alert>
        </TransitionComponent>
    )
})

export default Notice;