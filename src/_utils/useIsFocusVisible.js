import React from 'react';
import ReactDOM from 'react-dom';

let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout = null;

const inputTypesWhitelist = {
    text:true,
    search:true,
    url:true,
    tel:true,
    email:true,
    password:true,
    number:true,
    date:true,
    month:true,
    week:true,
    time:true,
    datetime:true,
    'datetime-local':true
}

/**
 * 计算给定元素是否自动触发
 */
function focusTriggersKeyboardModality(node){
    const {type,tagName}=node;

    if (tagName === 'INPUT' && inputTypesWhitelist[type] && !node.readOnly) {
        return true;
    }

    if(tagName==="TEXTAREA" && !node.readOnly){
        return true;
    }

    if(node.isContentEditable){
        return true;
    }

    return false;
}

/**
 * 
 * @param {*KeyboardEvent} doc 
 *使用' hadKeyboardEvent '跟踪我们的键盘状态。
 *如果最近的用户交互是通过键盘进行的;
 *和按键不包括一个元，alt/选项，或控制键;
 *情态动词是键盘。否则，模态就不是键盘。
 */
function handleKeyDown(event) {
    if (event.metaKey || event.altKey || event.ctrlKey) {
        return;
    }
    hadKeyboardEvent = true;
}

/**
 * *如果用户在任何时候使用指向设备单击，请确保我们进行更改
*远离键盘的模态。
这避免了用户按下已聚焦键的情况
元素，然后单击另一个元素，用a聚焦它
*指向设备，而我们仍然认为我们在键盘模式。
 * @param {*} doc 
 */

function handlePointerDown(){
    hadKeyboardEvent = false;
}

function prepare(doc) {
    doc.addEventListener("keydown", handleKeyDown, true);
    doc.addEventListener("mousedown", handlePointerDown, true);
    doc.addEventListener("pointerdown", handlePointerDown, true);
    doc.addEventListener("touchstart", handlePointerDown, true);
    doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}

export function teardown(doc) {
    doc.removeEventListener('keydown', handleKeyDown, true);
    doc.removeEventListener('mousedown', handlePointerDown, true);
    doc.removeEventListener('pointerdown', handlePointerDown, true);
    doc.removeEventListener('touchstart', handlePointerDown, true);
    doc.removeEventListener('visibilitychange', handleVisibilityChange, true);
}
  

function handleVisibilityChange(){
    if(this.visibilityState==="hidden"){
        if(hadFocusVisibleRecently){
            hadKeyboardEvent=true;
        }
    }
}

function isFocusVisible(event){
    const {target}=event;
    try{
        return target.matches(":focus-visible");
    }catch(error){
            // browsers not implementing :focus-visible will throw a SyntaxError
            // we use our own heuristic for those browsers
            // rethrow might be better if it's not the expected error but do we really
            // want to crash if focus-visible malfunctioned?
    }
    return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}

function handleBlurVisible() {
    hadFocusVisibleRecently = true;
    window.clearTimeout(hadFocusVisibleRecentlyTimeout);
    hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
    }, 100);
}

export default function useIsFocusVisible() {
    const ref = React.useCallback((instance) => {
        const node = ReactDOM.findDOMNode(instance);
        if (node != null) {
            prepare(node.ownerDocument);
        }
    }, []);

    return {
        isFocusVisible,
        onBlurVisible: handleBlurVisible,
        ref
    }
}