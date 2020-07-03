import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import "./index.scss";

import useDate from '../_utils/useDate';
import { useTimeLoop } from '../_utils/useTime'

const ClockDisplay=React.forwardRef((props, ref)=>{
    const {
        prefixCls: customizePrefixCls,
        type,
        date,
        meridiemMode
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timepicker-display", customizePrefixCls);
   
    return (
        <div className={classNames(
            `${prefixCls}-text`
        )}>
            <div className={classNames(
                `${prefixCls}-text-time`
            )}>
                <span className={classNames(
                    `${prefixCls}-text-time-hour`,
                    [{ 'inactive': type === "minute" }]
                )}>{useTimeLoop(useDate(date).getHours())}</span>
                <span>:</span>
                <span className={classNames(
                    `${prefixCls}-text-time-minute`,
                    [{ 'inactive': type === "hour" }]
                )}>{useDate(date).getMinutes()}</span>
            </div>

            <div className={classNames(
                `${prefixCls}-affix`
            )}>
                <div className={classNames(
                    `${prefixCls}-PM`,
                    [{ 'inactive': meridiemMode === "am" }]
                )}>PM</div>
                <div className={classNames(
                    `${prefixCls}-AM`,
                    [{ 'inactive': meridiemMode === "pm" }]
                )}>AM</div>
            </div>
        </div>
    )

});

ClockDisplay.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
};


export default ClockDisplay;