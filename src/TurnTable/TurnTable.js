import React,{useState,useRef, useEffect} from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import PropTypes from 'prop-types';
import Paper from '../Paper';
import "./index.scss";

export function easeOut(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b
    return (-c / 2) * (--t * (t - 2) - 1) + b
}

const TurnTable = React.forwardRef((props,ref) => {
 
    const {
        prefixCls:customizePrefixCls,
        className,
        style,
        width=500,
        height=500,
        primaryColor="#83AF9B",
        secondaryColor="#C8C8A9",
        fontStyle={
            fontVertical:false,
            fontFamily: 'Microsoft YaHei',
            color: '#fff',
            size: '14px',
            fontWeight: 'bold'
        },
        prizes=["奖品1","奖品2","奖品3","奖品4"],
        hiddenButton=false,
        clickText="点击",
        speed=1000, //旋转速度
        duration=5000, //旋转时间,
        onStart,
        onComplete 
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

    const animateId=useRef(null);

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

        centerPosition.current={x:canvasRef.current.width/2,y:canvasRef.current.height/2};
        R_Message.current={R:canvasRef.current.width/2-20,TEXT_R:canvasRef.current.width/2-20-50,INSERT_R:0}

        drawTurntable();
    }

    const drawTurntable=()=>{
        ctxRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);

        const {
            fontVertical,
            fontFamily,
            color,
            size,
            fontWeight 
        }=fontStyle;

        for(let [i,prize] of prizes.entries()){
            const _currentStartRotate = startRotate + awardRotate  * i;
            const _currentEndRotate=_currentStartRotate+awardRotate;
            ctxRef.current.save();
            i % 2 === 0?(ctxRef.current.fillStyle = primaryColor):(ctxRef.current.fillStyle = secondaryColor)
            ctxRef.current.beginPath();
            ctxRef.current.arc(
                centerPosition.current.x,
                centerPosition.current.y,
                R_Message.current.R,
                _currentStartRotate,
                _currentEndRotate,
                false
            )
            ctxRef.current.arc(
                centerPosition.current.x,
                centerPosition.current.y,
                R_Message.current.INSERT_R,
                _currentEndRotate,
                _currentStartRotate,
                true
            )
            ctxRef.current.fill();
            ctxRef.current.closePath();
            ctxRef.current.restore();

            ctxRef.current.save();
            ctxRef.current.beginPath();
            ctxRef.current.font = `${fontWeight} ${
                /.*px$/.test(size) ? size : size + 'px'
              } ${fontFamily}`;
            ctxRef.current.fillStyle=color;
            ctxRef.current.textBaseline="middle";

            const currentX=Math.cos(_currentStartRotate+awardRotate/2)*R_Message.current.TEXT_R;
            const currentY=Math.sin(_currentStartRotate+awardRotate/2)*R_Message.current.TEXT_R;

            ctxRef.current.translate(centerPosition.current.x+currentX,centerPosition.current.y+currentY);
            ctxRef.current.rotate(_currentStartRotate+awardRotate/2 + Math.PI/2);

            const { width:fontWidth }=ctxRef.current.measureText(prize);

            if(fontVertical===true){
                ctxRef.current.translate(0,Math.min(fontWidth,24));
                ctxRef.current.rotate((90/180)*Math.PI);
            }

            ctxRef.current.fillText(prize,-fontWidth/2,0);
            ctxRef.current.closePath();
            ctxRef.current.restore();
        }
    }

    const destroyContext=()=>{
        console.log("destroyContext")
        window.cancelAnimationFrame(animateId.current);
        canvasRef.current=null;
        ctxRef.current=null;
    }

    const handleStartRotate=()=>{
        if(isRotate) return ;
        setRotate(true);
        setRotateTime(0);
        setRotateAllTime(Math.random() * 5 + duration);
        setRotateChange(Math.random()*10 +speed / 100);
        rotateTurntable();
    }

    const rotateTurntable =()=>{
        setRotateTime(rotateTime+20);
        if(rotateTime>=rotateAllTime){
            setRotate(false);
            noticePrize();
            return ;
        }
        let _rotateChange=(rotateChange-easeOut(rotateTime,0,rotateChange,rotateAllTime))*(Math.PI/180);
        setStartRotate(startRotate+_rotateChange);
        drawTurntable();
        animateId.current=requestAnimationFrame(rotateTurntable);
    }

    const getSelectedPrize=()=>{
        let startAngle=(startRotate*180)/Math.PI,
            awardAngle=(awardRotate*180)/Math.PI,
            pointerAngle=90,
            overAngle=(startAngle+pointerAngle)%360,
            restAngle=360-overAngle,
            index=Math.floor(restAngle/awardAngle);
        return prizes[index];
    }

    const noticePrize=()=>{
        const prize=getSelectedPrize();
        onComplete && onComplete(prize);
    }

    const handleStopRotate=()=>{
        setRotate(false);
        window.cancelAnimationFrame(animateId.current);
        noticePrize();
    }

    useEffect(()=>{
        compatibilityFrame();
        initTurntable();
        ()=>{
            destroyContext()
        }
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

            {
                !hiddenButton && 
                (
                    Object.is(typeof clickText,"string")?(
                        <div 
                            className={classNames(`${prefixCls}-selection-btn`)} 
                            onClick={handleStartRotate}
                        >{clickText}</div>
                    ):(
                        <div onClick={this.handleStartRotate}>{clickText}</div>
                    )
                )
            }
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