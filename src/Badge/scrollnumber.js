import React, { useContext } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';

function getNumberArray(num) {
    return num
        ? num
            .toString()
            .split('')
            .reverse()
            .map(i => {
                const current = Number(i);
                return isNaN(current) ? i : current;
            })
        : [];
}

function renderNumberList(position, className) {
    const childrenToReturn= [];
    for (let i = 0; i < 30; i++) {
      childrenToReturn.push(
        <p
          key={i.toString()}
          className={classNames(className, {
            current: position === i,
          })}
        >
          {i % 10}
        </p>,
      );
    }
  
    return childrenToReturn;
}

const ScrollNumber = (props) => {

    const {
        component = 'sup',
        prefixCls: customizePrefixCls,
        className,
        style,
        displayComponent,
        ...restProps
    } = props;

    const [count, setCount] = React.useState(props.count);
    const [prevCount, setPrevCount] = React.useState(props.count);
    const [lastCount, setLastCount] = React.useState(props.count);
    const [animateStarted, setAnimateStarted] = React.useState(true);

    if (prevCount !== props.count) {
        setAnimateStarted(true);
        setPrevCount(props.count);
    }

    React.useEffect(() => {
        setLastCount(count);
        let timeout;
        if (animateStarted) {
            // Let browser has time to reset the scroller before actually
            // performing the transition.
            timeout = setTimeout(() => {
                setAnimateStarted(false);
                setCount(props.count);
                if (props.onAnimated) {
                    props.onAnimated();
                }
            });
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [animateStarted, count, props.count, props.onAnimated]);

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('scroll-number', customizePrefixCls);

    const getPositionByNum = (num, i) => {//5 0
        const currentCount = Math.abs(Number(count));//5
        const lstCount = Math.abs(Number(lastCount));//5
        const currentDigit = Math.abs(getNumberArray(count)[i]);//5
        const lastDigit = Math.abs(getNumberArray(lstCount)[i]);//5

        if (animateStarted) {
            return 10 + num;
        }

        // 同方向则在同一侧切换数字
        if (currentCount > lstCount) {
            if (currentDigit >= lastDigit) {
                return 10 + num;
            }
            return 20 + num;
        }
        if (currentDigit <= lastDigit) {
            return 10 + num;
        }
        return num;
    };

    const renderNumberElement = ({ prefixCls, count }) => {//43
        if (count && Number(count) % 1 === 0) {
            return getNumberArray(count)//[3,4]
                .map((num, i) => renderCurrentNumber(prefixCls, num, i))
                .reverse();
        }
        return count;
    }

    const renderCurrentNumber = (prefixCls, num, i) => {//3 0
        if (typeof num === 'number') {
            const position = getPositionByNum(num, i);//3 0 position 15
            const removeTransition = animateStarted || getNumberArray(lastCount)[i] === undefined;
            return React.createElement(
                'span',
                {
                    className: `${prefixCls}-only`,
                    style: {
                        transition: removeTransition ? 'none' : undefined,
                        msTransform: `translateY(${-position * 100}%)`,
                        WebkitTransform: `translateY(${-position * 100}%)`,
                        transform: `translateY(${-position * 100}%)`,
                    },
                    key: i,
                },
                renderNumberList(position, `${prefixCls}-only-unit`),
            );
        }

        return (
            <span key="symbol" className={`${prefixCls}-symbol`}>
                {num}
            </span>
        );
    };

    const newProps = {
        ...restProps,
        className: classNames(prefixCls, className),
        style:style
    };

    if (displayComponent) {
        return React.cloneElement(displayComponent, {
          className: classNames(
            `${prefixCls}-custom-component`,
            displayComponent.props && displayComponent.props.className,
          ),
        });
    }
     
    return React.createElement(component, newProps, renderNumberElement({ prefixCls, count }));
}

export default ScrollNumber;