import React,{ Fragment } from 'react';
import Form, { Field } from 'rc-field-form';
import AForm, { Field as AField } from './Form/field-form';

const Demo = () => {

  const [form]=Form.useForm();

  const handleTest=(e)=>{
    e.preventDefault();
    console.log(form.getFieldValue("username"));
    console.log(form.getFieldsValue(["username","password"]));
    console.log(form.getFieldError(["username"]));
    console.log(form.getFieldsError(["username","password"]));
    console.log(form.isFieldTouched("password"));
    console.log(form.isFieldsTouched(["username","password"]));
    console.log(form.isFieldValidating("username"));
    form.validateFields(["username"]).then(res=>console.log(res)).catch(err=>console.log(err));
    form.submit();
    
    // form.setFields([{name:"username",value:"1111"}]);
    // form.setFieldsValue({username:"sevalue"});
    // form.resetFields();
    
  }
 

  return <Fragment>
    {/* <Form
      onFinish={values => {
        console.log('Finish:', values);
      }}
      initialValues={{  }}
      form={form} 
    >
      <Field name="username" rules={[{required:true,message:"用户名必填"}]} >
        <input placeholder="Username" />
      </Field>
      <Field name="password">
        <input placeholder="Password" />
      </Field>
      <button>Submit</button>
      <button onClick={handleTest}>测试</button>
    </Form> */}
    <AForm>
      <AField name="user">
        <input placeholder="user"/>
      </AField>
    </AForm>
  </Fragment>
}


export default Demo;