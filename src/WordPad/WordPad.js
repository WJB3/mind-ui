 


import React, { useEffect,useState,useRef } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import useForkRef from '../_utils/useForkRef';
import Paper from '../Paper';
import "./index.scss";
 
const WordPad = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        width=500,
        height=500,
        style,
        strokeWidth=10,
        strokeColor="#444",
        lineCap="round",
        lineJoin="round",
        getCanvasRef
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("wordpad", customizePrefixCls);

    const [ isMouseDown,setMouseDown ]=useState(false);
    const [ lastCoordinate,setLastCoordinate ]=useState({x:0,y:0});

    const wordRef=useRef(null);

    const ctxRef=useRef(null);

    const handleRef=useForkRef(ref,wordRef);
    
    const windowToCanvas=(x,y)=>{
        const {left,top}=wordRef.current.getBoundingClientRect();
        return {
            x:Math.round(x-left),
            y:Math.round(y-top)
        }
    }

    const bindEvents=()=>{
        wordRef.current.onmousedown=e=>{ 
            e.preventDefault();
            setMouseDown(true); 
            setLastCoordinate(windowToCanvas(e.clientX,e.clientY));
        }
        wordRef.current.onmouseup=e=>{
            e.preventDefault(); 
            setMouseDown(false);
        }
        wordRef.current.onmouseout=e=>{
            e.preventDefault();
            setMouseDown(false);
        }
        wordRef.current.onmousemove=e=>{
            e.preventDefault();
         
            
            if(isMouseDown){
               
                //如果鼠标移动的时候鼠标是按下时  执行绘制
                const nowCoordinate = windowToCanvas(e.clientX, e.clientY);
 
                ctxRef.current.beginPath();
                ctxRef.current.moveTo(lastCoordinate.x,lastCoordinate.y);
                ctxRef.current.lineTo(nowCoordinate.x,nowCoordinate.y);
                ctxRef.current.lineWidth=strokeWidth;
                ctxRef.current.strokeStyle=strokeColor;
                ctxRef.current.lineCap=lineCap;
                ctxRef.current.lineJoin=lineJoin;

                ctxRef.current.stroke();

                setLastCoordinate(nowCoordinate);

            }
        }
    }

 
    useEffect(()=>{ 
        ctxRef.current = wordRef.current.getContext("2d");
        wordRef.current.width=width;
        wordRef.current.height=height;
        getCanvasRef && getCanvasRef(wordRef.current,wordRef.current);

        ()=>{
            ctxRef.current=null;
            wordRef.current=null;
        }
    },[]);

    useEffect(()=>{
        bindEvents();
    },[isMouseDown,lastCoordinate]);

    useEffect(()=>{
        // console.log(lastCoordinate)
    },[lastCoordinate])
 
    return <Paper 
        className={
            classNames(
                prefixCls,
                className
            )
        }
        style={style}
        component="canvas"
        ref={handleRef}
        deep={2}
    >
        你的浏览器不支持 canvas
    </Paper>
});

WordPad.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
};

export default WordPad;



