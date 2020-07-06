import React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import TextLayout from './../components/text/TextLayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Carousel from './index';



const Page = () => {



    return (
        <Layout >
            <Title>Empty空状态</Title>
            <SubTitle>何时使用</SubTitle>
            <Description>Grid栅格</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Carousel>
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                    </Carousel>
                </React.Fragment>}
                title={"基本用法"}
                description={""}
            ></TextLayout>

        


            <SubTitle>API</SubTitle>
            <Description>通过设置Protal</Description>
            <Description>按钮的属性说明如下：</Description>
            <DescriptionTable
                columns={[
                    { title: "属性", dataIndex: "attr" },
                    { title: "说明", dataIndex: "description" },
                    { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                    { title: "默认值", dataIndex: "default" }
                ]}
                dataSource={[
                    { attr: "style", description: "样式", type: "node/string", default: "false" },
                    { attr: "title", description: "提示内容", type: "node/string", default: "" },
                    { attr: "prefixCls", description: "自定义类名前缀", type: "string", default: "" },
                    { attr: "description", description: "描述", type: "string", default: "" },
                    { attr: "type", description: "类型", type: "string", default: "" },
                    { attr: "height", description: "高度", type: "number", default: "" },
                ]}
            />

        </Layout>
    )

}
export default Page;