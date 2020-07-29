

import shallowDiffers from './shallowDiffers';

export default function areEqual(prevProps,nextProps){

    const {style:prevStyle,...prevRest}=prevProps;
    const {style:nextStyle,...nextRest}=nextProps;

    return !shallowDiffers(prevStyle,nextStyle) && !shallowDiffers(prevRest,nextRest);
    
}