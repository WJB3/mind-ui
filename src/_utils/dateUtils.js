
function formateDate(string){//补全日期
    if(String(string).length===1){
        return `0${string}`;
    }
    return string;
}

const MonthTextMap={
    "一月":"01",
    "二月":"02",
    "三月":"03",
    "四月":"04",
    "五月":"05",
    "六月":"06",
    "七月":"07",
    "八月":"08",
    "九月":"09",
    "十月":"10",
    "十一月":"11",
    "十二月":"12",
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

    if(restNum>0){
        if(arr.length>28){
            for(let i=0;i<restNum;i++){
                arr.push("");
            }
        }
    }else if(restNum<0){
        for(let i=0;i<7+restNum;i++){
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
        MonthNumber:MonthNumber
    })
}

//获取下个月
function getNextMonth(currentSelectDate){
    const month=Number(currentSelectDate.currentMonth);
    const year=Number(currentSelectDate.currentYear);
    if(month>0&&month<12){
        return currentDate(new Date(`${currentSelectDate.currentYear}-${formateDate(month+1)}-01`));
    }

    return currentDate(new Date(`${year+1}-01-01`));
}
//获取上个月
function getNextYear(currentSelectDate){
    const year=Number(currentSelectDate.currentYear);
   
    return currentDate(new Date(`${year+1}-01-01`));
}
//获取上个月
function getPrevMonth(currentSelectDate){
    const month=Number(currentSelectDate.currentMonth);
    const year=Number(currentSelectDate.currentYear);
    if(month>1&&month<=12){
        return currentDate(new Date(`${year}-${formateDate(month-1)}-01`));
    }

    return currentDate(new Date(`${year-1}-12-01`));
}
//获取下个月
function getPrevYear(currentSelectDate){
    
    const year=Number(currentSelectDate.currentYear);
   

    return currentDate(new Date(`${year-1}-01-01`));
}
//获取前后一百年
function getListYear(currentDate){
    const currentYear=currentDate.currentYear;
    const startYear=currentYear-100;
    const endYear=currentYear+100;
    const yearList=[];
    for(let i=startYear;i<endYear;i++){
        yearList.push(i);
    }
    return yearList;
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
const WeekEnum=['日','一','二','三','四','五','六'];

//月份
const MonthEnum=['一','二','三','四','五','六',
                '七','八','九','十','十一','十二'];

const getTime=currentDate().getTime

const time=currentDate().time

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
    MonthEnum,
    startOfMonth,
    endOfMonth,
    currentWeekNum,
    daysOfMonth,
    getTime,
    time,
    generateDate,
    chunk,
    formateDate,
    getNextMonth,
    getPrevMonth,
    getNextYear,
    getPrevYear,
    formateMonth,
    MonthTextMap,
    getListYear
}