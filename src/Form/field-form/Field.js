import toChildrenArray from '../../ParrotUtils/formUtils/Children/toArray';
import warning from '../../ParrotUtils/utils/warning';
import React,{useRef,useContext} from 'react';
import FieldContext, { HOOK_MARK } from './FieldContext';
import {getValue as getValueUtil} from '../../ParrotUtils/formUtils/valueUtil';

const Field =(props)=>{

    const {
        name,
        trigger,
        validateTrigger,
        getValueFromEvent,
        normalize,
        valuePropName,
        getValueProps
    }=props;

    const validatePromise=useRef(null);

    const prevValidating=useRef();

    const touched=useRef(false);

    const dirty=useRef(false);

    const errors=useRef([]);

    const context=useContext(FieldContext);

    const isFieldValidating=()=>!!validatePromise.current;

    const isFieldTouched=()=>touched.current;

    const getControlled=(childProps={})=>{
        const mergedValidateTrigger =validateTrigger!==undefined?validateTrigger:context.validateTrigger;
        const namePath=getNamePath();
        const {getInternalHooks,getFieldsValue}=context;
        const {dispatch}=getInternalHooks(HOOK_MARK);
        const value = getValue();
        const mergedGetValueProps = getValueProps || ((val) => ({ [valuePropName]: val }));
        const originTriggerFunc=childProps[trigger];

        const control={
            ...childProps,
            ...mergedGetValueProps(value)
        }

        control[trigger]=(...args)=>{
            touched.current=true;
            dirty.current=true;

            let newValue;
            if(getValueFromEvent){
                
            }
        }
    }

    const getOnlyChild=(children)=>{
        if(typeof children==='function'){
            const meta=getMeta();
            return {
                ...getOnlyChild(children(getControlled(), meta, context)),
                isFunction: true,
            };

        }
    }

    const getNamePath=()=>{
        const {prefixName=[]}=context;
        return name!==undefined ? [...prefixName,...name]:[];
    }

    const getValue=(store)=>{
        const { getFieldsValue }=context;
        const namePath=getNamePath();
        return getValueUtil(store||getFieldsValue(true),namePath);
    }

    const getMeta=()=>{
        prevValidating.current=isFieldValidating();

        const meta={
            touched:isFieldTouched(),
            validating:prevValidating.current,
            errors:errors.current,
            name:getNamePath()
        };

        return meta;
    }

    let returnChildNode;


    return <React.Fragment>
        {returnChildNode}
    </React.Fragment>
}