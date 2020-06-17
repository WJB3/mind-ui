import React, { useEffect } from 'react';
import SliderDisplay from './SliderDisplay';
import { element } from 'prop-types';

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
        direction
    }=props;
 
    const init=React.useRef(false);

    const index=React.useRef(0);

    const [children,setChildren]=React.useState([]);

    const [visible,setVisible]=React.useState(true);
 
    useEffect(()=>{
        if(init.current){
          
            setChildren([React.cloneElement(children[0],{
                status:"prev",
                in:false,
               
            }),<SliderDisplay in={true} key={index.current} status="next"  >{childrenProps}</SliderDisplay>])
            index.current++;
     
        }
        
    },[date])

    useEffect(()=>{
        if(init.current && children.length>1){
            console.log(children)
            setChildren((oldChildrens)=>{
                if(oldChildrens.length>1){
                    return oldChildrens.splice(1);
                }
                return oldChildrens;
            });
        }
    },[children])

    useEffect(()=>{
        //初始化
        init.current=true;
        setChildren([<SliderDisplay in={true} key={index.current}>{childrenProps}</SliderDisplay>])
        index.current++;
    },[]);

    return <React.Fragment>
        {
            children
        }
    </React.Fragment>
});

export default Slider;