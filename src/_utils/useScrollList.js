
import React, { useEffect } from 'react';

export default function useScrollList(date,type,scrollheight){
    const listRef=React.useRef(null);
    const currentRef=React.useRef(null);

    useEffect(()=>{
        let distance = currentRef.current.offsetTop;
      
        listRef.current.scrollTop = distance - scrollheight;
    },[date]);

    return [listRef,currentRef];
}
