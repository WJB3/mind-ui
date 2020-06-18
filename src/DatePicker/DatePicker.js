import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext'
import setRef from '../_utils/setRef';
import useForkRef from '../_utils/useForkRef';
import Paper from '../Paper';
import Button from '../ButtonBase';
import { currentDate as currentDataA, WeekEnum, generateDate, chunk,formateDate,getPrevMonth,getNextMonth } from '../_utils/dateUtils';
import  Slider from  './Slider';
import usePrevious from '../_utils/usePrevious';
import "./index.scss";


const DatePicker = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        disabled
    } = props;
    

    //当选择日期时
    const [currentDate, setCurrentDate] = useState(currentDataA());
    //获取上个状态
    const prevCurrentDate=usePrevious(currentDate);

    const [currentSelectDate, setCurrentSelectDate] = useState(currentDataA());//当前月份

    const [currentDays, setCurrentDays] = useState(generateDate(new Date));//当前的天数

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

    const handleClickDay=(day)=>{//点击日期
        setCurrentDate(currentDataA(new Date(`${currentDate.currentYearMonth}-${formateDate(day)}`)))
    }

    const getDirection=()=>{

        if(prevCurrentDate){
            if(prevCurrentDate.time>currentDate.time){
                return "prev";
            }
            return "next";
        }

        return "next";
    }

    const renderDisplayYear=()=>{//render 头部
        return <div className={classNames(
            `${prefixCls}-display`
        )}>
            <div className={classNames(
                `${prefixCls}-display-year`
            )}>
                <Slider date={currentDate.currentYear} direction={getDirection()}>
                    <div className={classNames(`${prefixCls}-display-year-title`)}>{`${currentDate.currentYear}`}</div>
                </Slider>
            </div>
            <div className={classNames(
                `${prefixCls}-display-monthday`
            )}>
                <Slider date={currentDate.currentYearMonthDay} direction={getDirection()}>
                    <div className={classNames(`${prefixCls}-display-monthday-title`)}>{`${currentDate.currentMonthDay} ${currentDate.currentWeek}`}</div>
                </Slider>
            </div>
        </div>
    }

    const renderTitleWrapper=()=>{//render title
        return <div className={classNames(
            `${prefixCls}-container-titleWrapper`
        )}>
            <Button style={{flex: "none"}} shape={"circle"} icon="arrow-thin-left" flat onClick={()=>setCurrentSelectDate(getPrevMonth(currentSelectDate))}/>
                <Slider date={currentSelectDate.currentYearMonth} sliderContainer="container-title">
                    <div className={classNames(
                    `${prefixCls}-container-title`
                    )}><div className={classNames(
                        `${prefixCls}-container-title-text`
                        )}>{`${currentSelectDate.currentYear} ${currentSelectDate.currentMonthFormat}`}</div></div>
                </Slider>
            <Button style={{flex: "none"}} shape={"circle"} icon="arrow-thin-right" flat onClick={()=>setCurrentSelectDate(getNextMonth(currentSelectDate))}/>
        </div>
    };

    const renderWeek=()=>{//render Month
        return <div className={classNames(
            `${prefixCls}-container-week`
        )}>
            {WeekEnum.map(item => <span key={item} className={classNames(`${prefixCls}-container-week-day`)}>{item}</span>)}
        </div>
    }

    const renderMonthDay=()=>{//render monthday
        return <div className={classNames(
            `${prefixCls}-container-monthday`
        )}>
            <div className={classNames(
                `${prefixCls}-container-monthday-content`
            )}>
                {
                    chunk(currentDays, 7).map((item, index) => {
                        return <div key={index} className={classNames(
                            `${prefixCls}-container-monthday-content-row`
                        )}>
                            {item.map((itemDay,indexRow)=>{
                                if(!itemDay){
                                    return <div  key={indexRow} className={classNames(
                                        `${prefixCls}-container-monthday-content-empty`
                                    )}></div>
                                }
                                return <div className={classNames(
                                    `${prefixCls}-container-monthday-content-day`,
                                    {
                                        ['selected']:currentDate.currentDay===formateDate(Number(itemDay))
                                    }
                                )} key={indexRow} >
                                    <div className={classNames(
                                        `${prefixCls}-container-monthday-content-day-big`
                                    )}></div>
                                    <div className={classNames(
                                        `${prefixCls}-container-monthday-content-day-text`,
                                        {
                                            ['now']:currentSelectDate.currentYear===currentDataA().currentYear && 
                                            currentSelectDate.currentMonth===currentDataA().currentMonth &&
                                            formateDate(Number(itemDay))===currentDataA().currentDay,
                                            
                                        }
                                    )} onClick={()=>handleClickDay(itemDay)}>{itemDay}</div>
                                   
                                </div>
                            })}
                        </div>
                    })
                }
            </div>

        </div>
    }

    return (
        <Paper ref={handleRef} deep={4} className={
            classNames(
                prefixCls,
                className
            )
        }>
            {renderDisplayYear()}
            
            <div className={classNames(
                `${prefixCls}-container`
            )}>

                {renderTitleWrapper()}
                
                {renderWeek()}

                {renderMonthDay()}
            </div>
        </Paper>
    )
});

DatePicker.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object
};

export default DatePicker;