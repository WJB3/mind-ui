import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import Paper from '../Paper';

const Collapse=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style
    }=props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("collapse", customizePrefixCls);

    return (
        <Paper 
            deep={2}
            children={children}
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

Collapse.propTypes={
    //内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //当前激活 tab 面板的 key
    activeKey:PropTypes.array,
    //初始化选中面板的 key
    defaultActiveKey:PropTypes.array,
    //带边框风格的折叠面板
    bordered:PropTypes.bool
};

export default Collapse;