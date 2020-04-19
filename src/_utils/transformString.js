export default function transformString(value){
    if(Object.prototype.toString(value)==="[object Number]"){
        return Number(value);
    }
}