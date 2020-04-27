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
        prefixCls:customizePrefixCls,
        className,
        total,
        pageSize=10,
        current:currentProps,
        defaultCurrent,
        color,
        circle,
        ...restProps
    } = Props;

    const [current,setCurrent]=useControlled({
        controlled:currentProps,
        default:defaultCurrent
    });

    const renderNum=Math.round(total/pageSize);

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("pagination",customizePrefixCls);
     
    const classes = classNames(prefixCls,className,{
        [`${prefixCls}-circle`]:circle
    });

    const clickPagination=useCallback((current)=>{
        setCurrent(current);
    },[])

    const renderPagination=useCallback(()=>{
       
        return new Array(renderNum).fill("").map((item,index)=>(
            <BaseRipple key={index+1} component={"li"} 
                style={{
                    backgroundColor:!isThemeColor(color)?color:"",
                    color:!isThemeColor(color)?color:""
                }}
                className={
                    classNames(
                        `${prefixCls}-item`,
                        {
                            [`${prefixCls}-active`]:index+1===current,
                            [`${prefixCls}-${color}`]:isThemeColor(color)
                        }
                    )
                }
                onClick={()=>clickPagination(index+1)}
            > 
                <span>{index+1}</span>
            </BaseRipple>
        ));
    },[current]);

    const pageNext=React.useCallback(()=>{//点击下一页
        if(current===renderNum){//当前在最后一页不可以点击下一页
            return ;
        }
        setCurrent(current+1)
    },[current]);

    const pagePrev=React.useCallback(()=>{//点击上一页
        if(current===1){//当前在第一页不可点击上一页
            return ;
        }
        setCurrent(current-1)
    },[current]);

    return (
        <ul className={classes}>
            <BaseRipple 
                disabledTouchRipple={current===1}
                component={"li"} 
                className={classNames(
                `${prefixCls}-prev`,
                {
                    [`${prefixCls}-disabled`]:current===1
                }
                )}
                onClick={()=>pagePrev()}>
                <Icon name="arrow-back"/>
            </BaseRipple>
            {
                renderPagination()
            }
            <BaseRipple 
                disabledTouchRipple={current===renderNum}
                component={"li"} 
                className={classNames(
                `${prefixCls}-next`,
                {
                    [`${prefixCls}-disabled`]:current===renderNum
                }
                )}
                onClick={()=>pageNext()}>
             
                <Icon name="arrow-forward"/>
             
            </BaseRipple>
        </ul>
    )
}

export default Pagination;