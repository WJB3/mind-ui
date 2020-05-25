import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Paper from '../Paper';

const Menu=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style,
    }=props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("menu", customizePrefixCls);
 
    return (
        <Paper 
            square
            children={children}
            component="ul"
            ref={ref}
            style={{
                ...style
            }}
            className={
                classNames(
                    prefixCls,
                    className
                )
            }
        />
    )
});

Menu.propTypes={
    //内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //初始展开的 SubMenu 菜单项 key 数组
    defaultOpenKeys:PropTypes.array,
    //初始选中的菜单项 key 数组
    defaultSelectedKeys:PropTypes.array,
    //在子菜单展示之前就渲染进 DOM
    forceSubMenuRender:PropTypes.bool,
    //inline 时菜单是否收起状态
    inlineCollapsed:PropTypes.bool,
    //inline 模式的菜单缩进宽度
    inlineIndent:PropTypes.number,
    //菜单类型，现在支持垂直、水平、和内嵌模式三种
    mode:PropTypes.string,
    //是否允许多选
    multiple:PropTypes.bool,
    //当前展开的Submenu菜单项key数组
    openKeys:PropTypes.array,
    //是否允许被选中
    selectable:PropTypes.bool,
    //当前选中的菜单项 key 数组
    selectedKeys:PropTypes.array,
    //	根节点样式
    style:PropTypes.object,
    //主题颜色
    theme:PropTypes.string,
    //点击Item函数调用子函数
    onClick:PropTypes.func,
    //取消选中时调用，仅在 multiple 生效
    onDeselect:PropTypes.func,
    //SubMenu 展开/关闭的回调
    onOpenChange:PropTypes.func,
    //被选中时调用
    onSelect:PropTypes.func,
    //自定义 Menu 折叠时的图标
    overflowedIndicator:PropTypes.node
};

export default Menu;