import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import { typeEnum } from './../components/color';
import Base from './Base';
import "./index.scss";

const componentName = "Typography-Text";

const Text = React.forwardRef((props, ref) => {

    const {
        children
    }=props;

    return (
        <Base {...props} component={"span"}> 
            {children}
        </Base>
    )
})

export default Text;