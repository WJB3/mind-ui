

export function rad2deg(rad){
    return rad * 57.29577951308232;
}

export function getTouchEventOffsetValues(event){
    const el=event.target;
    const boundingRect=el.getBoundingClientRect();

    return {
        offsetX:event.clientX-boundingRect.left,
        offsetY:event.clientY-boundingRect.top,
        clientX:event.clientX,
        clientY:event.clientY,
        
    }
}