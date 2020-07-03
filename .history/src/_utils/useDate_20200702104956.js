
import React from 'react';

function formateComplete(string){//补全日期
    if(String(string).length===1){
        return `0${string}`;
    }
    return string;
}

function formateWeek(day){
    switch(day){
        case 0:
            return "星期天";
        case 1:
            return "星期一";
        case 2:
            return "星期二";
        case 3:
            return "星期三";
        case 4:
            return "星期四";
        case 5:
            return "星期五";
        case 6:
            return "星期六"

    }
}

function formateMonth(day){
     
    switch(day){
        case 1:
            return "一月";
        case 2:
            return "二月";
        case 3:
            return "三月";
        case 4:
            return "四月";
        case 5:
            return "五月";
        case 6:
            return "六月";
        case 7:
            return "七月";
        case 8:
            return "八月";
        case 9:
            return "九月";
        case 10:
            return "十月";
        case 11:
            return "十一月";
        case 12:
            return "十二月";
    }
}

export default function useDate(date){//参数为一个date对象

    let isDate=date && date instanceof Date;
    let Year=isDate?new Date(date).getFullYear():new Date().getFullYear();
    let Month=isDate?formateComplete(new Date(date).getMonth()+1):formateComplete(new Date().getMonth()+1);
    let Day=isDate?formateComplete(new Date(date).getDate()):formateComplete(new Date().getDate());
    let Week=isDate?formateWeek(new Date(date).getDay()):formateWeek(new Date().getDay());
    let Hours=isDate?new Date(date).getHours():new Date().getHours();
    
    let Minutes=isDate?new Date(date).getMinutes():new Date().getMinutes();
    let WeekNum=isDate?new Date(date).getDay():new Date().getDay();
    let MonthFormat=isDate?formateMonth(new Date(date).getMonth()+1):formateMonth(new Date().getMonth()+1);
    let startOfMonth=`${Year}-${Month}-01`;
    let endOfMonth=`${Year}-${Month}-${new Date(Year,Month,0).getDate()}`;
    let daysOfMonth=`${new Date(Year,Month,0).getDate()}`;
    let getTime=isDate?new Date(date).getTime:new Date().getTime;
    let time=isDate?new Date(date).getTime():new Date().getTime();
    let dateProp=isDate?new Date(date):new Date();
    let MonthNumber=isDate?new Date(date).getMonth()+1:new Date().getMonth()+1;

    return ({
        currentYear:Year,
        currentMonth:Month,
        currentDay:Day,
        currentHour:Hours,
        currentMinute:Minutes,
        currentWeek:Week,
        currentYearMonthDay:`${Year}-${Month}-${Day}`,
        currentYearMonth:`${Year}-${Month}`,
        currentMonthDay:`${Month}-${Day}`,
        currentMonthFormat:MonthFormat,
        startOfMonth:startOfMonth,
        endOfMonth:endOfMonth,
        currentWeekNum:WeekNum,
        daysOfMonth:daysOfMonth,
        getTime:getTime,
        time:time,
        date:dateProp,
        MonthNumber:MonthNumber,
        format:(format)=>{
            switch(format){
                case "YY-MM-DD":
                    return `${Year}-${Month}-${Day}`;
                default:
                    return `${Year}-${Month}-${Day}`;
            }
        },
        getHours:()=>{
            return Hours;
        }
    })
}