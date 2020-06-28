import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext'
import setRef from '../_utils/setRef';
import useForkRef from '../_utils/useForkRef';
import Paper from '../Paper';
import Button from '../ButtonBase';
import { currentDate as currentDateA, MonthTextMap, getListYear, formateMonth, WeekEnum, generateDate, chunk, formateDate, getPrevMonth, getNextMonth, getNextYear, getPrevYear, MonthEnum } from '../_utils/dateUtils';
import Slider from './Slider';
import usePrevious from '../_utils/usePrevious';
import "./index.scss";
import useControlled from '../_utils/useControlled';
import { setTranslateValue } from '../Animate/Slide';

const positions = [
    [0, 5],
    [54.5, 16.6],
    [94.4, 59.5],
    [109, 114],
    [94.4, 168.5],
    [54.5, 208.4],
    [0, 223],
    [-54.5, 208.4],
    [-94.4, 168.5],
    [-109, 114],
    [-94.4, 59.5],
    [-54.5, 19.6]
];
const innerPositions = [
    [0, 40],
    [36.9, 49.9],
    [64, 77],
    [74, 114],
    [64, 151],
    [37, 178],
    [0, 188],
    [-37, 178],
    [-64, 151],
    [-74, 114],
    [-64, 77],
    [-37, 50]
];


const TimePicker = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        picker = "clock",
        landscape,
        onChange,
        disabled,
        value: valueProps,
        defaultValue,
        disabledDate = () => false,
        type = "ampm"
    } = props;

    const [value, , isControlled] = useControlled({
        controlled: valueProps,
        default: defaultValue
    });

    //当选择日期时
    const [currentDate, setCurrentDate] = useState(value ? currentDateA(value) : currentDateA());

    const [mode, setMode] = useState(picker);
    //获取上个状态
    const prevCurrentDate = usePrevious(currentDate);

    const [timeActive, setTimeActive] = useState("hour");

    const [typeActive, setTypeActive] = useState(currentDate.currentHour>12?"pm":"am");

    const currentYearRef = useRef(null);
    const yearListRef = useRef(null);
    const init = useRef(false);
    const markRef=useRef(null);

    const selectRef = useRef(null);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timepicker", customizePrefixCls);

    const ownRef = useForkRef(selectRef, ref);

    const handleRef = React.useCallback(
        (node) => {
            setRef(ownRef, node);
        },
        [ownRef]
    );



    useEffect(() => {

        if (init.current) {
            onChange && onChange(currentDate.date);

            if (picker === "year") {
                let distance = currentYearRef.current.offsetTop;

                yearListRef.current.scrollTop = distance - 112;
            }
        }

    }, [currentDate])

    useEffect(() => {
        init.current = true
    }, [])


    const renderDisplay = () => {//render 头部

        return <div className={classNames(
            `${prefixCls}-display`
        )}>
            <div className={classNames(
                `${prefixCls}-display-text`
            )}>
                <div className={classNames(
                    `${prefixCls}-display-text-time`
                )}>
                    <span className={classNames(
                        `${prefixCls}-display-text-time-hour`,
                        [{ 'inactive': timeActive === "minute" }]
                    )}>{formateDate(currentDate.currentHour)}</span>
                    <span>:</span>
                    <span className={classNames(
                        `${prefixCls}-display-text-time-minute`,
                        [{ 'inactive': timeActive === "hour" }]
                    )}>{formateDate(currentDate.currentMinute)}</span>
                </div>

                {type === "ampm" && <div className={classNames(
                    `${prefixCls}-display-affix`
                )}>
                    <div className={classNames(
                        `${prefixCls}-display-PM`,
                        [{ 'inactive': typeActive === "am" }]
                    )}>PM</div>
                    <div className={classNames(
                        `${prefixCls}-display-AM`,
                        [{ 'inactive': typeActive === "pm" }]
                    )}>AM</div>
                </div>}
            </div>
        </div>
    }



    const renderContainerClock = () => {
        return <div className={classNames(`${prefixCls}-container-clock`)}>
            <div className={classNames(`${prefixCls}-container-clock-circle`)}></div>
            {renderHours()}
        </div>
    }

    const renderHours = () => {
        return <div className={classNames(`${prefixCls}-container-clock-hours`)}>
            <div className={classNames(`${prefixCls}-container-clock-pointer`)}></div>
            {getHours()}
            <div className={classNames(`${prefixCls}-container-clock-mask`)} ref={markRef}></div>
        </div>
    }

    const getHours = () => {

        if (type === "ampm") {
            return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) =>
                <div
                    key={item}
                    className={classNames(`${prefixCls}-container-clock-hours-number`)}
                    style={{ left: "calc(50% - 16px)", transform: `translate(${positions[index][0]}px,${positions[index][1]}px)` }}>
                    {item}
                </div>
            )
        }
        return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,"00",13,14,15,16,17,18,19,20,21,22,23].map((item, index) =>
            <div
                key={item}
                className={classNames(`${prefixCls}-container-clock-hours-number`)}
                style={{ left: "calc(50% - 16px)", transform: `translate(${positions.concat(innerPositions)[index][0]}px,${positions.concat(innerPositions)[index][1]}px)` }}>
                {item}
            </div>
        )
    }


    const renderModeContainer = () => {

    let modeRender = null;

    if (mode === "clock") {
        modeRender = renderContainerClock();
    }

    return <div className={classNames(`${prefixCls}-container`)}>
        {modeRender}
    </div>
}

useEffect(() => {
    if (mode === "year") {
        let distance = currentYearRef.current.offsetTop;

        yearListRef.current.scrollTop = distance - 112;
    }
}, [mode]);


return (
    <Paper ref={handleRef} deep={4} style={style} className={
        classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-landscape`]: landscape,
                [`${prefixCls}-disabled`]: disabled
            }
        )
    }>

        {renderDisplay()}

        {renderModeContainer()}
    </Paper>
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
    type: PropTypes.string
};

export default TimePicker;