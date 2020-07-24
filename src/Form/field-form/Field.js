import toChildrenArray from '../../ParrotUtils/formUtils/Children/toArray';
import warning from '../../ParrotUtils/utils/warning';
import React,{useRef,useContext} from 'react';
import FieldContext, { HOOK_MARK } from './FieldContext';
import {getValue as getValueUtil,defaultGetValueFromEvent, getNamePath} from '../../ParrotUtils/formUtils/valueUtil';
import { toArray } from '../../ParrotUtils/formUtils/typeUtil';

const Field =(props)=>{ 

    const {
        name,
        trigger="onChange",
        validateTrigger,
        getValueFromEvent,
        normalize,
        valuePropName="value",
        getValueProps,
        rules,
        children
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
        const { getInternalHooks,getFieldsValue }=context;
        const { dispatch }=getInternalHooks(HOOK_MARK);
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
                newValue=getValueFromEvent(...args);
            }else{
                newValue=defaultGetValueFromEvent(valuePropName,...args);
            }

            if(normalize){
                newValue=normalize(newValue,value,getFieldsValue(true));
            }

            dispatch({
                type: 'updateValue',
                namePath,
                value: newValue,
            });

            if(originTriggerFunc){
                originTriggerFunc(...args);
            }
        }

        const validateTriggerList=toArray(mergedValidateTrigger||[]);

        validateTriggerList.forEach((triggerName)=>{
            const originTrigger=control[triggerName];
            control[triggerName]=(...args)=>{
                console.log("onChange");
                if(originTrigger){
                    originTrigger(...args);
                }
            }
        })
        // if(rules && rules.length){
        //     dispatch({
        //         type:"validateField",
        //         namePath,
        //         triggerName
        //     });
        // }

        console.log(control);

        return control;
    }

    const getOnlyChild=(children)=>{ 
   
        if(typeof children==='function'){
            
            const meta=getMeta();
            return {
                ...getOnlyChild(children(getControlled(), meta, context)),
                isFunction: true,
            };
        }  
        const childList=toChildrenArray(children);

        if (childList.length !== 1 || !React.isValidElement(childList[0])) {
            return { child: childList, isFunction: false };
        }
        
        return { child: childList[0], isFunction: false };
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

    const { isFunction,child }=getOnlyChild(children);

    let returnChildNode; 

    if(isFunction){
        returnChildNode=child;
    }else if(React.isValidElement(child)){
        returnChildNode=React.cloneElement(
            child,
            getControlled(child.props)
        )
    }else{
        warning(!child, '`children` of Field is not validate ReactElement.');
        returnChildNode = child;
    }


    return <React.Fragment>
        {returnChildNode}
    </React.Fragment>
}

const WrapperField=({name,isListField,...restProps})=>{

    const namePath=name!==undefined?getNamePath(name):undefined;

    let key='keep';
    
    if(!isListField){
        key=`_${(namePath||[]).join("_")}`;
    }

    return <Field key={key} name={namePath} {...restProps} />;
}

export default WrapperField;