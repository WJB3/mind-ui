import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import { typeEnum } from './../components/color';
import Base from './Base';
import "./index.scss";

const componentName = "Typography-Paragraph";

const Paragraph = React.forwardRef((props, ref) => {

    const {
        children,
        ...restProps
    }=props;

    return (
        <Base {...restProps} component={"div"}> 
            {children}
        </Base>
    )
})

export default Paragraph;