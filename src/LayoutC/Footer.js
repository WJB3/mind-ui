import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import "./index.scss";

const componentName = "Footer";

const Footer = React.forwardRef((props, ref) => {
    const {
        children
    } = props;

    return (
        <main
            className={
                classNames(
                    `${globalPrefix}-${componentName}`,
                )
            }
        >
            {children}
        </main>
    )
})

export default Footer;