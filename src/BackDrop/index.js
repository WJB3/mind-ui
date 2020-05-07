import React, { useContext } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { Fade } from '../Animate';
import "./index.scss";

const BackDrop = React.forwardRef((Props,ref) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style,
        open,
        onClick,
        ...restProps
    } = Props;
 
    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("backdrop",customizePrefixCls);
 
    return (
        <Fade in={open}>
            <div className={
                classNames(prefixCls,className)
            } {...restProps} style={style} ref={ref} onClick={onClick} >
                {children}
            </div>
        </Fade>
    )
})

export default BackDrop;