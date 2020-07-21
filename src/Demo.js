import React from 'react';
import Form, { Field } from 'rc-field-form';

const Demo=()=>{
    return <Form
    onFinish={values => {
      console.log('Finish:', values);
    }}
    initialValues={{username:"吴家宝",password:"123456"}}
  >
    <Field name="username">
      <input placeholder="Username" />
    </Field>
    <Field name="password">
      <input placeholder="Password" />
    </Field>
  
    <button>Submit</button>
  </Form>
}


export default Demo;