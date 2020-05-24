import React, { forwardRef, useRef, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Icon from '../components/icon';
import useControlled from '../_utils/useControlled';
import "./index.scss";
import { getOffsetLeft } from './utils';
import Tooltip from '../Tooltip';
import { findDOMNode } from 'react-dom';

const Rate = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,//自定义class类名
        className,//传过来的class类名
        style,//传过来的style样式名  
        count = 5,
        value: valueProps,
        defaultValue,
        allowHalf,
        disabled,
        allowClear = true,
        character,
        color,
        tooltips,
        tabIndex=0,
        onFocus,
        onBlur,
        onChange,
        onHoverChange,
        onKeyDown
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("rate", customizePrefixCls);

    const starRefArr = useRef([]);

    const [currentElem,setCurrentElem]=useState(null);

    const [value, setValue] = useControlled({
        controlled: valueProps,
        default: defaultValue
    });

    const handleHover = (e, starIndex) => {
        const value = getStarValue(starIndex, e.pageX);
        if(!currentElem){
            setValue(value);
        }
        if(onHoverChange){
            onHoverChange(value,e);
        }
  
    }

    const handleMouseLeave = (e) => {
        if(!currentElem){
            setValue(undefined);
        }
        if(onHoverChange){
            onHoverChange(undefined,e);
        }
    }

    const handleStarRef = (node, index) => {
        starRefArr.current[index] = node;
    }

    const getStarDom = (index) => {
        return findDOMNode(starRefArr.current[index])
    }

    const handleClick = (e, starIndex) => {
        const newValue = getStarValue(starIndex, e.pageX);

        if(!currentElem || currentElem!==getStarDom(starIndex)){//如果没有点击的当前节点就设置节点
            setCurrentElem(getStarDom(starIndex));
            setValue(newValue);
            if(onChange){
                onChange(newValue,e);
            }
        }else if(currentElem && currentElem===getStarDom(starIndex) && allowClear){//如果重复点击同一个点击即清除
            setCurrentElem(null);
            setValue(undefined);
            if(onChange){
                onChange(undefined,e);
            }
        }
    }

    const renderStar = () => {
        const stars = [];
        for (let i = 0; i < count; i++) {

            if (tooltips) {
                stars.push(
                    <Tooltip title={tooltips[i]} key={`count-${i}`}>
                        <div style={style} className={classNames(
                            className,
                            `${prefixCls}-star`,
                            i + 1 <= value ? `${prefixCls}-star-full` : allowHalf && value + 0.5 === i + 1 ? `${prefixCls}-star-half` : `${prefixCls}-star-zero`,
                            {

                            }
                        )}
                            
                            onMouseMove={disabled ? null : (e) => handleHover(e, i)}
                            onClick={disabled ? null : (e) => handleClick(e, i)}
                            ref={(node) => handleStarRef(node, i)}
                        >
                            <div className={classNames(`${prefixCls}-star-first`)}>
                                {!!character ? character : <Icon name="rating" />}
                            </div>
                            <div className={classNames(`${prefixCls}-star-second`)}>
                                {!!character ? character : <Icon name="rating" />}
                            </div>
                        </div>
                    </Tooltip>
                )

            } else {
                stars.push(
                    <div style={style} className={classNames(
                        className,
                        `${prefixCls}-star`,
                        i + 1 <= value ? `${prefixCls}-star-full` : allowHalf && value + 0.5 === i + 1 ? `${prefixCls}-star-half` : `${prefixCls}-star-zero`,
                        {

                        }
                    )}
                        key={`count-${i}`}
                        onMouseMove={disabled ? null : (e) => handleHover(e, i)}
                        onClick={disabled ? null : (e) => handleClick(e, i)}
                        ref={(node) => handleStarRef(node, i)}
                    >
                        <div className={classNames(`${prefixCls}-star-first`)}>
                            {!!character ? character : <Icon name="rating" />}
                        </div>
                        <div className={classNames(`${prefixCls}-star-second`)}>
                            {!!character ? character : <Icon name="rating" />}
                        </div>
                    </div>
                )
            }

        }
        return stars;
    }

    const getStarValue = (index, x) => {

        let value = index;

        if (allowHalf) {
            const starElem = getStarDom(index);
            const leftDis = getOffsetLeft(starElem);
            const width = starElem.clientWidth;
            if (x - leftDis < width / 2) {
                value += 0.5;
            } else if (x - leftDis > width / 2) {
                value += 1;
            }

            return value;
        }

        return value + 1;
    }

    const handleFocus=(e)=>{
         if(onFocus){
             onFocus(e);
         }
    }

    const handleBlur=(e)=>{
       if(onBlur){
           onBlur(e)
       }
    }

    const handleKeyDown=(e)=>{
        //右键 39 左键 37
        const { keyCode }=e;
        let newValue=value;
        if(keyCode===39 && value<count){
            if(allowHalf){
                newValue=newValue+0.5;
            }else{
                newValue=newValue+1;
            }
        }
        if(keyCode===37 && value>0){
            if(allowHalf){
                newValue=newValue-0.5;
            }else{
                newValue=newValue-1;
            }
        }
        setValue(newValue);
        if(onChange){
            onChange(newValue,e);
        }
        if(onKeyDown){
            onKeyDown(e);
        }
    }

    return (
        <div className={classNames(
            prefixCls,
            {
                [`${prefixCls}-disabled`]: disabled
            }
        )}
            tabIndex={disabled?-1:tabIndex}
            onMouseLeave={disabled ? null : handleMouseLeave}
            style={{ color: color }}
            onFocus={disabled?null:handleFocus}
            onBlur={disabled?null:handleBlur}
            onKeyDown={disabled ? null : handleKeyDown}
        >
            {renderStar()}
        </div>
    )
});

export default Rate;