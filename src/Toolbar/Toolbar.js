import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import "./index.scss"


const Toolbar=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style,
        mode="normal",
        component:Component="div",
        disableGutters=false
    }=props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("toolbar", customizePrefixCls);

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
                        [`${prefixCls}-${mode}`]:mode,
                        [`${prefixCls}-gutters`]:!disableGutters
                    }
                )
            }
        />
    )
});

Toolbar.propTypes={
    //paper的内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //自定义prefixCls
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //模式
    mode:PropTypes.oneOf(['normal']),
    //是否禁用gutter
    disableGutters:PropTypes.bool,
    //根dom元素
    component:PropTypes.elementType
};

export default Toolbar;