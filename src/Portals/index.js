import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useForkRef from '../_utils/useForkRef';
 
const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function getContainer(container){
    container=typeof container==='function'?container():container;
    return ReactDOM.findDOMNode(container);
}

const Portals=React.forwardRef((props,ref)=>{
    const {
        children,
        disablePortal=false,
        container,
    }=props;

    const [mountNode, setMountNode] = React.useState(null);

    const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref);

    useEffect(()=>{
        if(!disablePortal){
            setMountNode(getContainer(container) || document.body);
        }
    },[container,disablePortal]);
    
    if(disablePortal){
        if(React.isValidElement(children)){
            return React.cloneElement(children,{
                ref:handleRef
            });
        }
    }

    return children && mountNode ? ReactDOM.createPortal(children,mountNode):children;
});

export default Portals;