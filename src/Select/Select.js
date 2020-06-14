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
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import Empty from '../Empty';
import Option from './SelectOption';
import BasicRipple from '../BasicRipple';
import Space from '../Space';
import Tag from '../Tag';

function isEmpty(target) {
    if (typeof target === "object" && target instanceof Array && target.length === 0) {
        return true;
    }
    return false;
}

const Select = React.forwardRef((Props, ref) => {

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
        component: Component = "input",
        rows,
        children,
        onCloseBackdrop,
        mode = "single",
        showSearch,
        filterOption
    } = Props;

    const [value, setValue] = useControlled({
        controlled: valueProps,
        default: defaultValue
    });
 
    console.log(value)

    const [visible, setVisible] = useState(false);

    const [inputValue, setInputValue] = useState("");

    const selectRef = React.useRef(null);

    const ownRef = useForkRef(selectRef, ref);

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("select", customizePrefixCls);

    const classes = classNames(
        prefixCls,
        className,
        {
            [`${prefixCls}-showSearch`]: showSearch,
            [`${prefixCls}-mode-${mode}`]: mode
        }
    );

    const handleFocus = useCallback(() => {
        if (disabled) {
            return;
        }
        setVisible(true);
    }, [visible]);

    const handleRef = React.useCallback(
        (node) => {
            setRef(ownRef, node);
        },
        [ownRef]
    );

    const handleClickBackdrop = React.useCallback(() => {
        setVisible(false);
    }, [visible]);

    const handleItemClick = child => event => {
       
        if (child.props.disabled) {
            return;
        }

        if (mode === "single") {
            setValue(child.props.value);
            setVisible(false);
            setInputValue(child.props.children);
        }


        if (child.props.value !== value) {
            onChange && onChange(child.props.value, event)
        }

    }

    const handleMultipleClick=child=>event=>{
        
        const newValue=[...value];

        if (child.props.disabled) {
            return;
        }
 

        if (mode === "multiple") {
            if(newValue.indexOf(child.props.value)>-1){//存在
 
                newValue.splice(newValue.indexOf(child.props.value),1)
            }else{
                newValue.push(child.props.value);
            }

            setValue(newValue)

            setInputValue(newValue)

            onChange && onChange(newValue, event)
        }
    }

    const handleCloseTag=item=>event=>{

        console.log("handleCloseTag")
        console.log(value)
        console.log(inputValue)

    
        const newValue=[...inputValue];

        if (disabled) {
            return;
        }

        return ;
        if(newValue.indexOf(value)>-1){//存在
            newValue.splice(newValue.indexOf(value),1)
        }

        setValue(newValue);

        onChange && onChange(newValue, event)
 
    }

    const getSelectCheckboxOption = (childrenProps) => {
 
        return React.Children.map(childrenProps, (child, index) => {
 
            if (value.indexOf(child.props.value)>-1) {

                return <BasicRipple component="div"  key={child.props.value}><Checkbox block onClickLabel={handleMultipleClick(child)} className={
                    classNames(
                        `${prefixCls}-option_selected`,
                        {
                            [`${prefixCls}-option_disabled`]: child.props.disabled
                        }
                    )
                } value={child.props.value}>{child.props.children}</Checkbox></BasicRipple>
            }

            return <BasicRipple  component="div" ><Checkbox block onClickLabel={handleMultipleClick(child)} className={
                classNames(
                    {
                        [`${prefixCls}-option_disabled`]: child.props.disabled
                    }
                )
            } value={child.props.value}>{child.props.children}</Checkbox></BasicRipple>
        })



    }

    const getSelectOption = React.useCallback((childrenProps) => {
        return React.Children.map(childrenProps, (child, index) => {

            if (filterOption) {
                if (!filterOption(inputValue, child.props)) {
                    return null;
                }
            }

            if (child.props.value === value) {


                return React.cloneElement(child, {
                    className: classNames(
                        `${prefixCls}-option_selected`,
                        {
                            [`${prefixCls}-option_disabled`]: child.props.disabled
                        }
                    ),
                    onClick: handleItemClick(child)
                });
            }

            return React.cloneElement(child, {
                className: classNames(

                    {
                        [`${prefixCls}-option_disabled`]: child.props.disabled
                    }
                ),
                onClick: handleItemClick(child)
            });
        });
    }, [value, inputValue]);

    const getInputLabel = React.useCallback(() => {
        React.Children.map(children, (child, index) => {
            if (child.props.value === value && mode==="single") {
                setInputValue(child.props.children)
            }
        });
       
        if(mode==="multiple"){
            setInputValue(value)
        }
    }, [value]);

    const handleClearValue = useCallback((_value, e) => {
        setInputValue(_value);
        setValue(null);
    }, [inputValue]);

    useEffect(() => {
        getInputLabel()
    }, [value]);

    const renderSuffix = () => {
        if (allowClear) {
            if (inputValue) {
                return null;
            }
        }
        return loading ? <Loading size={14} /> : <Icon style={{ fontSize: 16 }} name={(showSearch && visible) ? "find" : "arrow-down"} className={classNames(`arrow-down`, (visible && !showSearch) ? `arrow-down-focus` : "")} />
    }

    const handleChange = (_value, event) => {//input框的change事件

        setInputValue(_value);

        if (_value !== value) {
            onChange && onChange(_value, event)
        }
    }

    const renderContent = React.useCallback(() => {
       
        if (mode === "single") {
            return children && toArray(children).length >= 1 && <ul className={classNames(`${prefixCls}-select-lists`)}>
                {isEmpty(getSelectOption(children)) ? <Empty type="normal" /> : getSelectOption(children)}
            </ul>
        }
        if (mode === "multiple") {
            return children && toArray(children).length >= 1 && <Checkbox.Group className={classNames(`${prefixCls}-select-lists`)} value={value}>
                {getSelectCheckboxOption(children)}
            </Checkbox.Group>
        }

    },[children,value])

    const renderValue=()=>{
       
        if(mode==="single"){
            return inputValue;
        }
        if(mode==="multiple"){
            return inputValue && Array.isArray(inputValue) &&  inputValue.map(item=><Tag key={item} style={{height:20,marginRight:8}} color="primary"  onClose={handleCloseTag(item)}>{item}</Tag>) 
        }
    }

 
    return (
        <div className={classes} ref={handleRef} style={style}>
            <Popover
                trigger={"focus"}
                container={() => selectRef.current}
                placement={"bottom"}
                onCloseBackdrop={handleClickBackdrop}
                visible={visible}
                className={`${prefixCls}-popover`}
                content={renderContent()}
            >
                <Input
                    component="div"
                    suffix={renderSuffix()}
                    onFocus={handleFocus}
                    allowClear={inputValue ? allowClear : null}
                    value={renderValue()}
                    border={border}
                    disabled={disabled}
                    loading={loading}
                    onClear={handleClearValue}
                    placeholder={placeholder}
                    tabIndex={0}
                    onChange={handleChange}
                    style={style}
                    mode={mode}
                    isEdit={mode==="single"}
                />
            </Popover>
        </div>
    )
})

Select.propTypes = {

    //孩子节点
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //添加类名
    className: PropTypes.string,
    //disabled 是否禁用
    disabled: PropTypes.bool,
    //loading 是否加载
    loading: PropTypes.bool,
    //过滤规则
    filterOption: PropTypes.func
};

export default Select;