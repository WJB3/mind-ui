import toChildrenArray from '../../ParrotUtils/formUtils/Children/toArray';
import  {warning} from '../../ParrotUtils/utils/warning';
import React,{useRef,useContext} from 'react';
import FieldContext, { HOOK_MARK } from './FieldContext';
import { getValue ,defaultGetValueFromEvent, getNamePath} from '../../ParrotUtils/formUtils/valueUtil';
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

    const getControlled=(childProps={})=>{//{placeholder:"user"}
       
        const mergedValidateTrigger =validateTrigger!==undefined?validateTrigger:context.validateTrigger;//onChange

        const namePath=getNamePath(name);//['name']
  
        const { getInternalHooks,getFieldsValue }=context;

        const { dispatch }=getInternalHooks(HOOK_MARK);

        const value = getValue(getFieldsValue(true),namePath);

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

            dispatch({
                type: 'updateValue',
                namePath,
                value: newValue,
            });

            if(originTriggerFunc){
                originTriggerFunc(...args);
            }
        }  
        return control;
    }

    const getOnlyChild=(children)=>{ 
        const childList=toChildrenArray(children);
        return { child: childList[0]  };
    }
 
    const { child }=getOnlyChild(children);

    let returnChildNode;    

    if(React.isValidElement(child)){
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
 

export default Field;