/**
 * 判断是否是数组
 */
function isArray(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

/**
 * 判断是否是对象
 */
function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * 判断是否是函数
 */
function isFunction(value) {
    return Object.prototype.toString.call(value) === "[object Function]"
}

/**
*循环handler
*/
function eachHandler(collection, fn) {
    let i = 0, length = collection.length, cont;
    for (i; i < length; i++) {
        cont = fn(collection[i], i);
        if (cont === false) {
            break;
        }
    }
}

/**
 * 判断是否在window环境下
 */
function windowIsUndefined() {
    return !(typeof window !== "undefined" && window.document && window.document.createElement);
}

/**
 * 
 * @param children 通过key寻找元素
 * @param key 
 */
function findChildInChildrenByKey(children, key) {
    let ret = null;
    if (children) {
        children.forEach(c => {
            if (ret || !c) {
                return;
            }
            if (c.key === key) {
                ret = c;
            }
        });
    }
    return ret;
}

/**
 * 合并子元素
 * @param prev 
 * @param next 
 */

function mergeChildren(prev, next) {
    let ret = [];
    const nextChildrenPending = {};
    let pendingChildren = [];
    let followChildrenKey;
    prev.forEach(c => {
        if (!c) {
            return;
        }
        if (findChildInChildrenByKey(next, c.key)) {
            if (pendingChildren.length) {
                nextChildrenPending[c.key] = pendingChildren;
                pendingChildren = [];
            }
            followChildrenKey = c.key;
        } else if (c.key) {
            pendingChildren.push(c);
        }
    })
    if (!followChildrenKey) {
        ret = ret.concat(pendingChildren);
    }
    next.forEach(c => {
        if (!c) {
            return;
        }
        if (nextChildrenPending.hasOwnProperty(c.key)) {
            ret = ret.concat(nextChildrenPending[c.key]);
        }
        ret.push(c);
        if (c.key === followChildrenKey) {
            ret = ret.concat(pendingChildren);
        }
    })
    return ret;
}

function transformArguments(arg,key,i){
    let result;
    if(typeof arg==="function"){
        result=arg({
            key,
            index:i,
        });
    }else{
        result=arg;
    }
    if(Array.isArray(result)){
        if(result.length===2){
            return result;
        }
        return [result[0],result[0]];
    }
    return [result,result];
}

function getChildrenFromProps(props){
    return props && props.children;
}

export {
    isArray,
    isObject,
    isFunction,
    eachHandler,
    windowIsUndefined,
    findChildInChildrenByKey,
    mergeChildren,
    transformArguments,
    getChildrenFromProps
}