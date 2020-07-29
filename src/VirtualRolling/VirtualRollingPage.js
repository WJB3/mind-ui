

import React,{ Fragment,useState,useMemo } from 'react';
// import memoize from './memoize';
// import memoize from 'memoize-one';

const Child=()=>{

    const computed=(str)=>{
        console.log("computed")
        return `computed${str}`;
    }

    const memoizeC=useMemo(()=>computed,[computed]);

    return <div>{memoizeC("CHild")}</div>
}

const Page=()=>{

    const [count,setCount]=useState(0);

    return (
        <Fragment>
            <button onClick={()=>setCount(count+1)}>{count}</button>
            <Child></Child>
        </Fragment>
    )
}

export default Page;