import React, { useContext, useState, useCallback, useEffect } from 'react';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import useControlled from '../_utils/useControlled';
import { toArray } from '../_utils/reactUtils';
import Input from '../Input';
import Icon from '../components/icon';
import setRef from '../_utils/setRef';
import useForkRef from '../_utils/useForkRef';
import Loading from '../Loading';
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
        onCloseBackdrop,
        mode="single",
        showSearch,
        ...restProps
    } = Props;

    const [value, setValue] = useControlled({
        controlled: valueProps,
        default: defaultValue
    });

    const [visible,setVisible]=useState(false);

    const [inputValue,setInputValue]=useState(undefined);

    const selectRef=React.useRef(null);
  
    const ownRef=useForkRef(selectRef,ref);

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("select", customizePrefixCls);

    const classes = classNames(prefixCls, className);

    const handleFocus=useCallback(()=>{

        setVisible(true);
    },[visible]);

    const handleRef=React.useCallback(
        (node)=>{
            setRef(ownRef,node); 
        },
        [ownRef]
    );

    const handleClickBackdrop=React.useCallback(()=>{
        setVisible(false);
    },[visible]);

    const handleItemClick=child=>event=>{
        if(child.props.disabled){
            return ;
        }

        if(mode==="single"){
            setValue(child.props.value);
            setVisible(false);
            setInputValue(child.props.children);
        }

        
        if(child.props.value!==value){
            onChange && onChange(child.props.value,event)
        }

    }

    const getSelectOption=React.useCallback(()=>{
        return React.Children.map(children, (child, index) => {

            if (child.props.value === value) {
              

                return React.cloneElement(child, {
                    className:classNames(
                        `${prefixCls}-option_selected`,
                        {
                            [`${prefixCls}-option_disabled`]:child.props.disabled
                        }
                    ),
                    onClick:handleItemClick(child)
                });
            }
        
            return React.cloneElement(child, {
                className:classNames(
                     
                    {
                      [`${prefixCls}-option_disabled`]:child.props.disabled
                    }
                ),
                onClick:handleItemClick(child)
            });
        });
    },[value,inputValue]);

    const getInputLabel=React.useCallback(()=>{
        React.Children.map(children, (child, index) => {
            if (child.props.value === value) {
                setInputValue(child.props.children)
            }
        });
    },[value]);

    const handleClearValue=useCallback((_value,e)=>{
        setInputValue(_value);
        setValue(null);
    },[inputValue]);

    useEffect(()=>{
        getInputLabel()
    },[value]);
    
    console.log(visible);
    
    return (
        <div className={classes} ref={handleRef} style={style}>
            <Popover 
                trigger={"focus"} 
                // container={()=>selectRef.current} 
                placement={"bottom"}
                open={open}
                onCloseBackdrop={handleClickBackdrop}
                visible={visible}
                className={`${prefixCls}-popover`}
                content={children && toArray(children).length>=1 && <ul className={classNames(`${prefixCls}-select-lists`)}>
                        {getSelectOption()}
                </ul>}
            >
                <Input 
                    component="div"
                    suffix={loading ?<Loading size={14}/> :<Icon style={{fontSize:16}} name={(showSearch && visible)?"find":"arrow-down"} className={classNames(`arrow-down`,(visible && !showSearch)?`arrow-down-focus`:"")}/>}
                    onFocus={handleFocus} 
                    allowClear={allowClear}
                    value={inputValue}
                    border={border}
                    disabled={disabled}
                    loading={loading}
                    allowClear={allowClear}
                    onClear={handleClearValue}
                    placeholder={placeholder}
                    tabIndex={0}
                />
            </Popover>
        </div>
    )
})

export default Select;