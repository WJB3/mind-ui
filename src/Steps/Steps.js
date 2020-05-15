import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import "./index.scss";

const Steps = (Props) => {
 
    const {
        prefixCls:customizePrefixCls,
        size="small",
        className,
        children:childrenProps,
        direction="horizontal",
        current=0,
        ...restProps
    } = Props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("steps",customizePrefixCls);
     
    const classes = classNames(prefixCls,className,{
        [`${prefixCls}-${direction}`]:direction
    });


    return (
        <div className={classes} {...restProps}>
            {
                React.Children.map(childrenProps,(child,index)=>{
                    return  React.cloneElement(
                                child,
                                {
                                    style:{
                                        ...child.props.style,
                                    },
                                    isFinish:current>index,//是否是结束
                                    isWait:current<index,//是否是等待
                                    isActive:current===index,//是否是激活
                                    current:index+1
                                }
                    )
                })
            }
        </div>
    )
}

export default Steps;