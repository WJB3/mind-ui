import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import useThemeColor from '../_utils/useThemeColor';
import "./index.scss";

const SIZE = 44;

 
const Progress = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        color: colorProp = "primary",
        size = 40,
        thickness = 3.6,
        value = 0,
        variant = "indeterminate",
        style,
        type = "circle",
        topScroll,
        auto
    } = props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("progress", customizePrefixCls);
 
    const renderCircle = () => {

        const circleStyle = {};
        const rootProps = {};
        const rootStyle = {};

        if (variant === 'determinate' || variant === "static") {
            const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
            circleStyle.strokeDasharray = circumference.toFixed(3);
            rootProps['aria-valuenow'] = Math.round(value);

            if (variant === 'static') {
                circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
                rootStyle.transform = 'rotate(-90deg)';
            } else {
                circleStyle.strokeDashoffset = `${(easeIn((100 - value) / 100) * circumference).toFixed(
                    3,
                )}px`;
                rootStyle.transform = `rotate(${(easeOut(value / 70) * 270).toFixed(3)}deg)`;
            }
        }

        return <div
            className={classNames(
                `${prefixCls}-circle`,
                className,
                {
                    [`${prefixCls}-circle-${variant}`]: variant
                }
            )}
            role="progressbar"
            ref={ref}
            style={{ width: size, height: size, color: useThemeColor(colorProp), ...rootStyle, ...style }}
            {...rootProps}
        >
            <svg className={classNames(
                `${prefixCls}-circle-svg`
            )} viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
                <circle
                    className={classNames(
                        `${prefixCls}-circle-circle`,
                        {
                            [`${prefixCls}-circle-circle-${variant}`]: variant
                        }
                    )}
                    style={circleStyle}
                    cx={SIZE}
                    cy={SIZE}
                    r={(SIZE - thickness) / 2}
                    fill="none"
                    strokeWidth={thickness}
                />
            </svg>


        </div>
    }

    const renderLiner = () => {

        const rootProps = {};
        const inlineStyles = { bar1: {}, bar2: {} };

        if (variant === 'determinate' || variant === 'buffer') {
            if (value !== undefined) {
                rootProps['aria-valuenow'] = Math.round(value);
                rootProps['aria-valuemin'] = 0;
                rootProps['aria-valuemax'] = 100;
                let transform = value - 100;
                inlineStyles.bar1.transform = `translateX(${transform}%)`;
            }
        }


        return <div
            className={
                classNames(
                    `${prefixCls}-liner`,
                    className,
                    {
                        [`${prefixCls}-liner-${variant}`]: variant,
                        [`${prefixCls}-liner-topScroll`]: topScroll,
                    }
                )
            }
            role="progressbar"
            ref={ref}
            {...rootProps}
            style={{ backgroundColor: topScroll ? 'transparent' : useThemeColor(colorProp, 0.5) }}
        >
            <div className={
                classNames(
                    `${prefixCls}-liner-bar`,
                    {
                        [`${prefixCls}-liner-bar_1Indeterminate`]: variant === "indeterminate" || variant === "query",
                        [`${prefixCls}-liner-bar_1Determinate`]: variant === "determinate"
                    }
                )
            } style={{ backgroundColor: useThemeColor(colorProp), ...inlineStyles.bar1 }}
            />

            {
                variant !== "determinate" && <div
                    className={
                        classNames(
                            `${prefixCls}-liner-bar`,
                            {
                                [`${prefixCls}-liner-bar_2Indeterminate`]: variant === "indeterminate" || variant === "query"

                            }
                        )
                    }
                    style={{ backgroundColor: useThemeColor(colorProp), ...inlineStyles.bar2 }}
                />
            }
        </div>
    }

    return type === "circle" ? renderCircle() : renderLiner()
});

Progress.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object,
};

export default Progress;



