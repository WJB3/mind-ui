
import React from 'react';
import {
    getNamePath, getValue, containsNamePath, setValue, setValues,cloneByNamePathList
} from '../../ParrotUtils/formUtils/valueUtil';
import NameMap from '../../ParrotUtils/formUtils/NameMap';
import { HOOK_MARK } from './FieldContext';
import { warning } from '../../ParrotUtils/utils/warning';
import { defaultValidateMessages } from '../../ParrotUtils/formUtils/messages';
import { allPromiseFinish } from '../../ParrotUtils/formUtils/asyncUtil';


export class FormStore {

    formHooked = false;
    forceRootUpdate;
    subscribable = true;
    store = {};
    fieldEntities = [];
    initialValues = {};
    callbacks = {};
    validateMessages = null;
    preserve = null;
    lastValidatePromise = null;

    constructor(forceRootUpdate) {
        this.forceRootUpdate = forceRootUpdate;
    }

    getForm = () => ({
        getFieldValue: this.getFieldValue,
        getFieldsValue: this.getFieldsValue,
        getFieldError: this.getFieldError,
        getFieldsError: this.getFieldsError,
        isFieldsTouched: this.isFieldsTouched,
        isFieldTouched: this.isFieldTouched,
        isFieldValidating: this.isFieldValidating,
        isFieldsValidating: this.isFieldsValidating,
        resetFields: this.resetFields,
        setFields: this.setFields,
        setFieldsValue: this.setFieldsValue,
        validateFields: this.validateFields,
        submit: this.submit,
        getInternalHooks: this.getInternalHooks

    });

    getFieldValue = (name) => {//获取单个字段的值
        const namePath = getNamePath(name);
        return getValue(this.store, namePath);
    }

    getFieldsValue = (nameList, filterFunc) => {
        if (nameList === true && !filterFunc) {
            return this.store;
        }

        const fieldEntities = this.getFieldEntitiesForNamePathList(
            Array.isArray(nameList) ? nameList : null
        );

        const filteredNameList = [];
        fieldEntities.forEach((entity) => {
            const namePath =
                'INVALIDATE_NAME_PATH' in entity ? entity.INVALIDATE_NAME_PATH : entity.getNamePath();

            if (!filterFunc) {
                filteredNameList.push(namePath);
            } else {
                const meta = 'getMeta' in entity ? entity.getMeta() : null;
                if (filterFunc(meta)) {
                    filteredNameList.push(namePath);
                }
            }
        });
        return cloneByNamePathList(this.store, filteredNameList.map(getNamePath));
    }

    getFieldError = (name) => {
        const namePath = getNamePath(name);
        const fieldError = this.getFieldsError([namePath])[0];
        return fieldError.errors;
    }

    getFieldsError = (nameList) => {
        const fieldEntities = this.getFieldEntitiesForNamePathList(nameList);

        return fieldEntities.map((entity, index) => {
            if (entity && !("INVALIDATE_NAME_PATH" in entity)) {
                return {
                    name: entity.getNamePath(),
                    errors: entity.getErrors()
                }
            }
            return {
                name: getNamePath(nameList[index]),
                errors: []
            }
        })
    }

    getFieldEntitiesForNamePathList = (nameList) => {
        if (!nameList) {
            return this.getFieldEntities(true);
        }
        const cache = this.getFieldsMap(true);
        console.log(cache);
        return nameList.map(name => {
            const namePath = getNamePath(name);
            return cache.get(namePath) || { INVALIDATE_NAME_PATH: getNamePath(name) };
        })
    }

    isFieldTouched = () => {
        return this.isFieldsTouched([name]);
    }

    isFieldsTouched = (...args) => {
        const [arg0, arg1] = args;
        let namePathList;
        let isAllFieldsTouched = false;

        if (args.length === 0) {
            namePathList = null;
        } else if (args.length === 1) {
            if (Array.isArray(arg0)) {
                namePathList = arg0.map(getNamePath);
                isAllFieldsTouched = false;
            } else {
                namePathList = arg0.map(getNamePath);
                isAllFieldsTouched = arg0;
            }
        } else {
            namePathList = arg0.map(getNamePath);
            isAllFieldsTouched = arg1;
        }

        const testTouched = (field) => {
            if (!namePathList) {
                return field.isFieldTouched();
            }

            const fieldNamePath = field.getNamePath();
            if (containsNamePath(namePathList, fieldNamePath)) {
                return field.isFieldTouched();
            }

            return isAllFieldsTouched;
        }

        return isAllFieldsTouched ? this.getFieldEntities(true).every(testTouched) : this.getFieldEntities(true).some(testTouched)

    }

    isFieldsValidating = (nameList) => {
        const fieldEntities = this.getFieldEntities();

        if (!nameList) {
            return fieldEntities.some(testField => testField.isFieldValidating());
        }
        const namePathList = nameList.map(getNamePath);
        return fieldEntities.some(testField => {
            const fieldNamePath = testField.getNamePath();
            return containsNamePath(namePathList, fieldNamePath) && testField.isFieldValidating();
        })
    }

    isFieldValidating = (name) => {
        return this.isFieldsValidating([name]);
    }

    //===================================Fields===========================================//

    getFields = () => {
        const entities = this.getFieldEntities(true);

        const fields = entities.map(
            (field) => {
                const namePath = field.getNamePath();
                const meta = field.getMeta();
                const fieldData = {
                    ...meta,
                    name: namePath,
                    value: this.getFieldValue(namePath)
                };
                Object.defineProperty(fieldData, 'originRCField', {
                    value: true
                });

                return fieldData;
            }
        );

        return fields;
    }

    getFieldEntities = (pure = false) => { 
        if (!pure) {
            return this.fieldEntities;
        }
        return this.fieldEntities.filter(field => field.getNamePath().length);
    }

    getFieldsMap = (pure = false) => {
        const cache = new NameMap();
        this.getFieldEntities(pure).forEach(field => {
            const namePath = field.getNamePath();
            cache.set(namePath, field);
        });
        return cache;
    }

    //=====================Observer ===========================//
    dispatch = (action) => {
        switch (action.type) {
            case 'updateValue': {
                const { namePath, value } = action;
                this.updateValue(namePath, value);
                break;
            }
        }
    }

    notifyObservers = (prevStore, namePathList, info) => {
        if (this.subscribable) {
            const mergedInfo = {
                ...info,
                store: this.getFieldsValue(true)
            };
            this.getFieldEntities().forEach(({ onStoreChange }) => {
                onStoreChange(prevStore, namePathList, mergedInfo);
            })
        } else {
            this.forceRootUpdate();
        }
    }

    updateValue = (name, value) => {

        const namePath = getNamePath(name);
        const prevStore = this.store;
        this.store = setValue(this.store, namePath, value);

        this.notifyObservers(prevStore, [namePath], {
            type: "valueUpdate",
            source: 'internal'
        });

        const { onValuesChange }=this.callbacks;
        if(onValuesChange){
            const changedValues = cloneByNamePathList(this.store, [namePath]);
            onValuesChange(changedValues, this.store);
        }
 
        this.triggerOnFieldsChange([namePath]);
    }

    triggerOnFieldsChange=(namePathList,fieldErrors)=>{
        const { onFieldsChange }=this.callbacks;

        if(onFieldsChange){
            const fields=this.getFields();

            if(fieldErrors){
                const cache=new NameMap();
                fieldErrors.forEach(({name,errors})=>{
                    cache.set(name,errors);
                });
                fields.forEach(field=>{
                    field.errors=cache.get(field.name)||field.errors;
                })
            }

            const changedFields=fields.filter(({name})=>containsNamePath(namePathList,name))

            onFieldsChange(changedFields,fields);
        }

        
    }

    //=====================Internal Hooks======================//
    getInternalHooks = (key) => {
        if (key === HOOK_MARK) {
            this.formHooked = true;
            return {
                dispatch: this.dispatch,
                useSubscribe: this.useSubscribe,
                setInitialValues: this.setInitialValues,
                setCallbacks: this.setCallbacks,
                setValidateMessages: this.setValidateMessages,
                getFields: this.getFields,
                setPreserve: this.setPreserve
            }
        }

        warning(false, '`getInternalHooks` is internal usage. Should not call directly.');
        return null;
    }

    useSubscribe = (subscribable) => {
        this.subscribable = subscribable;
    }

    setInitialValues = (initialValues, init) => {
        this.initialValues = initialValues || {};

        if (init) {
            this.store = setValues({}, initialValues, this.store);
        }
    }

    setCallbacks = (callbacks) => {
        this.callbacks = callbacks;
    }

    setValidateMessages = (validateMessages) => {
        this.validateMessages = validateMessages;
    }

    setPreserve = (preserve) => {
        this.preserve = preserve;
    }

    //=======================Validate===========================//
    validateFields = (nameList, options) => {
        const provideNameList = !!nameList;
        const namePathList = provideNameList ? nameList.map(getNamePath) : [];

        const promiseList = [];

        this.getFieldEntities(true).forEach(field => {
            if (!provideNameList) {
                namePathList.push(field.getNamePath());
            }

            if (!field.props.rules || !field.props.rules.length) {
                return;
            }

            const fieldNamePath = field.getNamePath();

            if (!provideNameList || containsNamePath(namePathList, fieldNamePath)) {
                const promise = field.validateRules({
                    validateMessages: {
                        ...defaultValidateMessages,
                        ...this.validateMessages,
                    },
                    ...options,
                });
                // Wrap promise with field
                promiseList.push(
                    promise
                        .then(() => ({ name: fieldNamePath, errors: [] }))
                        .catch(errors =>
                            Promise.reject({
                                name: fieldNamePath,
                                errors,
                            }),
                        ),
                );
            }


        });

        const summaryPromise=allPromiseFinish(promiseList);
        this.lastValidatePromise=summaryPromise;

        summaryPromise
            .catch(results=>results)
            .then(results=>{
                const resultNamePathList=results.map(({name})=>name);
                this.notifyObservers(this.store,resultNamePathList,{
                    type:"validateFinish"
                })
                this.triggerOnFieldsChange(resultNamePathList,results);
            })

        const returnPromise=summaryPromise
            .then(()=>{
                if(this.lastValidatePromise===summaryPromise){
                    return Promise.resolve(this.getFieldsValue(namePathList));
                }
                return Promise.reject([]);
            })
            .catch((results)=>{
                const errorList=results.filter(result=>result && result.errors.length);
                return Promise.reject({
                    values:this.getFieldsValue(namePathList),
                    errorFields:errorList,
                    outOfDate:this.lastValidatePromise!==summaryPromise
                })
            });

        returnPromise.catch(e=>e);

        return returnPromise;
    }

    //========================submit=============================//
    submit=()=>{
        this.validateFields()
            .then(values=>{
                const { onFinish }=this.callbacks;
                if(onFinish){
                    try{
                        onFinish(values);
                    }catch(err){
                        console.error(err);
                    }
                }
            })
            .catch(e=>{
                const { onFinishFailed }=this.callbacks;
                if(onFinishFailed){
                    onFinishFailed(e);
                }
            })
    }
}

export default function useForm(form) {

    const formRef = React.useRef();
    const [, forceUpdate] = React.useState();

    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        } else {
            const forceReRender = () => {
                forceUpdate({});
            };
            const formStore = new FormStore(forceReRender);

            formRef.current = formStore.getForm();
        }
    }

    return [formRef.current];

}