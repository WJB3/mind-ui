import React, { useContext, useState, useCallback } from 'react';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import { toArray } from '../_utils/reactUtils';
import Input from '../Input';
import Icon from '../components/icon';
import setRef from '../_utils/setRef';
import useForkRef from '../_utils/useForkRef';
import Popover from '../Popover';
import "./index.scss";

const Select = React.forwardRef((Props,ref) => {
 
    const {
        prefixCls: customizePrefixCls,
        border,//是否有边框
        className,
        defaultValue,//默认值
        value: valueProps,//值
        onFocus,//foucs事件
        onBlur,//离开焦点事件
        placeholder,//input placeholder
        size,//输入框大小
        style,//input样式
        suffix,//后缀
        enterButton,//是否有确认按钮，可设为按钮文字。
        onChange,//input change事件
        onSearch,//按下搜索按钮的回调
        loading,//loading加载状态
        onKeyDown,//按键事件
        allowClear,//是否允许清除
        onClear,//点击清除按钮的回调
        onPressEnter,//回车的回调
        maxLength,//输入框输入的最大长度
        type = "text",
        disabled,//禁用
        prefix,//前缀
        component:Component="input",
        rows,
        children,
        ...restProps
    } = Props;

    const [focused, setFocused] = useState(false);//是否触发焦点

    const selectRef=React.useRef(null);
  
    const ownRef=useForkRef(selectRef,ref);

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("select", customizePrefixCls);

    const classes = classNames(prefixCls, className);

    const handleFocus=useCallback(()=>{
        setFocused(true)
    },[focused]);

    const handleBlur=useCallback(()=>{
        setFocused(false)
    },[focused]);
   
    const handleRef=React.useCallback(
        (node)=>{
            setRef(ownRef,node); 
        },
        [ownRef]
    );

 
    return (
        <div className={classes} ref={handleRef}>
            <Popover 
                trigger={"focus"} 
                container={()=>selectRef.current}
                placement={"bottom"}
                visible
                content={children && children.length>1 && <ul className={classNames(`${prefixCls}-select-lists`)}>
                        {children}
                </ul>}
            >
                <Input 
                    suffix={<Icon name={"arrow-down"} className={classNames(`arrow-down`,focused?`arrow-down-focus`:"")}/>}
                    onFocus={handleFocus} 
                    onBlur={handleBlur}
                />
            </Popover>
        </div>
    )
})

export default Select;