import React, { useState, useRef, useCallback } from 'react';
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


const DatePicker = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        picker = "day"
    } = props;


    //当选择日期时
    const [currentDate, setCurrentDate] = useState(currentDateA());

    const [mode, setMode] = useState(picker);
    //获取上个状态
    const prevCurrentDate = usePrevious(currentDate);

    const [currentSelectDate, setCurrentSelectDate] = useState(currentDateA());//当前月份
    //获取上个状态
    const prevCurrentSelectDate = usePrevious(currentSelectDate);

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
        setCurrentDate(currentDateA(new Date(date)));
    }

    const handleClickMonth = (date) => {
        setCurrentSelectDate(currentDateA(new Date(date)));

        handleSwitchMode("month");

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

    const renderDisplayYear = () => {//render 头部
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
                    <div className={classNames(`${prefixCls}-display-monthday-title`)}>{`${currentDate.currentMonthDay} ${currentDate.currentWeek}`}</div>
                </Slider>
            </div>
        </div>
    }

    const renderDayTitle = () => {//render title

        return <div className={classNames(
            `${prefixCls}-container-day-titleWrapper`
        )}>
            <Button style={{ flex: "none" }} shape={"circle"} icon="arrow-thin-left" flat onClick={() => setCurrentSelectDate(getPrevMonth(currentSelectDate))} />

            <div className={classNames(
                `${prefixCls}-container-day-title`
            )} onClick={() => handleSwitchMode("day")}>
                <Slider date={currentSelectDate.currentYearMonth} sliderContainer="container-title" direction={getDirection("currentSelectDate")}>
                    <div className={classNames(
                        `${prefixCls}-container-day-title-text`
                    )}>{`${currentSelectDate.currentYear} ${currentSelectDate.currentMonthFormat}`}</div>
                </Slider>
            </div>

            <Button style={{ flex: "none" }} shape={"circle"} icon="arrow-thin-right" flat onClick={() => setCurrentSelectDate(getNextMonth(currentSelectDate))} />
        </div>
    };


    const handleSwitchMode = (clickMode) => {

        if (picker === "day") {
            switch (clickMode) {
                //点击天
                case "day":
                    setMode("month");
                    break;
                case "month":
                    setMode("day");
                    break;
                case "year":
                    setMode("year");
                    break;
                default:
                    setMode("day");
            }

        }
    }

    const renderMonthTitle = () => {
        return <div className={classNames(
            `${prefixCls}-container-month-titleWrapper`
        )}>
            <Button style={{ flex: "none" }} shape={"circle"} icon="arrow-thin-left" flat onClick={() => setCurrentSelectDate(getPrevYear(currentSelectDate))} />

            <div className={classNames(
                `${prefixCls}-container-month-title`
            )} onClick={() => handleSwitchMode("year")}>
                <Slider renderChildren={true} date={currentSelectDate.currentYearMonth} sliderContainer="container-title" direction={getDirection("currentSelectDate")}>
                    <div className={classNames(
                        `${prefixCls}-container-month-title-text`
                    )}>{`${currentSelectDate.currentYear}`}</div>
                </Slider>
            </div>

            <Button style={{ flex: "none" }} shape={"circle"} icon="arrow-thin-right" flat onClick={() => setCurrentSelectDate(getNextYear(currentSelectDate))} />
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
                                                formateDate(Number(itemDay)) === currentDate.currentDay
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
        return <div className={classNames(
            `${prefixCls}-container-month-month`
        )}>
            <Slider renderChildren={true} date={currentSelectDate.currentYearMonthDay} sliderContainer="container-title" direction={getDirection("currentSelectDate")}>
                <div className={classNames(
                    `${prefixCls}-container-month-month-content`
                )}>
                    {MonthEnum.map(item => {

                        return <div key={item} className={classNames(
                            `${prefixCls}-container-month-month-content-month`,
                            {
                                ['selected']: currentSelectDate.currentYear === currentDate.currentYear &&
                                    formateMonth(currentDate.MonthNumber) === `${item}月`
                            }
                        )} onClick={() => handleClickMonth(`${currentSelectDate.currentYear}-${MonthTextMap[`${item}月`]}-01`)}>
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

    const renderContainerYear = () => {
        return <div className={classNames(
            `${prefixCls}-container-year`
        )}><div className={classNames(
            `${prefixCls}-container-year-year`
        )}><div className={classNames(
            `${prefixCls}-container-year-year-list`
        )}>
                    {
                        getListYear(currentDate).map(item => {
                            return <div key={item} className={classNames(`${prefixCls}-container-year-button`)}>
                                <div className={classNames(`${prefixCls}-container-year-button-text`)}>{item}</div>
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


    return (
        <Paper ref={handleRef} deep={4} style={style} className={
            classNames(
                prefixCls,
                className
            )
        }>

            {renderDisplayYear()}

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
    picker: PropTypes.string
};

export default DatePicker;