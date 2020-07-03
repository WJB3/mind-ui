
import useDate from './useDate';
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

export function setDateMeridiem(value,meridiem,date){

    let _date=useDate(date);

    if(meridiem==="am"){

    }

    if(meridiem==="pm"){

    }

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