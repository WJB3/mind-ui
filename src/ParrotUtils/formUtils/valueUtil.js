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