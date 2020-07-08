import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import Icon from '../components/icon';
import "./index.scss";
import Paper from '../Paper';
import BaseRipple from '../BaseRipple';

const Alert = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        type,
        children,
        title,
        closable,
        onClose,
        action,
        icon,
        filled,
        deep
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("alert", customizePrefixCls);

    return (
        <Paper
            className={classNames(
                `${prefixCls}`,
                className,
                {
                    [`${prefixCls}-Type${type}`]: type,
                    [`${prefixCls}-Filled${type}`]:filled
                }
            )}
            ref={ref}
            deep={deep}
        >
            {icon===false?null:<div className={
                classNames(
                    `${prefixCls}-icon`
                )
            }>
                {icon?icon:<Icon name={`alert-${type}`} size={22} />}
            </div>}
            <div className={
                classNames(
                    `${prefixCls}-message`
                )
            }>
                {title && <div className={
                    classNames(
                        `${prefixCls}-message-title`
                    )
                }>{title}</div>}
                {children}

            </div>
            {
                (closable || action) && <div className={
                    classNames(
                        `${prefixCls}-close`
                    )
                } >
                    {action?action:<BaseRipple onClick={()=>onClose && onClose()}> 
                        <Icon name={"close"} size={22} />
                    </BaseRipple>}
                </div>
            }
        </Paper>
    )

});

Alert.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //alert类型
    type: PropTypes.string,
    //children
    children: PropTypes.any
};

export default Alert;