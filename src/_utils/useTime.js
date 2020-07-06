
import useDate,{formateComplete} from './useDate';
import React from 'react';

export const getMeridiem=(date)=>{
 
    if(!date){return null;}
    return useDate(date).getHours()>=12?"pm":"am"
}

const convertValueToMeridiem=(value,meridiem,ampm)=>{
    if(ampm){
        const currentMeridiem=value>12?"pm":"am";
        if(currentMeridiem!==meridiem){
            return meridiem==='am'?value-12:value+12;
        }
    }
    return value;
}

export function useMeridiemMode(date,onChange){
    const meridiemMode=getMeridiem(date);

    const handleMeridiemChange=React.useCallback(()=>{
        const timeWithMeridiem=convertValueToMeridiem(date,true);
        onChange(timeWithMeridiem,false);
    },[date,onChange])

    return {meridiemMode,handleMeridiemChange}
}

export function setDateMeridiem(value,meridiem,date,type){

    let _date=useDate(date);
    let _value;

    if(type==="hours"){
        _value=meridiem==="am"?formateComplete(value):value+12;
    }else{
        _value=value;
    }
    

    if(type==="hours"){
        return new Date(`${_date.format("YY-MM-DD")} ${_value}:${formateComplete(_date.getMinutes())}`);
    }
 
    return new Date(`${_date.format("YY-MM-DD")} ${formateComplete(_date.getHours())}:${formateComplete(_value)}`);

}

export function useTimeLoop(value,type){//限制小时不超过12
    const Hours=12;
    const Minutes=60;

    
    if(type==="hours"){
        let leave=value%Hours;

        if(leave===0){
            return 12;
        }

        return leave;
    }

    return value%Hours;
}

export const HoursNumbers=[
    '01','02','03','04','05','06','07','08','09','10','11','12'
];

export const MinutesNumbers=[
    '00','01','02','03','04','05','06','07','08','09',
    '10','11','12','13','14','15','16','17','18','19',
    '20','21','22','23','24','25','26','27','28','29',
    '30','31','32','33','34','35','36','37','38','39',
    '40','41','42','43','44','45','46','47','48','49',
    '50','51','52','53','54','55','56','57','58','59',
]