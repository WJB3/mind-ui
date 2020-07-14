import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import capitalize from '../_utils/capitalize';
import useThemeColor from '../_utils/useThemeColor';
import "./index.scss";

const SIZE=44;

function getRelativeValue(value, min, max) {
    return (Math.min(Math.max(min, value), max) - min) / (max - min);
}

function easeOut(t) {
    t = getRelativeValue(t, 0, 1);
    // https://gist.github.com/gre/1650294
    t = (t -= 1) * t * t + 1;
    return t;
}

function easeIn(t) {
    return t * t;
}
 

const Progress=React.forwardRef((props, ref)=>{
    const {
        prefixCls: customizePrefixCls,
        className,
        color:colorProp="primary",
        size=40,
        thickness=3.6,
        value=0,
        variant="indeterminate",
        style
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("progress", customizePrefixCls);
 
    const circleStyle={};
    const rootProps = {};
    const rootStyle = {};

    if(variant==='determinate'||variant==="static"){
        const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
        circleStyle.strokeDasharray = circumference.toFixed(3); 
        rootProps['aria-valuenow'] = Math.round(value);

        if(variant==='static'){
            circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
            rootStyle.transform = 'rotate(-90deg)';
        }else {
            circleStyle.strokeDashoffset = `${(easeIn((100 - value) / 100) * circumference).toFixed(
              3,
            )}px`;
            rootStyle.transform = `rotate(${(easeOut(value / 70) * 270).toFixed(3)}deg)`;
        }
    }

    return (
        <div 
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-${variant}`]:variant 
                }
            )} 
            role="progressbar" 
            ref={ref}
            style={{width:size,height:size,color:useThemeColor(colorProp), ...rootStyle,...style}} 
            {...rootProps}
        >
            <svg className={classNames(
                `${prefixCls}-svg`
            )} viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
                <circle 
                    className={classNames(
                        `${prefixCls}-circle`,
                        {
                            [`${prefixCls}-circle-${variant}`]:variant
                        }
                    )}
                    style={circleStyle}
                    cx={SIZE}
                    cy={SIZE}
                    r={(SIZE-thickness)/2}
                    fill="none"
                    strokeWidth={thickness}
                />
            </svg>
        </div>
    )

});

Progress.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
};


export default Progress;