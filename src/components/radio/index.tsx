import React ,{ useRef,useState } from 'react';
import { classNames } from './../helper/className';
import { prefixClassname } from './../_utils/config';
import Ripple from './../ripple';
import "./../styles/radio.scss";
const component="radio";
 
interface Props{
    children?:any
}

const Pager:React.FunctionComponent<Props>=(Props)=>{

    const {
        children
    }=Props;

    const getRef:any=useRef(null);

    const [ checked,setChecked ]=useState(false);

    const classes=classNames(
        `${prefixClassname}-${component}`
    );

    function handleMouseDown(event:any){
        getRef.current.handleMouseDown(event);
    }

    function handleMouseUp(event:any){
        getRef.current.handleMouseUp(event);
    }

    function handleClick(){
        setChecked(!checked);
    }

    return(
        <div className={classes} onClick={handleClick}  onMouseDown={(event)=>handleMouseDown(event)} onMouseUp={(event)=>handleMouseUp(event)}>

            <input type="radio" checked={checked} onChange={}/>

            <div className={classNames(`${prefixClassname}-${component}-wrapper`,checked?`checked-radio`:"")} >
                <div className={classNames(`${prefixClassname}-${component}-icon`)}>
                    <Ripple ref={getRef} center rippleStyle={{width:"48px",height:"48px",top:"-12px",left:"-12px",position:"absolute"}}   />
                    <svg viewBox="0 0 24 24" className={classNames(
                        `${prefixClassname}-${component}-icon-uncheck`,
                        `${prefixClassname}-${component}-icon-svg`
                    )} ><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                    <svg viewBox="0 0 24 24" className={classNames(
                        `${prefixClassname}-${component}-icon-checked`,
                        `${prefixClassname}-${component}-icon-svg`
                    )} ><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                </div>
                <div className={classNames(`${prefixClassname}-${component}-label`)}>
                    {children}
                </div>
            </div>
        </div>
    
    )
}

export default Pager;