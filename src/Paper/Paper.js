import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';


const Paper=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        component:Component="div",
        children,
        className,
        deep=0,
        square=false,
        style,
        deepDirection,
        onClick,
        role
    }=props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("paper", customizePrefixCls);

    return (
        <Component 
            children={children}
            style={style}
            ref={ref}
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-round`]:!square,
                        [`${prefixCls}-deep-${deep}`]:deep,
                        [`${prefixCls}-deepDirection-${deepDirection}`]:deepDirection
                    }
                )
            }
            onClick={onClick}
            role={role}
        />
    )
});

Paper.propTypes={
    //paper的内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //使用DOM元素的字符串
    component: PropTypes.elementType,
    //阴影深度
    deep:PropTypes.number,
    //是否是方形 无圆角
    square:PropTypes.bool,
    //自定义prefixCls
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //阴影的方向
    deepDirection:PropTypes.oneOf(['left','right','top','bottom']),
    //点击事件
    onClick:PropTypes.func,
    //role角色
    role:PropTypes.string
};

export default Paper;