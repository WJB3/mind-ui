import React, { useRef  } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import useDate,{formateComplete} from '../_utils/useDate';
import "./index.scss";
import { HoursNumbers,MinutesNumbers,useTimeLoop  } from '../_utils/useTime';
import useScrollList from '../_utils/useScrollList';

const TimeList = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        type,
        landscape,
        date,
        handleChangeDate,
        meridiemMode
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timepicker", customizePrefixCls);

    const [hoursListRef,currentHourRef]=useScrollList(date,"hours",landscape?250:280);

    const [minutesListRef,currentMinuteRef]=useScrollList(date,"minutes",landscape?250:280);

    const handleClickHours=(item)=>{
        let _date=useDate(date);
        handleChangeDate && handleChangeDate(new Date(`${_date.format("YY-MM-DD")} ${meridiemMode==="am"?item:Number(item)+12}:${formateComplete(_date.getMinutes())}`));
    }

    const handleClickMinutes=(item)=>{
        let _date=useDate(date);
        handleChangeDate &&  handleChangeDate(new Date(`${_date.format("YY-MM-DD")} ${formateComplete(_date.getHours())}:${formateComplete(item)}`));
    }
     
    return <div className={classNames(`${prefixCls}-list`)} ref={ref}>
    <div className={classNames(`${prefixCls}-list-hours`)} ref={hoursListRef}>
        {HoursNumbers.map(item=><div className={classNames(
            `${prefixCls}-list-hours-button`,
            {
                ['is-active']:formateComplete(useTimeLoop(useDate(date).getHours(),'hours')) ==item
            }
        )} key={item} ref={formateComplete(useTimeLoop(useDate(date).getHours(),'hours')) ==item?currentHourRef:null} onClick={()=>handleClickHours(item)}>{item}</div>)}
    </div>
    <div 
        className={classNames(
            `${prefixCls}-list-minutes`,  
        )} ref={minutesListRef}>
        {MinutesNumbers.map(item=><div className={classNames(
            `${prefixCls}-list-minutes-button`,
            {
                ['is-active']:formateComplete(useDate(date).getMinutes()) ==item
            }
        )} ref={formateComplete(useDate(date).getMinutes()) ==item?currentMinuteRef:null}  key={item} onClick={()=>handleClickMinutes(item)}>{item}</div>)}
    </div>
</div>

});

TimeList.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
    type: PropTypes.string
};


export default TimeList;