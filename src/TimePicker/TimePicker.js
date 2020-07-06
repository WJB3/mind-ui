import React, { useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import ClockPointer from './ClockPointer';
import { ConfigContext } from '../ConfigContext'
import { getMinutes, getHours } from '../_utils/timeUtils';
import usePrevious from '../_utils/usePrevious';
import "./index.scss";
import useControlled from '../_utils/useControlled';
import Picker from '../Picker';
import useDate from '../_utils/useDate';
import ClockNumbers from './ClockNumbers';
import ClockDisplay from './ClockDisplay';
import { getMeridiem,setDateMeridiem,HoursNumbers,MinutesNumbers  } from '../_utils/useTime';
import useInit from '../_utils/useInit';
import TimeList from './TimeList';

const TimePicker = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        picker = "clock",
        landscape,
        disabled,
        value: valueProps,
        defaultValue=useDate().date(),
        onChange
    } = props;

    const [value,setValue,isControlled] = useControlled({
        controlled: valueProps,
        default: defaultValue
    });

    const isInit=useInit();

    const [mode, setMode] = useState(picker);

    const [type, setType] = useState("hours");

    const circleRef = useRef(null);
    const isMoving = useRef(false);



    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timepicker", customizePrefixCls);

    const handleMouseUp = (e) => {
        if (isMoving.current) {
            isMoving.current = false;
        }

        setTime(e.nativeEvent, true);

    }

    const handleMouseDown=(e)=>{
        isMoving.current = true;
    }

    const handleMouseMove = (e) => {
       
        e.preventDefault();
        e.stopPropagation();
        const isButtonsPressed =
            typeof e.buttons === "undefined" ? e.nativeEvent.which === 1 : e.buttons === 1;

        if (isButtonsPressed && isMoving.current) {
            setTime(e.nativeEvent, false);
        }
    }

    const setTime = (e, isFinish = false) => {

        let { offsetX, offsetY } = e;

        if (typeof offsetX == "undefined") {
            const rect = e.target.getBoundingClientRect();
            offsetX = e.changedTouches[0].clientX - rect.left;
            offsetY = e.changedTouches[0].clientY - rect.top;
        }

        const valueClock = type === 'seconds' || type === 'minutes' ? getMinutes(offsetX, offsetY, 1) : getHours(offsetX, offsetY, true);

        let dateTime=setDateMeridiem(valueClock,getMeridiem(value),value,type);

        setValue(dateTime);

        if(type==="hours" && isFinish){
            setType("minutes");
        }

        if(onChange){
            onChange(dateTime,e)
        }
    }

    const renderContainerClock = () => {
        return  <div className={classNames(`${prefixCls}-clock`)} ref={circleRef}>
                <div
                    className={classNames(`${prefixCls}-clock-squareMask`)}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseDown={handleMouseDown}
                ></div>
                <div className={classNames(`${prefixCls}-clock-pin`)}></div>
                <ClockPointer date={value} type={type} />
                <ClockNumbers date={value} type={type} />
            </div>
 
    }
 
    
    const renderModeContainer = () => {

        let modeRender = null;

        if (mode === "clock") {
            modeRender = renderContainerClock();
        }

        if(mode==="list"){
            modeRender=<TimeList date={value} handleChangeDate={(value)=>setValue(value)}  meridiemMode={getMeridiem(value)} landscape={landscape} />;
        }

        return <div className={classNames(`${prefixCls}-container`)}>{modeRender}</div>;

    }

    const handleChangeType=(type)=>{
        setType(type);
    }

    const handleChangeMeridiem=(value,meridiem)=>{
        setValue(value);
    }


    return (
        <Picker
            landscape={landscape}
            disabled={disabled}
            displayContent={<ClockDisplay date={value} type={type} meridiemMode={getMeridiem(value)} onChangeType={handleChangeType} onChangeMeridiem={handleChangeMeridiem} />}
            MainContent={renderModeContainer()}
            displayClassName={classNames(`${prefixCls}-display`)}
            mainClassName={classNames(`${prefixCls}-pickerView`)}
            className={classNames(`${prefixCls}`)}
        ></Picker>
    )
});

TimePicker.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
    //禁用
    disabled: PropTypes.bool,
    //是哪种
    picker: PropTypes.string,
    //landscape 风景
    landscape: PropTypes.bool,
    //值
    value: PropTypes.any,
    //默认值
    defaultValue: PropTypes.any,
    //不可选择的时间
    disabledDate: PropTypes.func,
    //时间类型
    type: PropTypes.string,
    //时间改变
    onChange:PropTypes.func
};

export default TimePicker;