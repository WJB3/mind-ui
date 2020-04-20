import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import "./index.scss";

const componentName = "Typography-Title";

const LEVEL_LIST=[1,2,3,4,5,6];

const Title = React.forwardRef((props, ref) => {
    const {
        children,
        level=1
    } = props;

    let component=React.useRef('h1');

    const renderComponent=React.useCallback(()=>{
        if(LEVEL_LIST.indexOf(level)!==-1){
            component.current=`h${level}`
        }
    },[]);

    renderComponent();

    return (
        <component.current
            className={
                classNames(
                    `${globalPrefix}-${componentName}`,
                )
            }
        >
            {children}
        </component.current>
    )
})

export default Title;