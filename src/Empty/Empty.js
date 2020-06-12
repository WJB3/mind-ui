import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import PropTypes from 'prop-types';
import Icon from '../components/icon';
import "./index.scss";

const Empty = (props) => {
 

    const {
        prefixCls:customizePrefixCls,
        className,
        style,
        description,
        type,
        height
    } = props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("empty", customizePrefixCls);

    return (
        <div className={classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-${type}`]:type
            }
        )}  style={{...style}} >
            <div className={classNames(
                `${prefixCls}-image`
            )} style={{height:height}}>
                <Icon name={"empty-image"} size={height}/>
                 
            </div>
            {<p className={classNames(
                `${prefixCls}-description`
            )}>{description ? description :"暂无数据"}</p>}
        </div>
    )
}

Empty.propTypes={
    
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //添加类名
    className:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //自定义描述
    description:PropTypes.any,
    //emptyheight
    height:PropTypes.number
    
}

export default Empty;