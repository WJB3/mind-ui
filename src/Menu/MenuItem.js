import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Icon from '../components/icon';
import BasicRipple from '../BasicRipple';
import "./index.scss";

const MenuItem=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style,
        isSelected,
        onItemClick,
        icon
    }=props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("menuitem", customizePrefixCls);

    const handleItemClick=(e)=>{
        if(onItemClick){
            onItemClick(e,props);
        }
    }
 
    return (
        <BasicRipple
            component="li"
            ref={ref}
            style={{
                ...style
            }}
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-isSelected`]:isSelected,
                        [`${prefixCls}-icon`]:icon,
                    }
                )
            }
            onClick={handleItemClick}
        >
            {!!icon && <Icon name={icon} />}
            {children}
        </BasicRipple>
    )
});

MenuItem.propTypes={
    //内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //表示是否选中
    isSelected:PropTypes.bool,
    //点击item
    onItemClick:PropTypes.func,
    //图标
    icon:PropTypes.string
};

export default MenuItem;