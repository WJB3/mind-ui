import React ,{ useRef,useState, useEffect } from 'react';
import { classNames } from './../helper/className';
import { prefixClassname } from './../_utils/config';
import Radio from './Radio';
import Ripple from './../ripple';
import "./../styles/radio.scss";
import { RadioContext } from './Context';
const component="radio-group";

 
interface Props{
    children?:any,
    defaultValue?:any,
    value?:any,
    onChange?:any
}

const Group:React.FunctionComponent<Props>=(Props)=>{

    const {
        children,
        defaultValue=null,
        value,
        onChange
    }=Props;

    const [stateValue,setStateValue]=useState(value);

    const classes=classNames(
        `${prefixClassname}-${component}`,
    );

    const getChildren=React.useCallback(()=>{
         
    },children)

    useEffect(()=>{
        // getChildren()
    },[])

    function handleRadioChange(value?:any,flag?:any){
        if(flag){
            setStateValue(value);
            if(onChange){
                onChange(value);
            }
            return ;
        }
        setStateValue(null);
        if(onChange){
            onChange(null);
        }
        
    }
    
    return(
        <div className={classes} >
            {
				React.Children.map(Props.children,child=>{
					return React.cloneElement(child,{
                        className:"radio-group",
                        isGroup:true,
                        defaultGroupValue:defaultValue,
                        groupValue:stateValue,
                        groupChange:handleRadioChange
                    })
				})
			}
        </div>
    )
}

export default Group;