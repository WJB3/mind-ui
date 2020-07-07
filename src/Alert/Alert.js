import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import Icon from '../components/icon';
import "./index.scss";
import Paper from '../Paper';

const Alert=React.forwardRef((props, ref)=>{
    const {
        prefixCls: customizePrefixCls,
        className,
        type,
        children
    } = props; 

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("alert", customizePrefixCls);

    return (
        <Paper 
            className={classNames(
                `${prefixCls}`,
                className,
                {
                    [`${prefixCls}-Type${type}`]:type
                }
            )}
            ref={ref}
        >
            <div className={
                classNames(
                    `${prefixCls}-icon`
                )
            }>
                <Icon name={`alert-${type}`} />
            </div>
            <div className={
                classNames(
                    `${prefixCls}-message`
                )
            }>
                {children}
            </div>
        </Paper>
    )

});

Alert.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //alert类型
    type:PropTypes.string,
    //children
    children:PropTypes.any
};

export default Alert;