export default function transformString(value){
    if(Object.prototype.toString.call(value)==="[object Number]"){
        return String(value);
    }
    return value;
}