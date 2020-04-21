import React from 'react';
import { globalPrefix } from './global';

export const ConfigContext=React.createContext({
    getPrefixCls:(suffixCli,customizePrefixCls)=>{
        if(customizePrefixCls) return customizePrefixCls;

        return `${globalPrefix}-${suffixCli}`
    }
})