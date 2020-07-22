
import React from 'react';
import FormContext from './FormContext';
import FieldContext,{HOOK_MARK} from './FieldContext';
import useForm from './useForm';

const Form=(props,ref)=>{

    const {
        name,
        initialValues,
        form,
        component:Component="form",
        onValuesChange,
        onFieldsChange,
        onFinish,
        onFinishFailed
    }=props;

    const formContext=React.useContext(FormContext);

    const [formInstance]=useForm(form);

    const {

    }=formInstance.getInternalHooks(HOOK_MARK);

    let childrenNode=children;

    const childrenRenderProps=typeof children==="function";

    if(childrenRenderProps){
        const values=formInstance.getFieldsValue(true);
        childrenNode=children(values,formInstance);
    }


    const wrapperNode=(
        <FieldContext.Provider value={formContextValue}>{childrenNode}</FieldContext.Provider>
    )

    return (
        <Component
            {...restProps}
            onSubmit={(event)=>{
                event.prevetDefault();
                event.stopPropagation();

                formInstance.submit();
            }}
        >
            {wrapperNode}
        </Component>
    )

};

export default Form;