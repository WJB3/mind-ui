import React from 'react';
import { classNames } from '../components/helper/className';
import {toArray} from '../_utils/reactUtils';
import { ConfigContext } from '../ConfigContext';
import "./index.scss";

const Space = (Props) => {

    const spaceSize = {
        small: 8,
        middle: 16,
        large: 24,
    };

    const {
        prefixCls:customizePrefixCls,
        size="small",
        className,
        children,
        direction="horizontal",
        itemStyle,
        ...restProps
    } = Props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("space",customizePrefixCls);

    const items=toArray(children);
     
    const classes = classNames(prefixCls,className,
        direction?`${prefixCls}-${direction}`:`${prefixCls}-horizontal`
    );

    const itemClassName = `${prefixCls}-item`;

    return (
        <div className={classes} {...restProps}>
            {
                items.map((child,i)=>(
                    <div 
                        className={itemClassName}
                        key={`${itemClassName}-${i}`}
                        style={
                            i === items.length - 1
                              ? {...itemStyle}
                              : {
                                  [direction === 'vertical' ? 'marginBottom' : 'marginRight']:
                                    typeof size === 'string' ? spaceSize[size] : size,
                                    ...itemStyle
                                }
                        }
                        
                    >
                        {child}     
                    </div>
                ))
            }
        </div>
    )
}

export default Space;