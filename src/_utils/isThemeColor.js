import React from 'react';
import { typeEnum } from '../components/color'

export default function isThemeColor(color){
    let index=Object.values(typeEnum).findIndex(item=>item===color);//判断是否颜色类型
    if(index===-1){
        return false;
    }
    return true;

}