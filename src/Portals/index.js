import React from 'react';
import ReactDOM from 'react-dom';

const Portals=React.forwardRef((props,ref)=>{
    const {
        children,
        disablePortal,
        container=document.body
    }=props;
    
    if(disablePortal){
        return null;
    }
    return children?ReactDOM.createPortal(children,container):children;
});

export default Portals;