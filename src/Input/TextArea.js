import React, { useContext, useEffect,useRef,useState } from 'react';
import { classNames } from '../components/helper/className';
import Input from './Input';
import { ConfigContext } from '../ConfigContext';
import calculateNodeHeight from './calculateNodeHeight'
import ResizeObserver from '../ResizeObserver';
import "./index.scss";
 
const TextArea = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        autoSize,
        onResize,
        onChange,
        ...restProps
    } = Props;

    const { getPrefixCls } =useContext(ConfigContext);

    const [textareaStyles,setTextareaStyles]=useState({});

    const isChange=useRef(null);

    const textAreaRef=useRef(null);

    const prefixCls=getPrefixCls("input-textarea",customizePrefixCls);

    const resizeTextarea=()=>{
        if(!autoSize||!textAreaRef.current){
            return ;
        }
        const {minRows,maxRows}=autoSize;
        const textareaStyles = calculateNodeHeight(textAreaRef.current, false, minRows, maxRows);
        setTextareaStyles(textareaStyles);

    }

    useEffect(()=>{
        resizeTextarea();
    },[autoSize]);

    const saveTextArea=(node)=>{
        textAreaRef.current=node;
    }

    const handleChange=(value,e)=>{
     
        resizeTextarea();
        isChange.current=value;
        if(onChange){
            
            onChange(value,e);
        }
    }

    const handleResize=()=>{
      
        if(!isChange.current){
            return ;
        }
        if(onResize){
            onResize();
        }
    }
 
    return (
        <ResizeObserver onResize={handleResize}>
            <Input 
                component={"textarea"} 
                className={classNames(prefixCls)} 
                onChange={handleChange}
                ref={saveTextArea} 
                textareaStyles={{
                    ...textareaStyles
                }} 
                {...restProps} 
            />
        </ResizeObserver>
    )
}

export default TextArea;