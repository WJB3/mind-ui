import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import "./index.scss";

const componentName = "Header";

const Header = React.forwardRef((props, ref) => {
    const {
        children
    } = props;

    return (
        <header
            className={
                classNames(
                    `${globalPrefix}-${componentName}`,
                )
            }
        >
            {children}
        </header>
    )
})

export default Header;