import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import { useTimeLoop } from '../_utils/useTime';
import useDate from '../_utils/useDate';
import "./index.scss";


const positions = [
    [55, 19.6],
    [94.4, 59.5],
    [109, 114],
    [94.4, 168.5],
    [54.5, 208.4],
    [0, 223],
    [-54.5, 208.4],
    [-94.4, 168.5],
    [-109, 114],
    [-94.4, 59.5],
    [-54.5, 19.6],
    [0, 5],
];


const ClockNumber=React.forwardRef((props, ref)=>{
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        type,
        date
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timepicker-clock-number", customizePrefixCls);

    const getHoursNumber=()=>{
         
        let hourNumbers=[];
        for(let hour=1;hour<=12;hour++){
            hourNumbers.push(
                <div
                    key={hour}
                    className={classNames(
                        `${prefixCls}`,
                        {
                            [`${prefixCls}-selected`]:hour===useTimeLoop(useDate(date).getHours(),'hours')
                        }
                    )}
                    style={{ left: "calc(50% - 16px)", transform: `translate(${positions[hour-1][0]}px,${positions[hour-1][1]}px)` }}>
                    {hour}
                </div>
            )
        }
        return hourNumbers;
    }

    const getClockNumbers=()=>{
        if(type==="hours"){
            return getHoursNumber();
        }
    }

    return <Fragment>
        {getClockNumbers()}
    </Fragment>

});

ClockNumber.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
    type:PropTypes.string
};


export default ClockNumber