
import React from 'react';
import FieldForm from './Form';
import Field from './Field';
import useForm from './useForm';

const RefForm=React.forwardRef(FieldForm);

RefForm.useForm=useForm;

export {
    Field,
    useForm
}

export default RefForm;