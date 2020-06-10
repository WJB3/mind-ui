import React, { useState, useEffect,useRef } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
 
import BackDrop from '../BackDrop';
import "./index.scss";
import Tooltip from '../Tooltip';
 

 
const Popover = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        className
    } = Props;
 
  

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("popover", customizePrefixCls);
    
    const handleCloseBackdrop=(e)=>{
        if(onCloseBackdrop){
            onCloseBackdrop(e)
        }
        setOpenState(false)
    }
 

    return (
        <React.Fragment>

            

            <BackDrop   style={{background:'transparent'}} onClick={handleCloseBackdrop} />
            
            <Tooltip 
                className={
                    classNames(
                        prefixCls,
                        className
                    )
                }
            > 
                {React.cloneElement(children,{ref:children.ref})}       
            </Tooltip>
            
        </React.Fragment>
    )
});

export default Popover;