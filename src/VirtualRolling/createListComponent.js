

import React,{ memo,createElement,useRef, useEffect } from 'react';
import useStateCallback from '../_utils/useStateCallback'
import {getRTLOffsetType} from './domHelpers';
import { cancelTimeout, requestTimeout } from './timer';
import memoized from '../_utils/memoize';
 
const IS_SCROLLING_DEBOUNCE_INTERVAL=150;
const defaultItemKey = (index, data) => index;

export default function createListComponent({
    getItemOffset,
    getEstimatedTotalSize,
    getItemSize,
    getOffsetForIndexAndAlignment,
    getStartIndexForOffset,
    getStopIndexForStartIndex,
    initInstanceProps,
    shouldResetStyleCacheOnItemSizeChange,
    validateProps
}){
    return memo(function List(props){

        const {
            outerElementType,
            outerTagName,
            className,
            direction='ltr',
            layout="vertical",
            initialScrollOffset,
            itemSize,
            outerRef,
            height,
            width,
            style,
            innerElementType,
            innerTagName,
            itemCount,
            itemData,
            overscanCount=2,
            itemKey=defaultItemKey,
            useIsScrolling=false,
            shouldResetStyleCacheOnItemSizeChange,
            innerRef,
            onItemsRendered,
            onScroll:onScrollProp,
            children
        }=props;

        const _resetIsScrollingTimeoutId=useRef(null);

        const _outerRef=useRef(null);

        const [stateObj,setStateObj]=useStateCallback({
            isScrolling:false,
            scrollDirection:"forward",
            scrollOffset:typeof initialScrollOffset==='number'?initialScrollOffset:0,
            scrollUpdateWasRequested:false
        });

        const _resetIsScrollingDebounced=()=>{
            if(_resetIsScrollingTimeoutId.current!==null){
                cancelTimeout(_resetIsScrollingTimeoutId.current);
            }
            _resetIsScrollingTimeoutId.current=requestTimeout(
                _resetIsScrolling,
                IS_SCROLLING_DEBOUNCE_INTERVAL
            );
        }

        const _resetIsScrolling=()=>{

            _resetIsScrollingTimeoutId.current=null;

            setStateObj({
                ...stateObj,
                isScrolling:false
            },()=>{
                _getItemStyleCache(-1,null);
            })

        }

        const _getItemStyleCache=memoized((_,__,___)=>({}))

        const _getItemStyle=(index)=>{
            const itemStyleCache=_getItemStyleCache(
                shouldResetStyleCacheOnItemSizeChange && itemSize,
                shouldResetStyleCacheOnItemSizeChange && layout,
                shouldResetStyleCacheOnItemSizeChange && direction
            );

            let style;
            if(itemStyleCache.hasOwnProperty(index)){
                style=itemStyleCache[index];
            }else{
                const offset=getItemOffset(props,index);
                const size=getItemSize(props,index);

                const isHorizontal=direction==="horizontal"||layout==="horizontal";
                const isRtl=direction==='rtl';
                const offsetHorizontal=isHorizontal?offset:0;
                itemStyleCache[index]=style={
                    position:"absolute",
                    left:isRtl?undefined:offsetHorizontal,
                    right:isRtl?offsetHorizontal:undefined,
                    top:!isHorizontal?offset:0,
                    height:!isHorizontal?size:"100%",
                    width:isHorizontal?size:"100%"
                }
            }
            return style;
        }

        const _onScrollHorizontal=(scrollEvent)=>{

            const { clientWidth,scrollLeft,scrollWidth }=scrollEvent.currentTarget;

            setStateObj(prevStateObj=>{
                if(prevStateObj.scrollOffset===scrollLeft){
                    return null;
                }

                let scrollOffset=scrollLeft;

                if(direction==="rtl"){
                    switch(getRTLOffsetType()){
                        case "negative":
                            scrollOffset=-scrollLeft;
                            break;
                        case "positive-descending":
                            scrollOffset=scrollWidth-clientWidth-scrollLeft;
                            break; 
                    }
                }

                scrollOffset=Math.max(
                    0,
                    Math.min(scrollOffset,scrollWidth-clientWidth)
                );

                return {
                    isScrolling: true,
                    scrollDirection:prevStateObj.scrollOffset<scrollLeft?'forward':'backward',
                    scrollOffset,
                    scrollUpdateWasRequested:false
                };
            },_resetIsScrollingDebounced);
        }

        const _onScrollVertical=(event)=>{

            const {clientHeight,scrollHeight,scrollTop}=event.currentTarget;

            console.log(clientHeight)
            console.log(scrollHeight)
            console.log(scrollTop)

            setStateObj(
                prevStateObj=>{ 
                    if(prevStateObj.scrollOffset===scrollTop){
                        return null;
                    }
                    const scrollOffset = Math.max(
                        0,
                        Math.min(scrollTop, scrollHeight - clientHeight)
                    ); 
                    return {
                        isScrolling:true,
                        scrollDirection:prevStateObj.scrollOffset<scrollOffset?"forward":"backward",
                        scrollOffset,
                        scrollUpdateWasRequested:false
                    }
                },_resetIsScrollingDebounced
            )
        }
        
        const _outerRefSetter=(ref)=>{

            _outerRef.current=ref;

            if(typeof outerRef==='function'){
                outerRef(ref);
            }else if(outerRef!==null&&typeof outerRef==="object"&&outerRef.hasOwnProperty("current")){
                outerRef.current=ref;
            }

        }

        const _getRangeToRender=()=>{
            const { isScrolling,scrollDirection,scrollOffset }=stateObj;
 
            if(itemCount===0){
                return [0,0,0,0];
            }

            const startIndex=getStartIndexForOffset(props,scrollOffset);
            const stopIndex=getStopIndexForStartIndex(props,startIndex,scrollOffset);

            const overscanBackward=!isScrolling||scrollDirection==='backward'?Math.max(1,overscanCount):1;
            const overscanForward=!isScrolling||scrollDirection==='forward'?Math.max(1,overscanCount):1;

            return [
                Math.max(0,startIndex-overscanBackward),
                Math.max(0,Math.min(itemCount-1,stopIndex+overscanForward)),
                startIndex,
                stopIndex
            ]
        }

        const isHorizontal=direction==="horizontal"||layout==="horizontal";

        const onScroll=isHorizontal?_onScrollHorizontal:_onScrollVertical;
        
        const [startIndex,stopIndex]=_getRangeToRender();

        const items=[];
        if(itemCount>0){
            for(let index=startIndex;index<=stopIndex;index++){
                items.push(
                    createElement(children,{
                        data:itemData,
                        key:itemKey(index,itemData),
                        index,
                        isScrolling:useIsScrolling?stateObj.isScrolling:undefined,
                        style:_getItemStyle(index)
                    })
                )
            }
        }

        const estimatedTotalSize=getEstimatedTotalSize(
            props
        );

        const _callOnItemsRendered=memoized((overscanStartIndex,overscanStopIndex,visibleStartIndex,visibleStopIndex)=>
            onItemsRendered(
                overscanStartIndex,
                overscanStopIndex,
                visibleStartIndex,
                visibleStopIndex
            )
        );

        const _callOnScroll=memoized((
            scrollDirection,
            scrollOffset,
            scrollUpdateWasRequested
        )=>onScrollProp({
            scrollDirection,
            scrollOffset,
            scrollUpdateWasRequested
        }))

        const _callPropsCallbacks=()=>{
            if(typeof onItemsRendered ==="function" ){
                if(itemCount>0){
                    const [
                        overscanStartIndex,
                        overscanStopIndex,
                        visibleStartIndex,
                        visibleStopIndex,
                    ]=_getRangeToRender();

                    _callOnItemsRendered(
                        overscanStartIndex,
                        overscanStopIndex,
                        visibleStartIndex,
                        visibleStopIndex
                    )
                }
            }

            if(typeof onScrollProp==='function'){
                
                const {scrollDirection,scrollOffset,scrollUpdateWasRequested}=stateObj;

                _callOnScroll(
                    scrollDirection,
                    scrollOffset,
                    scrollUpdateWasRequested
                );

            }
        }

        useEffect(()=>{

            if(typeof initialScrollOffset==='number' && _outerRef.current!=null){
                const outerRef=_outerRef.current;

                if(direction==="horizontal" || layout==='horizontal'){
                    outerRef.scrollLeft=initialScrollOffset;
                }else{
                    outerRef.scrollTop=initialScrollOffset;
                }
            }

            _callPropsCallbacks();

            return ()=>{
                if(_resetIsScrollingTimeoutId.current!==null){
                    cancelTimeout(_resetIsScrollingTimeoutId.current);
                }
            }
        },[])

        return createElement(
            outerElementType||outerTagName||"div",
            {
                className,
                onScroll,
                ref: _outerRefSetter,
                style:{
                    position:"relative",
                    height,
                    width,
                    overflow:"auto",
                    WebkitOverflowScrolling:"touch",
                    willChange: 'transform',
                    direction,
                    ...style
                }
            },
            createElement(
                innerElementType||innerTagName||'div',
                {
                    children:items,
                    ref:innerRef,
                    style:{
                        height:isHorizontal?"100%":estimatedTotalSize,
                        pointerEvents:stateObj.isScrolling?"none":undefined,
                        width:isHorizontal?estimatedTotalSize:"100%"
                    }
                }
            )
        )
    })
}