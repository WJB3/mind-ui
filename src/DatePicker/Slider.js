import React, { useEffect } from 'react';
import SliderDisplay from './SliderDisplay';
import SliderContainerTitle from './SliderDisplayTitle';
import { toArray } from '../_utils/reactUtils';

 
const Slider=React.forwardRef((props,ref)=>{

    const {
        children:childrenProps,
        date,
        direction="next",//默认是下一个向上
        sliderContainer="display"
    }=props;
 
    const init=React.useRef(false);

    const index=React.useRef(0);

    const prevRef=React.useRef(null);

    const [children,setChildren]=React.useState([]);

    let Component=SliderDisplay;

    if(sliderContainer==="container-title"){
        Component=SliderContainerTitle;
    }

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
       
        if(init.current){

            let indexC=React.Children.count(children)===1?0:1;//遇到过渡清除不掉的情况下
             
            setChildren([React.cloneElement(children[indexC],{
                status:direction==="next"?"prev":"next",
                in:false
            }),<Component in={true} key={index.current} status={direction}  >{childrenProps}</Component>])
            index.current++;
        }
        
    },[date])

    useEffect(()=>{
        //初始化
        init.current=true;
        setChildren([<Component in={true} key={index.current} >{childrenProps}</Component>])
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