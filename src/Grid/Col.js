import React from 'react';
import { classNames } from '../components/helper/className';
import useMediaQuery from '../useMediaQuery/index';
import { ConfigContext } from '../ConfigContext';
import PropTypes from 'prop-types';
import "./index.scss";

const Row = (props) => {
 

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style,
        span,
        offset,
        order,
        push,
        pull,
        xs,
        sm,
        md,
        lg,
        xl,
        xxl
    } = props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("col", customizePrefixCls);

    const mediaArr={
        xs:"(max-width:576px)",
        sm:"(min-width:576px)",
        md:"(min-width:768px)",
        lg:"(min-width:992px)",
        xl:"(min-width:1200px)",
        xxl:"(min-width:1600px)",
    };

    return (
        <div className={classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-${span}`]:span,
                [`${prefixCls}-offset-${offset}`]:offset,
                [`${prefixCls}-order-${order}`]:order,
                [`${prefixCls}-push-${push}`]:push,
                [`${prefixCls}-pull-${pull}`]:pull,
               
            },
           
        )}  style={style}>
            {
                 children
            }
        </div>
    )
}

Row.propTypes={
    //孩子节点
    children:PropTypes.oneOfType([
         PropTypes.func,
         PropTypes.node
    ]),
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //添加类名
    className:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //栅格占位格数，为 0 时相当于 display: none
    span:PropTypes.number,
    //栅格左侧的间隔格数
    offset:PropTypes.number,
    //	栅格顺序
    order:PropTypes.number,
    //	栅格向右移动格数
    push:PropTypes.number,
    //	栅格向左移动格数
    pull:PropTypes.number,
    //响应式栅格属性
    xs:PropTypes.number,
    //响应式栅格属性
    sm:PropTypes.number,
    //响应式栅格属性
    md:PropTypes.number,
    //响应式栅格属性
    lg:PropTypes.number,
    //响应式栅格属性
    xl:PropTypes.number,
    //响应式栅格属性
    xxl:PropTypes.number,
    
}

export default Row;