import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import "./index.scss";

const componentName = "Typography";

const Typography = React.forwardRef((props, ref) => {
    const {
        children
    } = props;

    return (
        <article
            className={
                classNames(
                    `${globalPrefix}-${componentName}`,
                )
            }
        >
            {children}
        </article>
    )
})

export default Typography;