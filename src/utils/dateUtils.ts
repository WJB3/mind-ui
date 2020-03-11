/**
 * 获取一年内所有的某个或某些天数
 * @param year 
 * @param oneDayArray 0,1,2,3,4,5,6 0-6分别代表星期天到星期六
 */

function getDayOfYear(year:string,oneDayArray){
    let date=new Date(year);
    let yearNumber=date.getFullYear();
    let m,d,day,dayNum,resultDate=[];
    for(m=1;m<=12;m++){
        switch(m){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
            dayNum=31;
            break;
            case 4:
            case 6:
            case 9:
            case 11:
            dayNum=30;
            break;
            case 2:
            if(yearNumber%4===0&&yearNumber%100!=0||yearNumber%400==0){
                dayNum=29;
            }else{
                dayNum=28;
            }
            break;
        }
        for(d=1;d<=dayNum;d++){
            date.setMonth(m-1,d);
            day=date.getDay();
            if(oneDayArray.indexOf(day)>-1){
                let month=String(date.getMonth()+1).length===2?date.getMonth()+1:`0${date.getMonth()+1}`;
                let day=String(date.getDate()).length===2?date.getDate():`0${date.getDate()}`;
                resultDate.push(`${date.getFullYear()}-${month}-${day}`)
            } 
        }
    }
    

    return resultDate;

}

export {
    getDayOfYear
}