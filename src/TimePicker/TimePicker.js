import React, { useState, useRef, useEffect,Fragment  } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext'
import setRef from '../_utils/setRef';
import useForkRef from '../_utils/useForkRef';
import { currentDate as currentDateA, formateDate, formateHour } from '../_utils/dateUtils';
import usePrevious from '../_utils/usePrevious';
import "./index.scss";
import useControlled from '../_utils/useControlled';
import Picker from '../Picker';

const positions = [
   
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
    [-54.5, 19.6],
    [0, 5],
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

    const [typeActive, setTypeActive] = useState(currentDate.currentHour > 12 ? "pm" : "am");

    const [instance, setInstance] = useState({ x: 0, y: 0 });

    const currentYearRef = useRef(null);
    const yearListRef = useRef(null);
    const init = useRef(false);
    const circleRef = useRef(null);
    const isMouseDown = useRef(false);

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
    }



    const renderContainerClock = () => {
        return <div className={classNames(`${prefixCls}-container`)}>
            <div className={classNames(`${prefixCls}-clock`)} ref={circleRef}>
                <div className={classNames(`${prefixCls}-clock-squareMask`)}></div>
                <div className={classNames(`${prefixCls}-clock-pin`)}></div>
                {renderHours()}
            </div>
            
           
        </div>
    }

    const renderHours = () => {
        return <Fragment>
           
            <div className={classNames(`${prefixCls}-clock-hours-pointer`)}  ></div>
            {getHours()}
        </Fragment>
    }

    const getHours = () => {


        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12].map((item, index) =>
            <div
                key={item}
                className={classNames(`${prefixCls}-clock-hours-number`)}
                style={{ left: "calc(50% - 16px)", transform: `translate(${positions[index][0]}px,${positions[index][1]}px)` }}>
                {item}
            </div>
        )


    }


    const renderModeContainer = () => {

        let modeRender = null;

        if (mode === "clock") {
            modeRender = renderContainerClock();
        }
 
        return modeRender;

    }

    useEffect(() => {
        if (mode === "year") {
            let distance = currentYearRef.current.offsetTop;

            yearListRef.current.scrollTop = distance - 112;
        }
    }, [mode]);

    const getRotate = (time, type) => {//获取时钟的角度
        const hourStep = 30;
        const minuteStep = 6;
        const currentHourRotate = formateHour(time.currentHour) * hourStep;
        const currentMinuteRotate = time.currentMinute * minuteStep;
        if (type === "hour") {
            return currentHourRotate + currentMinuteRotate / 12;
        }

        return currentMinuteRotate;

    }

    const isMousePressed = (event) => {
        if (typeof event.buttons === "undefined") {
            return event.nativeEvent.which;
        }
        return event.buttons;
    }

    const handleMouseDown = (event) => {
        isMouseDown.current = true;
        const { offsetX, offsetY } = event.nativeEvent;
        console.log(event);
        console.log(event.nativeEvent.offsetX);
        console.log(event.nativeEvent.offsetY);
        console.log(event.target);
        setInstance({
            x: offsetX,
            y: offsetY
        });

    }

    const handleMouseMove = (event) => {
        if (isMouseDown.current) {
            event.preventDefault();
            if (isMousePressed(event) !== 1) return;
            const { offsetX, offsetY, clientX, clientY } = event.target;


            console.log(instance)
            console.log("offsetX" + offsetX)
            console.log("offsetY" + offsetY)
            console.log("clientX" + clientX)
            console.log("clientY" + clientY)
        }

    }

    const getHourTime = (offsetX, offsetY) => {
        const step = 30;



    }

    return (
        <Picker
            landscape={landscape}
            disabled={disabled}
            displayContent={renderDisplay()}
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
    type: PropTypes.string
};

export default TimePicker;