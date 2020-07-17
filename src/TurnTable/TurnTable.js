import React,{useState,useRef, useEffect} from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import PropTypes from 'prop-types';
import Paper from '../Paper';
import "./index.scss";

const TurnTable = React.forwardRef((props,ref) => {
 
    const {
        prefixCls:customizePrefixCls,
        className,
        style,
        width=500,
        height=500,
        prizes=["奖品1","奖品2","奖品3","奖品4"]
    } = props;

    const [isRotate,setRotate]=useState(false);

    const [startRotate,setStartRotate]=useState(0);
    const [rotateTime ,setRotateTime]=useState(0);
    const [rotateAllTime ,setRotateAllTime]=useState(0);
    const [rotateChange ,setRotateChange]=useState(0);
    const [awardRotate  ,setAwardRotate ]=useState(0); 
 
    const canvasRef=useRef(null);

    const ctxRef=useRef(null);

    const centerPosition=useRef({x:0,y:0});

    const R_Message=useRef({R:0,TEXT_R:0,INSERT_R:0});

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("turntable", customizePrefixCls);

    const compatibilityFrame=()=>{
        window.requestAnimationFrame=(()=>{
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                (callback=>window.setTimeout(callback,1000/60))
            )
        })()
        window.cancelAnimationFrame=window.cancelAnimationFrame || window.mozCancelAnimationFrame
    }

    const initTurntable=()=>{
        setStartRotate(0);
        setRotateTime(0);
        setRotateAllTime(0);
        setRotateChange(0);
        ctxRef.current=canvasRef.current.getContext("2d");
        canvasRef.current.width=width;
        canvasRef.current.height=height;

        setAwardRotate((Math.PI * 2) / prizes.length);

        centerPosition.current={x:canvasRef.current.width/2,y:canvasRef.current.height/2}

    }

    useEffect(()=>{
        compatibilityFrame();
        initTurntable();
        
    },[])

    return (
        <Paper className={classNames(
            prefixCls,
            className
        )} style={{...style,width,height}} component="div" ref={ref}>
            <Paper
                className={classNames(
                    `${prefixCls}-selection`
                )} 
                component="canvas"
                ref={canvasRef}
            /> 
        </Paper>
    )
})

TurnTable.propTypes={
    
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //添加类名
    className:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
 
    
}

export default TurnTable;