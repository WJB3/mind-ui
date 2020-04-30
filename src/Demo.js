import React from 'react';
import useControlled from './_utils/useCheckboxControlled';
 
function Demo(){

    const [value,setValue]=useControlled({
        controlled:undefined,
        default:['Apple']
    });

    return (
        <button onClick={()=>setValue([])}>啊啊啊{value}</button>
    )
}


export default Demo;
