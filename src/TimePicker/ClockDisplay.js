import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import "./index.scss";
import useDate from '../_utils/useDate';
import { useTimeLoop } from '../_utils/useTime';
import { formateComplete } from '../_utils/useDate';

const ClockDisplay=React.forwardRef((props, ref)=>{
    const {
        prefixCls: customizePrefixCls,
        type,
        date,
        meridiemMode,
        onChangeType,
        onChangeMeridiem
    } = props; 
    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timepicker-display", customizePrefixCls);

    const handleClickType=(types)=>{
        if(types!==type){
            onChangeType(types);
        }
    }

    const handleChangeMeridiem=(meridiem)=>{
        if(meridiemMode!==meridiem){
            let _date=useDate(date);
            let value;
            if(meridiem==="am"){
                value=new Date(`${_date.format("YY-MM-DD")} ${formateComplete(_date.getHours()-12)}:${formateComplete(_date.getMinutes())}`)
            }

            if(meridiem==="pm"){
                value=new Date(`${_date.format("YY-MM-DD")} ${_date.getHours()+12}:${formateComplete(_date.getMinutes())}`)
            }

            onChangeMeridiem(value,meridiem);
        }
    }
   
    return (
        <div className={classNames(
            `${prefixCls}-text`
        )}>
            <div className={classNames(
                `${prefixCls}-text-time`
            )}>
                <span className={classNames(
                    `${prefixCls}-text-time-hour`,
                    [{ 'inactive': type === "minutes" }]
                )} onClick={()=>handleClickType("hours")}>{formateComplete(useTimeLoop(useDate(date).getHours()))}</span>
                <span>:</span>
                <span className={classNames(
                    `${prefixCls}-text-time-minute`,
                    [{ 'inactive': type === "hours" }]
                )} onClick={()=>handleClickType("minutes")}>{useDate(date).getFormatMinutes()}</span>
            </div>

            <div className={classNames(
                `${prefixCls}-affix`
            )}>
                <div className={classNames(
                    `${prefixCls}-PM`,
                    [{ 'inactive': meridiemMode === "am" }]
                )} onClick={()=>handleChangeMeridiem("pm")}>PM</div>
                <div className={classNames(
                    `${prefixCls}-AM`,
                    [{ 'inactive': meridiemMode === "pm" }]
                )} onClick={()=>handleChangeMeridiem("am")}>AM</div>
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
    //改变type
    onChangeType:PropTypes.func,
    //改变mode
    onChangeMeridiem:PropTypes.func
};


export default ClockDisplay;