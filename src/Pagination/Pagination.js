import React, { Children, useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import BaseRipple from '../BaseRipple';
import Icon from '../components/icon';
import "./index.scss";
 

const Pagination = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        total,
        pageSize=10,
        ...restProps
    } = Props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("pagination",customizePrefixCls);
     
    const classes = classNames(prefixCls,className);

    const renderPagination=useCallback(()=>{
        const renderNum=Math.round(total/pageSize);

        return  
    },[])

    return (
        <ul className={classes}>
            <BaseRipple>
                <li className={classNames(`${prefixCls}-prev`,`${prefixCls}-item`)}>
                    <Icon name="arrow-back"/>
                </li>
            </BaseRipple>
            {
                renderPagination()
            }
            <BaseRipple>
                <li className={classNames(`${prefixCls}-next`,`${prefixCls}-item`)}>
                    <Icon name="arrow-forward"/>
                </li>
            </BaseRipple>
        </ul>
    )
}

export default Pagination;