

import React,{ memo,createElement,useState } from 'react';
import useStateCallback from '../_utils/useStateCallback'
import {getRTLOffsetType} from './domHelpers';
 

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
            initialScrollOffset 
        }=props;

        const [stateObj,setStateObj]=useStateCallback({
            isScrolling:false,
            scrollDirection:"forward",
            scrollOffset:typeof initialScrollOffset==='number'?initialScrollOffset:0,
            scrollUpdateWasRequested:false
        });

        const _onScrollHorizontal=(scrollEvent)=>{
            const { clientWidth,scrollLeft,scrollWidth }=scrollEvent.currentTarget;

            setScrollOffset(oldScrollOffset=>{
                if(oldScrollOffset===scrollLeft){
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

                return scrollOffset;
            })
        }

        const isHorizontal=direction==="horizontal"||layout==="horizontal";

        const onScroll=isHorizontal?_onScrollHorizontal:_onScrollVertical;

        return createElement(
            outerElementType||outerTagName||"div",
            {
                className,
                onScroll
            }
        )
    })
}