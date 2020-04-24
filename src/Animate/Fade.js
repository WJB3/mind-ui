import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { CSSTransition } from 'react-transition-group';
import "./index.scss";
const Fade = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        in: inProp,
        isDestory=true
    } = Props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("animate-fade", customizePrefixCls);

    return (
        <CSSTransition
            in={inProp}
            timeout={300}
            classNames={classNames(prefixCls)}
            unmountOnExit={isDestory}
        >
            {children}
        </CSSTransition>

    )
});

export default Fade;