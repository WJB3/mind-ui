import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import capitalize from '../_utils/capitalize';
import useThemeColor from '../_utils/useThemeColor';
import Paper from '../Paper';


const AppBar=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style,
        color="primary",
        position="fixed"
    }=props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("appbar", customizePrefixCls);

    return (
        <Paper 
            square
            deep={4}
            children={children}
            component="header"
            ref={ref}
            style={{
                backgroundColor:useThemeColor(color),
                ...style
            }}
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-position${capitalize(position)}`]:position
                    }
                )
            }
        />
    )
});

AppBar.propTypes={
    //定义主题和颜色
    color:PropTypes.string,
    //定位
    position:PropTypes.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
    //内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object
};

export default AppBar;