
function formateDate(string){
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

function generateDate(date){
    let { startOfMonth,daysOfMonth }=currentDate(date);
    let { currentWeekNum }=currentDate(new Date(startOfMonth));
    
    let arr=[];

    for(let i=0;i<currentWeekNum;i++){
        if(currentWeekNum){
            arr.push("")
        }
    }

    for(let i=0;i<daysOfMonth;i++){
        arr.push(Number(i)+1);
    }

    const restNum=35-arr.length;

    if(arr.length>28){
        for(let i=0;i<restNum;i++){
            arr.push("");
        }
    }
  
    return arr;
   
}

 

const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
      return idx % size === 0
        ? [...arr, [item]]
        : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
}

let currentDate=(date)=>{
    let isDate=date && date instanceof Date;
    let Year=isDate?new Date(date).getFullYear():new Date().getFullYear();
    let Month=isDate?formateDate(new Date(date).getMonth()+1):formateDate(new Date().getMonth()+1);
    let Day=isDate?formateDate(new Date(date).getDate()):formateDate(new Date().getDate());
    let Week=isDate?formateWeek(new Date(date).getDay()):formateWeek(new Date().getDay());
    let WeekNum=isDate?new Date(date).getDay():new Date().getDay();
    let MonthFormat=isDate?formateMonth(new Date(date).getMonth()+1):formateMonth(new Date().getMonth()+1);
    let startOfMonth=`${Year}-${Month}-01`;
    let endOfMonth=`${Year}-${Month}-${new Date(Year,Month,0).getDate()}`;
    let daysOfMonth=`${new Date(Year,Month,0).getDate()}`

    return ({
        currentYear:Year,
        currentMonth:Month,
        currentDay:Day,
        currentWeek:Week,
        currentYearMonthDay:`${Year}-${Month}-${Day}`,
        currentMonthDay:`${Month}-${Day}`,
        currentMonthFormat:MonthFormat,
        startOfMonth:startOfMonth,
        endOfMonth:endOfMonth,
        currentWeekNum:WeekNum,
        daysOfMonth:daysOfMonth
    })
}

 


/**
 * 传参为date对象
 */
 
//当前的年份
const currentYear=currentDate().currentYear;
//当前的月份
const currentMonth=currentDate().currentMonth;
//当前的日期
const currentDay=currentDate().currentDay;
//当前属于第几周
const currentWeek=currentDate().currentWeek;
//当前年月日
const currentYearMonthDay=currentDate().currentYearMonthDay;
//当前月日
const currentMonthDay=currentDate().currentMonthDay;
//当前月转换
const currentMonthFormat=currentDate().currentMonthFormat;
//当月第一天
const startOfMonth=currentDate().startOfMonth;
//当月最后一天
const endOfMonth=currentDate().endOfMonth;
//星期数字
const currentWeekNum=currentDate().currentWeekNum;
//获取当月天数
const daysOfMonth=currentDate().daysOfMonth; 
//星期
const WeekEnum=['日','一','二','三','四','五','六']

export {
    currentDate,
    currentYear,
    currentMonth,
    currentDay,
    currentWeek,
    currentYearMonthDay,
    currentMonthDay,
    currentMonthFormat,
    WeekEnum,
    startOfMonth,
    endOfMonth,
    currentWeekNum,
    daysOfMonth,
    generateDate,
    chunk
}