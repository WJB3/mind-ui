import React, { useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Icon from '../components/icon';
import "./index.scss";

const StepItem = (Props) => {
 
    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        title,
        description,
        subTitle,
        isFinish,
        isWait,
        isActive,
        current,
        isLast,
        ...restProps
    } = Props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("steps-item",customizePrefixCls);
     
    const classes = classNames(prefixCls,className, {
        [`isWait`]:isWait,
        [`isActive`]:isActive,
        ['isFinish']:isFinish,
        ['isLast']:isLast
    });

    const getIcon=useCallback(()=>{
        if(isFinish){
            return <Icon name={"success-circle"}/>
        }
        return <div className={classNames(
                `number`,
        )}>{current}</div>
    },[isFinish,isWait,isActive])

    return (
        <div className={classes} {...restProps}>
            <div className={classNames(`${prefixCls}-container`)}>
                <div className={classNames(`${prefixCls}-icon`)}>
                    {getIcon()}
                </div>
                <div className={classNames(`${prefixCls}-content`)}>
                    {title && <div className={classNames(`${prefixCls}-title`)}>{title}
                        {subTitle &&<div className={classNames(`${prefixCls}-subTitle`)}>
                            {subTitle}
                        </div>}
                    </div>}
                    {description && <div className={classNames(`${prefixCls}-description`)}>
                        {description}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default StepItem;