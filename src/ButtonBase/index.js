import React from 'react';
import { classNames } from '../components/helper/className';
import BaseRipple from '../BaseRipple';
import Icon from '../components/icon';
import { ConfigContext } from '../ConfigContext';
import SizeContext from '../ConfigContext/SizeContext';
import Loading from '../Loading';
import "./index.scss";

const Button = React.forwardRef((ButtonProps,ref) => {

    const { getPrefixCls } =React.useContext(ConfigContext);

    return (
        <SizeContext.Consumer>
            {
                size => {

                    const {
                        type,
                        prefixCls:customizePrefixCls,
                        size:customizeSize,
                        children,
                        className,
                        disabled,
                        flat,
                        shape,
                        float,
                        icon,
                        iconStyle,
                        onClick,
                        centerRipple,
                        style,
                        onMouseOver,
                        onMouseLeave,
                        loading,
                        color
                    } = ButtonProps;

                    const prefixCls=getPrefixCls("btn",customizePrefixCls);

                    const sizeCls=(customizeSize,size)=>{
                        let sizeCls='';
                        switch(customizeSize||size){
                            case 'large':
                                sizeCls='lg';
                                break;
                            case 'small':
                                sizeCls="sm";
                                break;
                            default:
                                break;
                        }
                        return sizeCls;
                    }
     
                    const classes = classNames(prefixCls,className,
                        {
                            [`${prefixCls}-${type}`]: type,
                            [`${prefixCls}-${shape}`]: shape,
                            [`${prefixCls}-${sizeCls(customizeSize,size)}`]: sizeCls(customizeSize,size),
                            [`${prefixCls}-icon-only`]: !children && children !== 0 && icon,
                            [`${prefixCls}-disabled`]:disabled,
                            [`${prefixCls}-flat`]:flat,
                            [`${prefixCls}-loading`]:loading,
                            [`${prefixCls}-float`]:float,
                        }
                    );

                    const handleClick=(event)=>{
                       
                        if(onClick){
                            onClick(event)
                        }
                    }

                    return (
                        <BaseRipple
                            component="button"
                            className={classes}
                            centerRipple={centerRipple}
                            enabledTouchRipple={!disabled && !loading}
                            onClick={handleClick}
                            onMouseOver={onMouseOver}
                            onMouseLeave={onMouseLeave}
                            style={{...style,color:color}}
                            ref={ref}
                        >
                            {loading &&  <Loading color={type?"#fff":"primary"} className={`${prefixCls}-loading-icon`}/>}
                            {!icon ? children: <Icon name={icon}  style={iconStyle} />}
                        </BaseRipple>
                    )
                }
            }

        </SizeContext.Consumer>
    )
})

export default Button;