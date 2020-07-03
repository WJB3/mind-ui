import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import "./index.scss";
import useDate from '../_utils/useDate';

const ClockPointer=React.forwardRef((props, ref)=>{
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        value,
        isInner,
        type
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timepicker-clock-pointer", customizePrefixCls);

    const getAngleStyle=()=>{
        
        const max=type==="hours"?12:60;
        let angle=(360/max)*value;

        if(type==="hours" && value>12){
            angle-=360;
        }

        return {
            height:isInner?"26%":"40%",
            transform:`rotateZ(${angle}deg)`,
            ...style
        }
    }

    const hasSelected=()=>{
        if(type==="hours"){
            return true;
        }

        return value%5===0;
    }

    return (
        <div className={classNames(
            prefixCls,
            className
        )} style={getAngleStyle()}>
            <div className={classNames(
                `${prefixCls}-thumb`,
                {
                    [ `${prefixCls}-noPoint`]:hasSelected()
                }
            )} /> 
        </div>
    )

});

ClockPointer.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
};


export default ClockPointer