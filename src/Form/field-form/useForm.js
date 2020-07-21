
import React from 'react';
import {
    getNamePath, getValue,
} from '../../ParrotUtils/formUtils/valueUtil';

export class FormStore {
    
    formHooked=false;
    forceRootUpdate;
    subscribable=true;
    store={};
    fieldEntities=[];
    initialValues={};
    callbacks={};
    validateMessages=null;
    preserve=null;
    lastValidatePromise=null;

    constructor(forceRootUpdate){
        this.forceRootUpdate=forceRootUpdate;
    }

    getForm=()=>({
        getFieldValue:this.getFieldValue,
        getFieldsValue:this.getFieldsValue,
        getFieldError:this.getFieldError,
        getFieldsError:this.getFieldsError,
        isFieldsTouched:this.isFieldsTouched,
        isFieldTouched:this.isFieldTouched,
        isFieldValidating:this.isFieldValidating,
        isFieldsValidating:this.isFieldsValidating,
        resetFields:this.resetFields,
        setFields:this.setFields,
        setFieldsValue:this.setFieldsValue,
        validateFields:this.validateFields,
        submit:this.submit,
        getInternalHooks:this.getInternalHooks
        
    });

    getFieldValue=(name)=>{
        const namePath=getNamePath(name);
        return getValue(this.store,namePath);
    }

    getFieldsValue=(nameList,filterFunc)=>{
        
    }


}

export default function useForm(form){

    const formRef=React.useRef();
    const [,forceUpdate]=React.useState();

    if(!formRef.current){
        if(form){
            formRef.current=form;
        }else{
            const forceReRender=()=>{
                forceUpdate({});
            };
        }
    }

}