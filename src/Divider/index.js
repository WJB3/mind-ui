import React, { Children } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import "./index.scss";

const Divider = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        type="horizontal",
        dashed,
        style,
        orientation="center",
        ...restProps
    } = Props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("divider",customizePrefixCls);
     
    const classes = classNames(prefixCls,className,
        {
            [`${prefixCls}-${type}`]:type,
            [`${prefixCls}-with-text-${orientation}`]: children,
            [`${prefixCls}-dashed`]:dashed
        }  
    );

    return (
        <div className={classes} {...restProps} style={style}>
            {children && <span className={`${prefixCls}-inner-text`}>{children}</span>}
        </div>
    )
}

export default Divider;