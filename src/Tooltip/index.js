import React ,{useState} from 'react';
import { classNames } from '../components/helper/className';
import { toArray } from '../_utils/reactUtils';
import { ConfigContext } from '../ConfigContext';
import Popper from '../Popper';
import useForkRef from '../_utils/useForkRef';
import setRef from '../_utils/setRef';

import "./index.scss";

const Tooltip = React.forwardRef((Props,ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children,
        mountNode,
        title,
        ...restProps
    } = Props;

    const [tooltipOpen,setToolTipOpen]=useState(false);
    const [childNode, setChildNode] = React.useState();
 

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("loading", customizePrefixCls);

    const handleOwnRef=React.useCallback(
        (instance)=>{
            console.log("handleOwnRef")
            console.log(instance)
            //setRef(handleFocusRef, ReactDOM.findDOMNode(instance))
        },
        []
    );

    const handleRef = useForkRef(children.ref, handleOwnRef);

    const childrenProps={
        ref: handleRef,
    }

    const classes = classNames(prefixCls, className);

    return  (
        <React.Fragment>
            {React.cloneElement(children,childrenProps)}
            <Popper mountNode={mountNode} open={tooltipOpen}>
                {title}
            </Popper>
        </React.Fragment>
    )
});

export default Tooltip;