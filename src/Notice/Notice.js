import React, { useEffect, Fragment } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useComponentEffects from '../_utils/useComponentEffect';
import Alert from '../Alert';
 
 
const Notice  = React.forwardRef((NoticeProps) => {
    const {
        effect="grow",
        className,
        message,
        type="normal",
        prefixCls:customizePrefixCls,
        in:inProp
    } = NoticeProps;

    const TransitionComponent=useComponentEffects(effect);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("notice", customizePrefixCls);
    
    return (
        <TransitionComponent in={inProp}>
            <Alert className={classNames(prefixCls,className)} type={type}>{message}</Alert>
        </TransitionComponent>
    )
})

export default Notice;