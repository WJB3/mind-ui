import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import PropTypes from 'prop-types';
import "./index.scss";

const Row = (Props) => {
 

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style
    } = Props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("row", customizePrefixCls);

    return (
        <div className={classNames(
            prefixCls,
            className,
            `${prefixCls}-row`,
            style={style}
        )} >
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