import React, { useEffect } from 'react';
import { Slide } from '../Animate';

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
        children,
        date,
        direction
    }=props;

    const [visible,setVisible]=React.useState(false);

    useEffect(()=>{
        setVisible(!visible)
    },[date])



    return <React.Fragment>
        <Slide in={visible} unmountOnExit direction={direction}>
            {children}
        </Slide>
        <Slide in={!visible} unmountOnExit  direction={getOppositeDirection(direction)}>
            {children}
        </Slide>
    </React.Fragment>
});

export default Slider;