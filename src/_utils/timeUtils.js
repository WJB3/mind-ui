
const clockCenter={
    x:260/2,
    y:260/2
}

const baseClockPoint={
    x:clockCenter.x,
    y:0
}

const rad2deg=(rad)=>{
    return rad * 57.29577951308232;
}


const cx=baseClockPoint.x-clockCenter.x;
const cy=baseClockPoint.y-clockCenter.y;

const getAngleValue=(step,offsetX,offsetY)=>{
    const x=offsetX-clockCenter.x;
    const y=offsetY-clockCenter.y;

    const atan=Math.atan2(cx,cy)-Math.atan2(x,y);
    let deg=rad2deg(atan);
    deg=Math.round(deg/step)*step;
    deg%=360;

    const value = Math.floor(deg / step) || 0;
    const delta = Math.pow(x, 2) + Math.pow(y, 2);
    const distance = Math.sqrt(delta);

    return { value, distance };

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

export const getMinutes=(offsetX,offsetY,step=1)=>{
    const angleStep=step*6;
    let {value}=getAngleValue(angleStep,offsetX,offsetY);

    value=(value*step)%60;

    return value;

}

export const getHours=(offsetX,offsetY,ampm)=>{
    let {value,distance}=getAngleValue(30,offsetX,offsetY);
    value = value || 12;

    if (!ampm) {
        if (distance < 90) {
        value += 12;
        value %= 24;
        }
    } else {
        value %= 12;
    }

    return value;
}