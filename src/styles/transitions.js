export const easing={
    easeInOut:'cubic-bezier(0.4,0,0.2,1)',
    easeOut:'cubic-bezier(0.0,0,0.2,1)',
    easeIn:'cubic-bezier(0.4,0,1,1)',
    sharp:'cubic-bezier(0.4,0,0.6,1)'
};

export const duration={
    shortest:150,
    shorter:200,
    short:2500,

    standard:300,
    complex:375,
    exteringScreen:225,
    leavingScreen:195
}

function formatMs(milliseconds) {
    return `${Math.round(milliseconds)}ms`;
}  

export default {
    easing,
    duration,
    create:(props=['all'],options={})=>{
        const {
            duration:durationOption=duration.standard,
            easing:easingOption=easing.easeInOut,
            delay=0,
            ...other
        }=options;
        return (Array.isArray(props)?props:[props])
        .map((animationProp)=>
            `${animationProp} ${
                typeof durationOption==='string'?durationOption:formatMs(durationOption)
            } ${easingOption} ${typeof delay==='string'?delay:formatMs(delay)}`
        )
        .join(",")
    },
    getAutoHeightDuration(height){
        if(!height){
            return 0;
        }

        const constant=height/36;

        return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
    }
}