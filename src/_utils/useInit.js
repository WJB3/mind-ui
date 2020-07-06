
import React from 'react';

export default function useInit(){//表示是否初始化
    const initRef=React.useRef(null);

    React.useEffect(()=>{
        initRef.current=true;
    },[]);

    return initRef;
}