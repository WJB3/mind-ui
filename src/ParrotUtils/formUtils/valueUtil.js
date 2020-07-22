import get from '../utils/get';
import set from '../utils/set';

import { toArray } from './typeUtil';

/**
 * 'a' => ['a']
 * 123 => [123]
 * ['a', 123] => ['a', 123]
 */
export function getNamePath(path){
    return toArray(path);
}

export function getValue(store,namePath){
    const value=get(store,namePath);
    return value;
}

export function setValue(store,namePath,value){
    const newStore=set(store,namePath,value);
    return newStore;
}

function isObject(obj){
    return typeof obj==='object' && obj!==null && Object.getPrototypeOf(obj)===Object.prototype;
}

export function matchNamePath(namePath,changedNamePath){
    if(!namePath || !changedNamePath || namePath.length!==changedNamePath.length){
        return false;
    }
    return namePath.every((nameUnit,i)=>changedNamePath[i]===nameUnit)
}

export function cloneByNamePathList(store,namePathList){
    let newStore={};
    namePathList.forEach(namePath=>{
        const value=getValue(store,namePath);
        newStore=setValue(newStore,namePath,value);
    });
    return newStore;
}

export function containsNamePath(namePathList,namePath){
    return namePathList && namePathList.some(path=>matchNamePath(path,namePath));
}