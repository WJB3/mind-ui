import * as React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import SubTitle from './../components/text/SubTitle';
import TextLayout from './../components/text/TextLayout';
import {Upload} from 'antd';
 

interface Props{
   
}

 
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
                <TextLayout
                    components={<React.Fragment>
                          
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"使用 <Icon /> 标签声明组件，指定图标对应的 name 属性。"}
                ></TextLayout>

            </Layout>
        )
 
}

export default Page;