import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Icon from '../components/icon';
import BasicRipple from '../BasicRipple';
import { MenuContext } from './MenuContext';
import "./index.scss";

const MenuItem=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style,
        isSelected,
        icon,
        keyProp
    }=props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("menuitem", customizePrefixCls);

    const { selectedKeys,onItemClick } =useContext(MenuContext);

    const handleItemClick=(e)=>{
        e.stopPropagation();
        if(onItemClick){
            onItemClick(e,keyProp);
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
                        [`${prefixCls}-isSelected`]:selectedKeys.indexOf(keyProp)>-1,
                        [`${prefixCls}-icon`]:icon,
                    }
                )
            }
            onClick={handleItemClick}
            role="menuitem"
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
    //图标
    icon:PropTypes.string,
    //对应的key
    keyProp:PropTypes.string
};

export default MenuItem;