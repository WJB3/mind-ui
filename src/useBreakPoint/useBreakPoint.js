import React, { useState, useEffect } from 'react';
import { responsiveObserve,responsiveArray } from './responsiveObserve';

export default function useBreakPoint(queryInput, options = {}) {

    const [screens, setScreens] = useState({xs:true,sm:true,md:true,lg:true,xl:true,xxl:true});
 
    useEffect(() => {

        let token=responsiveObserve.subscribe(screens=>{
            setScreens(screens); 
        });

        return ()=>{
            responsiveObserve.unsubscribe(token)
        };
        
    }, []);
 
    return screens;

}