import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import "./index.scss";

const Timeline = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        center,
        align
    } = props;
    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("timeline", customizePrefixCls);

    return (
        <ul ref={ref} className={classNames(
            `${prefixCls}`,
            className
        )}>
            {
                React.Children.map(children, (child,index) => {
                    return React.cloneElement(child, {
                        isLast:index===React.Children.count(children)-1,
                        isCenter:center,
                        align:align
                    })
                })
            }
        </ul>
    )

});

Timeline.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //children
    children: PropTypes.any,
    //是否居中展示
    center:PropTypes.bool,
    //文字位置
    align:PropTypes.string
};


export default Timeline;