import React, { useEffect } from 'react';
import SliderDisplay from './SliderDisplay';
import { toArray } from '../_utils/reactUtils';

function getOppositeDirection(direction){
    switch(direction){
        case "top":
            return "bottom";
        case "bottom":
            return "top";
        case "left":
            return "right";
        case "right":
            return "left";
        default:
            return "top";
    }
}

const Slider=React.forwardRef((props,ref)=>{

    const {
        children:childrenProps,
        date,
        direction="next",//默认是下一个向上
    }=props;
 
    const init=React.useRef(false);

    const index=React.useRef(0);

    const prevRef=React.useRef(null);

    const [children,setChildren]=React.useState([]);

    const handleRef=(ref)=>{
        if(!ref){
            return ;
        }
         
        prevRef.current=ref;
        setTransition();
    }

    const setTransition=()=>{
         console.log("setTransition")
        function transitionend(){
            console.log("transitionend")
            
            if(children.length>1){
                setChildren((oldChildrens)=>{
                    if(oldChildrens.length>1){
                        return oldChildrens.splice(1);
                    }
                    return oldChildrens;
                });
            }
            prevRef.current.removeEventListener('transitionend', transitionend, false);
        }
        prevRef.current.addEventListener('transitionend', transitionend, false);
        
    }

 
    useEffect(()=>{
        console.log(React.Children.count(children))
        if(init.current){

            let indexC=React.Children.count(children)===1?0:1;//遇到过渡清除不掉的情况下
             
            setChildren([React.cloneElement(children[indexC],{
                status:direction==="next"?"prev":"next",
                in:direction!=="next"
                
            }),<SliderDisplay in={direction==="next"} key={index.current} status={direction}  >{childrenProps}</SliderDisplay>])
            index.current++;
        }
        
    },[date])

    useEffect(()=>{
        //初始化
        init.current=true;
        setChildren([<SliderDisplay in={true} key={index.current} >{childrenProps}</SliderDisplay>])
        index.current++;
    },[]);

    return <React.Fragment>
        {
            toArray(children).map((item,indexa)=>{
          
                return React.cloneElement(item,{
                    ref:indexa===0?handleRef:undefined
                })
            })
        } 
    </React.Fragment>
});

export default Slider;