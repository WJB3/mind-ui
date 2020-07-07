import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import "./index.scss";

const TimelineItem=React.forwardRef((props, ref)=>{
    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        dotRender,
        isLast,
        isCenter,
        align="left"
    } = props; 
    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timelineitem", customizePrefixCls);
  
    return (
        <li ref={ref} className={classNames(
            `${prefixCls}`,
            className,
            {
                [`${prefixCls}-isCenter`]:isCenter,
                [`${prefixCls}-align${align}`]:align
            }
        )}>
            <div className={classNames(
                `${prefixCls}-separator`
            )}>
                <span className={classNames(
                    `${prefixCls}-separator-dot`,
                    {
                        [`${prefixCls}-separator-defaultGrey`]:!dotRender
                    }
                )}></span>
                {!isLast && <span className={classNames(
                    `${prefixCls}-separator-connentor`
                )}></span>} 
            </div>
            <div className={classNames(
                `${prefixCls}-content`
            )}>{children}</div>
            
        </li>
    )

});

TimelineItem.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //children
    children:PropTypes.any
};


export default TimelineItem;