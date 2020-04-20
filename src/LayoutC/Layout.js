import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import "./index.scss";

const componentName = "LayoutC";

const LayoutC = React.forwardRef((props, ref) => {
    const {
        children
    } = props;

    const hasSider=React.useCallback(()=>{
        console.log(children);
        let siderArr=[]
        React.Children.forEach(children,(item)=>{
            let i=item.props.children;
            if(i==="Sider"){
                siderArr.push(i);
            }
        })
        return siderArr;
    },[]);
 

    return (
        <section
            className={
                classNames(
                    `${globalPrefix}-${componentName}`,
                    hasSider().length>0?"has-sider":""
                )
            }
        >
            {children}
        </section>
    )
})

export default LayoutC;