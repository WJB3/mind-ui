import React,{ Fragment } from 'react'; 
import AForm, { Field as AField } from './Form/field-form';

const Demo = () => {

  const [form]=AForm.useForm();

  console.log(form);

  const handleTest=(e)=>{
    e.preventDefault();
    console.log(form.getFieldValue("username"));
    console.log(form.getFieldsValue(["username"]));
 
    
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
      
    </Form> */}
    <AForm form={form}>
      <AField name="username">
        <input placeholder="username" />
      </AField>
      
      <button onClick={handleTest}>测试</button>
    </AForm>
  </Fragment>
}


export default Demo;