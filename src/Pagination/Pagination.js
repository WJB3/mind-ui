import React, { Children, useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import BaseRipple from '../BaseRipple';
import Icon from '../components/icon';
import useControlled from '../_utils/useControlled';
import isThemeColor from '../_utils/isThemeColor';
import "./index.scss";
import { render } from 'react-dom';



const Pagination = (Props) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        total,//总数据条数
        pageSize = 10,//每页展示条数
        current: currentProps,//当前页码
        defaultCurrent,//默认页码
        color,//分页的类型
        circle,//分页是否圆角
        maxPageNum = 9,//最大页数
        disabled,//是否禁用分页
        prevRender,//前一页的替换节点
        nextRender,//后一页的替换节点
        onChange,//页码改变的回调
        ...restProps
    } = Props;

    const [current, setCurrent] = useControlled({
        controlled: currentProps,
        default: defaultCurrent
    });

    const renderNum = Math.round(total / pageSize);//总页码

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("pagination", customizePrefixCls);

    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-circle`]: circle
    });

    const clickPagination = useCallback((current) => {
        if(disabled){
            return ;
        }
        setCurrent(current);
        if(onChange){
            onChange(current,pageSize)
        }
    }, [current]);

    const renderMorePagination = useCallback(() => {
        let renderArr = [];

        const jumpPrev = [<BaseRipple disabledTouchRipple={disabled} key={"jumpPrev-item"} component={"li"}
            className={
                classNames(
                    `${prefixCls}-item`,
                    `${prefixCls}-jump-prev`,
                    {
                        [`${prefixCls}-${color}`]: isThemeColor(color),
                        [`${prefixCls}-disabled`]: disabled
                    }
                )
            }
            onClick={()=>clickPagination(Math.max(1,current - 5))}
        >
            {<Icon name="ellipse" className={`${prefixCls}-ellipse-icon`}/>}
            {<Icon name="arrowhead-left" className={`${prefixCls}-link-icon`}/>}
        </BaseRipple>];

        const jumpNext = [<BaseRipple disabledTouchRipple={disabled} key={"jumpNext-item"} component={"li"}
            className={
                classNames(
                    `${prefixCls}-item`,
                    `${prefixCls}-jump-next`,
                    {
                        [`${prefixCls}-${color}`]: isThemeColor(color),
                        [`${prefixCls}-disabled`]: disabled
                    }
                )
                
            }
            onClick={()=>clickPagination(Math.max(renderNum,current + 5))}

        >
            {<Icon name="ellipse" className={`${prefixCls}-ellipse-icon`}/>}
            {<Icon name="arrowhead-right" className={`${prefixCls}-link-icon`}/>}
        </BaseRipple>];

        const firstPage = [<BaseRipple disabledTouchRipple={disabled} key={1} component={"li"}
            style={{
                backgroundColor: !isThemeColor(color) ? color : "",
                color: !isThemeColor(color) ? color : ""
            }}
            className={
                classNames(
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-active`]: current===1,
                        [`${prefixCls}-${color}`]: isThemeColor(color),
                        [`${prefixCls}-disabled`]: disabled
                    }
                )
            }
            onClick={()=>clickPagination(1)}
        >
            {1}
        </BaseRipple>];

        const lastPage = [<BaseRipple disabledTouchRipple={disabled} key={renderNum} component={"li"}
            style={{
                backgroundColor: !isThemeColor(color) ? color : "",
                color: !isThemeColor(color) ? color : ""
            }}
            className={
                classNames(
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-active`]: renderNum === current,
                        [`${prefixCls}-${color}`]: isThemeColor(color),
                        [`${prefixCls}-disabled`]: disabled
                    }
                )
            }
            onClick={()=>clickPagination(renderNum)}
        >
            {renderNum}
        </BaseRipple>];

        var left = Math.max(1, current - 2);
        var right = Math.min(current + 2, renderNum);

        
        if (current - 1 <= 2) {
            right = 1 + 4;
        }
  
        if (renderNum - current <= 2) {
            left = renderNum - 4;
        }
  
        for (let i = left; i <= right; i++) {
            renderArr.push(<BaseRipple disabledTouchRipple={disabled} key={i} component={"li"} 
                style={{
                    backgroundColor: !isThemeColor(color) ? color : "",
                    color: !isThemeColor(color) ? color : ""
                }}
                className={
                    classNames(
                        `${prefixCls}-item`,
                        {
                            [`${prefixCls}-active`]: i === current,
                            [`${prefixCls}-${color}`]: isThemeColor(color),
                            [`${prefixCls}-disabled`]: disabled
                        }
                    )
                }
                onClick={()=>clickPagination(i)}
            >
                {i}
            </BaseRipple>);
        }

        if (current - 1 >= 4) {
            renderArr.unshift(jumpPrev);
        }
        if (renderNum - current >= 4) {
            renderArr.push(jumpNext);
        }

        if (left !== 1) {
            renderArr.unshift(firstPage);
        }
        if (right !== renderNum) {
            renderArr.push(lastPage);
        }

        return renderArr;
        
    }, [current,disabled]);

    const renderPagination = useCallback(() => {

        if (renderNum > maxPageNum) {
            return renderMorePagination();
        }

        return new Array(renderNum).fill("").map((item, index) => (
            <BaseRipple disabledTouchRipple={disabled} key={index + 1} component={"li"}
                style={{
                    backgroundColor: !isThemeColor(color) ? color : "",
                    color: !isThemeColor(color) ? color : ""
                }}
                className={
                    classNames(
                        `${prefixCls}-item`,
                        {
                            [`${prefixCls}-active`]: index + 1 === current,
                            [`${prefixCls}-${color}`]: isThemeColor(color),
                            [`${prefixCls}-disabled`]: disabled
                        }
                    )
                }
                onClick={() => clickPagination(index + 1)}
            >
                <span>{index + 1}</span>
            </BaseRipple>
        ));
    }, [current,disabled]);

    const pageNext = React.useCallback(() => {//点击下一页
        if (current === renderNum || disabled) {//当前在最后一页不可以点击下一页
            return;
        }
        setCurrent(current + 1)
    }, [current,disabled]);

    const pagePrev = React.useCallback(() => {//点击上一页
        if (current === 1 || disabled) {//当前在第一页不可点击上一页
            return;
        }
        setCurrent(current - 1)
    }, [current,disabled]);

    return (
        <ul className={classes}>
            <BaseRipple
                disabledTouchRipple={current === 1||disabled}
                component={"li"}
                className={classNames(
                    `${prefixCls}-prev`,
                    {
                        [`${prefixCls}-disabled`]: current === 1||disabled
                    }
                )}
                onClick={() => pagePrev()}>
                {prevRender?prevRender:<Icon name="arrow-back" />}
            </BaseRipple>
            {
                renderPagination()
            }
            <BaseRipple
                disabledTouchRipple={current === renderNum||disabled}
                component={"li"}
                className={classNames(
                    `${prefixCls}-next`,
                    
                    {
                        [`${prefixCls}-disabled`]: current === renderNum||disabled
                    }
                )}
                onClick={() => pageNext()}>

                {nextRender?nextRender:<Icon name="arrow-forward" />}

            </BaseRipple>
        </ul>
    )
}

export default Pagination;