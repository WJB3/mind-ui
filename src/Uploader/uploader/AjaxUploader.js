import React,{useState} from 'react';
import className from '../../_utils/className';
import useForkRef from '../../_utils/useForkRef';
import { getUid } from './request';

const AjaxUploader=React.forwardRef((props,ref)=>{

    const {
        component:Component,
        disabled,
        openFileDialogOnClick,
        inputRef,
        children,
        onClick:onClickProp,
        onMouseEnter,
        onMouseLeave
    }=props;

    const fileInputRef=useRef(null);

    const [uid,setUid]=useState(getUid());

    const handleRef=useForkRef(fileInputRef,inputRef);

    const onClick=(e)=>{
        const el=fileInputRef.current;
        if(!el){
            return ;
        }
        if(children && children.type==='button'){
            el.parentNode.focus();
            el.parentNode.querySelector('button').blur();
        }
        el.click();
        if(onClickProp){
            onClickProp(e);
        }

    }

    const onKeyDown=(e)=>{
        if(e.key==='Enter'){
            onClick();
        }
    }

    const events=disabled?{}:{
        onClick:openFileDialogOnClick?onClick:()=>{},
        onKeyDown:openFileDialogOnClick?onKeyDown:()=>{},
        onMouseEnter,
        onMouseLeave,
    }

    return(
        <Component>
            <input 
                ref={handleRef}
            />
        </Component>
    )

});