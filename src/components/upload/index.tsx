import * as React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import {Upload} from 'antd';
import Button from './../button';
import Icon from './../icon';

interface Props{
   
}

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
 
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
};

const Page:React.FunctionComponent<Props>=(Props)=>{ 
  
        return (
            <Layout >
                <Title>Uploader</Title>     
                <SubTitle>何时使用</SubTitle>
                <Upload {...props}>
                    <Button>
                        <Icon name="upload"/>
                    </Button>
                </Upload>
                <Textlayout
                    components={<React.Fragment>
                          
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"使用 <Icon /> 标签声明组件，指定图标对应的 name 属性。"}
                ></Textlayout>

            </Layout>
        )
 
}

export default Page;