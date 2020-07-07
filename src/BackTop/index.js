import React, { useEffect,useState,useRef,useContext,useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { throttle,scrollTo,getScroll } from '../_utils/reactUtils';
import { ConfigContext } from '../ConfigContext';
import { Zoom } from '../Animate';
import "./index.scss";
import Button from '../ButtonBase';

const BackTop = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        target,
        children,
        visibilityHeight=400,
        onClick,
        style,
        ...restProps
    } = Props;

    const divRef=useRef(null);

    const scrollEvent=useRef(null);

    const [ visible,setVisible ]=useState(false);

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("backtop",customizePrefixCls);

    const scrollToTop=useCallback((e)=>{
        
        scrollTo(0,{
            getContainer: target || getDefaultTarget()
        })
        if(onClick){
            onClick(e)
        }
    },[])

    const getDefaultTarget=useCallback(()=>{
        return divRef && divRef.current && divRef.current.ownerDocument?divRef.current.ownerDocument:window;
    },[divRef]);

  
    const handleScroll=useCallback((e,wait)=>{
 
        return throttle(function(){
       
            let scroll=getScroll(e.target,true);
        
            if(scroll>visibilityHeight){
                setVisible(true)
            }else{
                setVisible(false)
            }
        },wait) 
    },[visible]);


    const bindScrollEvent=()=>{
        const container=target || getDefaultTarget(); 
        scrollEvent.current=container.addEventListener("scroll",(e)=>handleScroll(e,20)());
    };
    
   
    useEffect(()=>{
        bindScrollEvent()
    },[target]);

    return (
        <div className={
            classNames(prefixCls,className)
        } {...restProps} ref={divRef} onClick={scrollToTop}>
            <Zoom in={visible}><Button icon="arrow-upward" type={"danger"} shape="circle" float size={"large"} /></Zoom>
        </div>
    )
}

export default BackTop;