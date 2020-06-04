import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Icon from '../components/icon';
import BasicRipple from '../BasicRipple';
import Toolbar from '../Toolbar';
import { MenuContext } from './MenuContext';
import "./index.scss";
import Paper from '../Paper';

const MenuItem = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        icon,
        keyProp,
        isHasSubMenu,
        selectable=true,
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("divider", customizePrefixCls);

    return (
        <Paper
            className={
                classNames(
                    `${prefixCls}`,
                    className
                )
            } 
        />
    )
});

MenuItem.propTypes = {
    //内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
    //表示是否选中
    isSelected: PropTypes.bool,
    //图标
    icon: PropTypes.string,
    //对应的key
    keyProp: PropTypes.string,
    //isHasSubMenu是否有父级菜单
    isHasSubMenu: PropTypes.bool,
    //item是否可选择
    selectable:PropTypes.bool
};

export default MenuItem;