import React,{useState,memo,useMemo,useCallback} from 'react';

const SubCounter=memo(({onClick,data})=>{
    console.log('SubCounter render');
    console.log(data);
    return (
        <button onClick={onClick}>{data.number}</button>
    )
})

 
export  default  function Counter2(){
    console.log('Counter2 render');
    const [name,setName]= useState('计数器');
    const [number,setNumber] = useState(0);
    
    const data = useMemo(()=>({number}),[number])
 
    return (
        <>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <SubCounter data={data} />
        </>
    )
}
 