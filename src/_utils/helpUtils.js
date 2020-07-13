function isNull(value){
    if(!value && typeof(value)!=="undefined" && value!==0){
        return true;
    }
    return false;
}


export {
    isNull
}
