

import SizeContext,{ SizeContextProvider } from '../ConfigContext/SizeContext';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import React from 'react';

const Form=React.forwardRef((props,ref)=>{


    const {getPrefixCls}=React.useContext(ConfigContext);

    const contextSize=React.useContext(SizeContext);

    const {
        name,
        prefixCls:customizePrefixCls,
        className='',
        size=contextSize,
        form,
        colon,
        labelAlign,
        labelCol,
        wrapperCol,
        hideRequiredMark,
        layout="horizontal",
        scrollToFirstError,
        onFinishFailed,
        ...restFormProps
    }=props;

    const prefixCls=getPrefixCls("form",customizePrefixCls)

    const formClassName=classNames(
        prefixCls,
        {
            [`${prefixCls}-${layout}`]:true,
            [`${prefixCls}-hide-required-mark`]:hideRequiredMark,
            [`${prefixCls}-${size}`]: size,
        },
        className
    );
    

});

export default Form;