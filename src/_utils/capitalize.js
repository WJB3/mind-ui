/**
 * 首字母大写
 * @param {*} text 
 */
export default function capitalize(text){
    if(typeof text==="string"){
        return text.charAt(0).toUpperCase()+text.slice(1);
    }
    return text;
}