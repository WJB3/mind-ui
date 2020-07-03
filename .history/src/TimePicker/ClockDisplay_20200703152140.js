import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import "./index.scss";
import { useMeridiemMode } from '../_utils/useTime';

const ClockDisplay=React.forwardRef((props, ref)=>{
    const {
        prefixCls: customizePrefixCls,
        type,
        date
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timepicker-display", customizePrefixCls);

    const { meridiemMode } = useMeridiemMode(currentDate, true);
   
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
                )}> </span>
                <span>:</span>
                <span className={classNames(
                    `${prefixCls}-text-time-minute`,
                    [{ 'inactive': type === "hour" }]
                )}> </span>
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