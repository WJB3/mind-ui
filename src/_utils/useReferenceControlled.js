
/**
 * 1.传入2个值 一个默认值 一个值
 * 2.如果默认值不是空，而值为空，则返回一个值和改变对应值的函数，通过这个函数可以改变值
 * 3.如果值不是空，则返回一个值和改变对应值的函数,而此时不可通过这个函数改变对应的值
 */

export default function useReferenceControlled(defaultValue,value){  
    let isControlled=!!value;//如果value有值说明是受控
    const [valueState,setValueState]=useState(value||defaultValue);

    function setValueStateIfControlled(value){
        if(!isControlled){//非受控可以改变值，受控不可改变值
            setValueState(value);
        }
    }

    return [valueState,setValueStateIfControlled]
}