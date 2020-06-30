import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import "./index.scss";
import PropTypes from 'prop-types';
import Paper from '../Paper';


const Picker=(props)=>{
    const {
        prefixCls:customizePrefixCls,  
        displayContent,
        className,
        MainContent,
        landscape,
        style,
        disabled
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("picker", customizePrefixCls);


    return <Paper   deep={4} style={style} className={
        classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-landscape`]: landscape,
                [`${prefixCls}-disabled`]: disabled
            }
        )
    }>
        <div className={classNames(
            `${prefixCls}-display`
        )}>{displayContent}</div>
        <div className={classNames(`${prefixCls}-pickerView`)}>
            {MainContent}
        </div>
    </Paper>
}

Picker.propTypes={
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //添加类名
    className:PropTypes.string,
    //display
    displayContent:PropTypes.any,
    //container
    MainContent:PropTypes.any,
    //风景
    landscape:PropTypes.bool,
    //是否禁用
    disabled:PropTypes.bool,
    //style
    style:PropTypes.object
};

export default Picker;