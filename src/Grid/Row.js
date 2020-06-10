import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useBreakPoint from '../useBreakPoint';
import { GridContext } from './GridContext';
import PropTypes from 'prop-types';
import "./index.scss";

const Row = (props) => {
 

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style
    } = props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("row", customizePrefixCls);

    return (
        <div className={classNames(
            prefixCls,
            className,
         
        )}  style={style} >
      
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
    
    
}

export default Row;