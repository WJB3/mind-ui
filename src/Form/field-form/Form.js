
import React from 'react';
import FormContext from './FormContext';
import FieldContext,{ HOOK_MARK } from './FieldContext';
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
        onFinishFailed,
        validateTrigger='onChange'
    }=props;

    const formContext=React.useContext(FormContext);

    const [ formInstance ]=useForm(form);

    const {
        useSubscribe,
        setInitialValues,
        setCallbacks,
        setValidateMessages,
        setPreserve
    }=formInstance.getInternalHooks(HOOK_MARK);

    let childrenNode=children;

    const childrenRenderProps=typeof children==="function";

    if(childrenRenderProps){
        const values=formInstance.getFieldsValue(true);
        childrenNode=children(values,formInstance);
    }

    useSubscribe(!childrenRenderProps);

    const formContextValue=React.useMemo(
        ()=>({
            ...formInstance,
            validateTrigger
        }),
        [formInstance,validateTrigger]
    );

    const wrapperNode=(
        <FieldContext.Provider value={formContextValue}>{childrenNode}</FieldContext.Provider>
    );

    if(Component===false){
        return wrapperNode;
    }

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