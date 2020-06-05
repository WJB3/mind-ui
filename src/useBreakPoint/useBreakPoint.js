import React, { useState, useEffect } from 'react';
import useMediaQuery from '../useMediaQuery'

export default function useBreakPoint(queryInput,options={}){

    const [screen,setScreen]=useState("xxl");
 
    const mediaArr={
        xs:"(max-width:576px)",
        sm:"(min-width:576px)",
        md:"(min-width:768px)",
        lg:"(min-width:992px)",
        xl:"(min-width:1200px)",
        xxl:"(min-width:1600px)"
    };

    const getMediaScreen=()=>{
        const mediaMatchArr=[];
   
        for(let key in mediaArr){
           
                mediaMatchArr.push({
                    key:useMediaQuery(mediaArr[key])
                })
        }
       
        return mediaMatchArr;
    }

    useEffect(()=>{
        // const mediaMatchArr=getMediaScreen();
        // console.log(mediaMatchArr)
    },[]);
 
    return [screen]

}