import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import "./index.scss";
import useControlled from '../_utils/useControlled';
import useComponentEffect from '../_utils/useComponentEffect';
import Paper from '../Paper';

const Snackbar = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        placement = "bottom-left",
        message,
        visible, 
        effect="grow",
        action
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("snackbar", customizePrefixCls);

    const Component=useComponentEffect(effect);

    return (
        <Component in={visible}  >
            <Paper
                className={classNames(
                    `${prefixCls}`,
                    className,
                    {
                        [`${prefixCls}-${placement}`]: placement
                    }
                )}
                ref={ref}
            >

                <Paper className={classNames(
                    `${prefixCls}-content`,
                )} deep={6}>
                    <div className={classNames(
                        `${prefixCls}-content-message`,
                    )}>{message}</div>
                    <div className={classNames(
                        `${prefixCls}-content-action`,
                    )}>{action}</div>
                </Paper>

            </Paper>
        </Component>
    )

});

Snackbar.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //alert类型
    type: PropTypes.string,
    //children
    children: PropTypes.any
};

export default Snackbar;