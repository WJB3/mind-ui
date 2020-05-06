import React,{useState} from 'react';
import { classNames } from '../components/helper/className';
import BaseRipple from '../BaseRipple';
import Icon  from '../components/icon';
import { ConfigContext } from '../ConfigContext';
import { typeEnum } from '../components/color';
import "./index.scss";

const Tag = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        closable,
        onClose,
        color,
        style,
        ...restProps
    } = Props;

    let index=Object.values(typeEnum).findIndex(item=>item===color);//判断是否颜色类型

    const { getPrefixCls } =React.useContext(ConfigContext);

    const [visible,setVisible]=useState(true);

    const prefixCls=getPrefixCls("tag",customizePrefixCls);
     
    const classes = classNames(
        prefixCls,
        className,
        visible?"":`${prefixCls}-displaynone`,
        index>-1?`${prefixCls}-${color}`:"",
    );

    const handleClose=React.useCallback((event)=>{
        event.stopPropagation();
         
        onClose&&onClose(event);

        if(event.defaultPrevented){//表明是否调用了defaultPrevented
            return ;
        }

        setVisible(false);
       
    },[closable])

    return (
        <BaseRipple
                component="button"
                className={classes}
                style={{backgroundColor:index===-1?color:"",color:color?"rgba(255,255,255,1)":"",borderColor:index===-1?color:"",...style}} 
                {...restProps}
        > 
            {children}
            {closable && <Icon name="close" className={`${prefixCls}-close`} style={{fontSize:14}} onClick={handleClose}/>}
        </BaseRipple>
    )
}

export default Tag;