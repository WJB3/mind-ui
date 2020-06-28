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
import useControlled  from '../_utils/useControlled';


const DatePicker = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        picker = "day",
        landscape,
        onChange,
        disabled,
        value:valueProps,
        defaultValue,
        disabledDate=()=>false
    } = props;

    const [value,,isControlled]=useControlled({
        controlled:valueProps,
        default:defaultValue
    });
    
    useEffect(()=>{
        setCurrentDate(value?currentDateA(value):currentDateA());
        setCurrentSelectDate(value?currentDateA(value):currentDateA());
    },[valueProps])

    //当选择日期时
    const [currentDate, setCurrentDate] = useState(value?currentDateA(value):currentDateA());

    const [mode, setMode] = useState(picker);
    //获取上个状态
    const prevCurrentDate = usePrevious(currentDate);

    const [currentSelectDate, setCurrentSelectDate] = useState(value?currentDateA(value):currentDateA());//当前月份
    //获取上个状态
    const prevCurrentSelectDate = usePrevious(currentSelectDate);

    const currentYearRef = useRef(null);
    const yearListRef = useRef(null);
    const init = useRef(false);

    const selectRef = useRef(null);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("datepicker", customizePrefixCls);

    const ownRef = useForkRef(selectRef, ref);

    const handleRef = React.useCallback(
        (node) => {
            setRef(ownRef, node);
        },
        [ownRef]
    );

    const handleClickDay = (date) => {//点击日期

        if(disabled || isControlled){
            return ;
        }

        setCurrentDate(currentDateA(new Date(date)));

    }

    useEffect(()=>{
        
        if(init.current){
            onChange && onChange(currentDate.date);

            if (picker === "year") {
                let distance = currentYearRef.current.offsetTop;
     
                yearListRef.current.scrollTop = distance - 112;
            }
        }
       
    },[currentDate])

    useEffect(()=>{
        init.current=true
    },[])

    const handleClickMonthRender = (date) => {

        if(disabled || isControlled){
            return ;
        }
 
        setCurrentSelectDate(currentDateA(new Date(date)));

        if(picker==="month"){
            setCurrentDate(currentDateA(new Date(date)));
        }

        handleSwitchMode("monthrender");

    }


    const getDirection = (mode) => {

        if (mode === "currentDate") {
            if (prevCurrentDate) {
                if (prevCurrentDate.time > currentDate.time) {
                    return "prev";
                }
                return "next";
            }
        } else if (mode === "currentSelectDate") {
            if (prevCurrentSelectDate) {
                if (prevCurrentSelectDate.time > currentSelectDate.time) {
                    return "prev";
                }
                return "next";
            }
        }


        return "next";
    }

    const renderDisplay = () => {//render 头部


        let date=picker==="day"?`${currentDate.currentMonthDay} ${currentDate.currentWeek}`:picker==="month"?`${currentDate.currentMonth}月`:`${currentDate.currentYear}年`;

        return <div className={classNames(
            `${prefixCls}-display`
        )}>
            <div className={classNames(
                `${prefixCls}-display-year`
            )}>
                <Slider date={currentDate.currentYear} direction={getDirection("currentDate")}>
                    <div className={classNames(`${prefixCls}-display-year-title`)}>{`${currentDate.currentYear}`}</div>
                </Slider>
            </div>
            <div className={classNames(
                `${prefixCls}-display-monthday`
            )}>
                <Slider date={currentDate.currentYearMonthDay} direction={getDirection("currentDate")}>
                    <div className={classNames(`${prefixCls}-display-monthday-title`)}>{date}</div>
                </Slider>
            </div>
        </div>
    }

    const renderDayTitle = () => {//render title

        return <div className={classNames(
            `${prefixCls}-container-day-titleWrapper`
        )}>
            <Button style={{ flex: "none" }} shape={"circle"} icon="arrow-thin-left" flat onClick={() => {if(disabled || isControlled ){return ;}setCurrentSelectDate(getPrevMonth(currentSelectDate))}} />

            <div className={classNames(
                `${prefixCls}-container-day-title`
            )} onClick={() =>{if(disabled || isControlled ){return ;}handleSwitchMode("daytitle")}}>
                <Slider date={currentSelectDate.currentYearMonth} sliderContainer="container-title" direction={getDirection("currentSelectDate")}>
                    <div className={classNames(
                        `${prefixCls}-container-day-title-text`
                    )}>{`${currentSelectDate.currentYear} ${currentSelectDate.currentMonthFormat}`}</div>
                </Slider>
            </div>

            <Button style={{ flex: "none" }} shape={"circle"} icon="arrow-thin-right" flat onClick={() => {if(disabled || isControlled){return ;}setCurrentSelectDate(getNextMonth(currentSelectDate))}} />
        </div>
    };


    const handleSwitchMode = (clickMode) => {
        if(disabled){
            return ;
        }
 
        if (picker === "day") {
            switch (clickMode) {
                //点击天
                case "daytitle":
                    setMode("month");
                    break;
                case "monthrender":
                    setMode("day");
                    break;
                case "monthtitle":
                    setMode("year");
                    break;
                case "yearrender":
                    setMode("day");
                    break;
                default:
                    setMode("day");
            }
        }

        if (picker === "month") {
            switch (clickMode) {
                case "monthrender":
                    break;
                case "monthtitle":
                    setMode("year");
                    break;
                case "yearrender":
                    setMode("month");
                    break;
                default:
                    setMode("month");
            }
        }

        if (picker === "year") {
            switch (clickMode) {

                case "yearrender":
                    setMode("year");
                    break;
                default:
                    setMode("year");
            }
        }
    }

    const renderMonthTitle = () => {
        const changeDate=picker==="month"?currentSelectDate.currentYear:currentSelectDate.currentYearMonth;
        return <div className={classNames(
            `${prefixCls}-container-month-titleWrapper`
        )}>
            <Button style={{ flex: "none" }} shape={"circle"} icon="arrow-thin-left" flat onClick={() => {if(disabled || isControlled){return ;}setCurrentSelectDate(getPrevYear(currentSelectDate))}} />

            <div className={classNames(
                `${prefixCls}-container-month-title`
            )} onClick={() =>{if(disabled || isControlled){return ;}handleSwitchMode("monthtitle")}}>
                <Slider renderChildren={true} date={changeDate} sliderContainer="container-title" direction={getDirection("currentSelectDate")}>
                    <div className={classNames(
                        `${prefixCls}-container-month-title-text`
                    )}>{`${currentSelectDate.currentYear}`}</div>
                </Slider>
            </div>

            <Button style={{ flex: "none" }} shape={"circle"} icon="arrow-thin-right" flat onClick={() => {if(disabled || isControlled){return ;}setCurrentSelectDate(getNextYear(currentSelectDate))}} />
        </div>
    }

    const renderDayWeek = () => {//render Month
        return <div className={classNames(
            `${prefixCls}-container-day-week`
        )}>
            {WeekEnum.map(item => <span key={item} className={classNames(`${prefixCls}-container-day-week-day`)}>{item}</span>)}
        </div>
    }

    let currentDays = generateDate(currentSelectDate.date);


    const renderMonthDay = () => {//render monthday
        return <div className={classNames(
            `${prefixCls}-container-day-monthday`
        )}>
            <Slider renderChildren={true} date={currentSelectDate.currentMonth} sliderContainer="container-title" direction={getDirection("currentSelectDate")}>
                <div className={classNames(
                    `${prefixCls}-container-day-monthday-content`
                )}>
                    {
                        chunk(currentDays, 7).map((item, index) => {
                            return <div key={item + index} className={classNames(
                                `${prefixCls}-container-day-monthday-content-row`
                            )}>
                                {item.map((itemDay, indexRow) => {


                                    if (!itemDay) {
                                        return <div key={itemDay + indexRow} className={classNames(
                                            `${prefixCls}-container-day-monthday-content-empty`
                                        )}></div>
                                    }
                                    return <div className={classNames(
                                        `${prefixCls}-container-day-monthday-content-day`,
                                        {
                                            ['selected']: currentSelectDate.currentYear === currentDate.currentYear &&
                                                currentSelectDate.currentMonth === currentDate.currentMonth &&
                                                formateDate(Number(itemDay)) === currentDate.currentDay,
                                            ['disabled']:disabled || disabledDate(currentDateA(new Date(`${currentSelectDate.currentYearMonth}-${formateDate(itemDay)}`)).time)
                                        }
                                    )} key={itemDay + indexRow} >
                                        <div className={classNames(
                                            `${prefixCls}-container-day-monthday-content-day-big`
                                        )}></div>
                                        <div className={classNames(
                                            `${prefixCls}-container-day-monthday-content-day-text`,
                                            {
                                                ['now']: currentSelectDate.currentYear === currentDateA().currentYear &&
                                                    currentSelectDate.currentMonth === currentDateA().currentMonth &&
                                                    formateDate(Number(itemDay)) === currentDateA().currentDay,

                                            }
                                        )} onClick={() => handleClickDay(`${currentSelectDate.currentYear}-${currentSelectDate.currentMonth}-${formateDate(Number(itemDay))}`)}>{itemDay}</div>

                                    </div>
                                })}
                            </div>
                        })
                    }
                </div>
            </Slider>
        </div>
    }



    const renderMonth = () => {

        const changeDate=picker==="month"?currentSelectDate.currentYear:currentSelectDate.currentYearMonthDay;

        return <div className={classNames(
            `${prefixCls}-container-month-month`
        )}>
            <Slider renderChildren={true} date={changeDate} sliderContainer="container-title" direction={getDirection("currentSelectDate")}>
                <div className={classNames(
                    `${prefixCls}-container-month-month-content`
                )}>
                    {MonthEnum.map(item => {

                        return <div key={item} className={classNames(
                            `${prefixCls}-container-month-month-content-month`,
                            {
                                ['selected']: currentSelectDate.currentYear === currentDate.currentYear &&
                                    formateMonth(currentDate.MonthNumber) === `${item}月`,
                                ['disabled']:disabled
                            }
                        )} onClick={() => handleClickMonthRender(`${currentSelectDate.currentYear}-${MonthTextMap[`${item}月`]}-${currentSelectDate.currentDay}`)}>
                            <div className={classNames(
                                `${prefixCls}-container-month-month-content-bg`
                            )}></div>
                            <div className={classNames(
                                `${prefixCls}-container-month-month-content-text`,
                                {
                                    ['now']: currentSelectDate.currentYear === currentDateA().currentYear &&
                                        formateMonth(currentDateA().MonthNumber) === `${item}月`

                                }
                            )} >{`${item}月`}</div>
                        </div>
                    })}
                </div>
            </Slider>
        </div>
    }

    const renderContainerDay = () => {
        return <div className={classNames(
            `${prefixCls}-container-day`
        )}>
            {renderDayTitle()}
            {renderDayWeek()}
            {renderMonthDay()}
        </div>
    }

    const renderContainerMonth = () => {
        return <div className={classNames(
            `${prefixCls}-container-month`
        )}>
            {renderMonthTitle()}
            {renderMonth()}
        </div>
    }

    const handleClickYear=(year)=>{
        if(disabled || isControlled){
            return ;
        }
 
        handleSwitchMode("yearrender");
        setCurrentSelectDate(currentDateA(new Date(`${year}-${currentSelectDate.currentMonth}-${currentSelectDate.currentDay}`)));

        if(picker==="year"){
            setCurrentDate(currentDateA(new Date(`${year}-${currentSelectDate.currentMonth}-${currentSelectDate.currentDay}`)))
        }
    }

    const renderContainerYear = () => {

        return <div className={classNames(
            `${prefixCls}-container-year`
        )}><div className={classNames(
            `${prefixCls}-container-year-year`
        )} ref={yearListRef}><div className={classNames(
            `${prefixCls}-container-year-year-list`
        )} >
                    {
                        getListYear(currentDate).map(item => {
                            return <div key={item} className={classNames(
                                `${prefixCls}-container-year-year-button`,
                                {
                                    ['selected']: currentSelectDate.currentYear === item,
                                    ['disabled']:disabled
                                }
                            )} ref={currentSelectDate.currentYear === item ? currentYearRef : null}>
                                <div 
                                    className={classNames(`${prefixCls}-container-year-year-button-text`)} 
                                    onClick={()=>handleClickYear(item)}
                                >{item}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    }

    const renderModeContainer = () => {
        if (mode === "day") {
            return renderContainerDay();
        }

        if (mode === "month") {
            return renderContainerMonth();
        }

        if (mode === "year") {
            return renderContainerYear();
        }
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
                    [`${prefixCls}-landscape`]:landscape,
                    [`${prefixCls}-disabled`]:disabled
                }
            )
        }>

            {renderDisplay()}

            {renderModeContainer()}
        </Paper>
    )
});

DatePicker.propTypes = {
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
    landscape:PropTypes.bool,
    //值
    value:PropTypes.any,
    //默认值
    defaultValue:PropTypes.any,
    //不可选择的时间
    disabledDate:PropTypes.func
};

export default DatePicker;