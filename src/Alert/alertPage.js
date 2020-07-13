import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Alert from './index';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Space from '../Space';
import Button from '../ButtonBase';

const Page = () => {

    return (
        <Layout >
            <Title>Alert</Title>
            <Description>返回页面顶部的操作按钮。</Description>
            <SubTitle>何时使用</SubTitle>
            <Description>当页面内容区域比较长时。</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <Space direction="vertical" isBlock >
                        
                        <Alert type="error">这是一个错误提示！</Alert>

                        <Alert type="warning" closable onClose={() => { console.log("我点击了close") }}>这是一个警告提示！</Alert>

                        <Alert type="info" icon={false}>这是一个提示！</Alert>

                        <Alert type="success" deep={4}  action={
                            <Button color="inherit"  size="small" flat>
                                UNDO
                            </Button>
                        }>这是一个成功提示！</Alert>
                    </Space>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <Space direction="vertical" isBlock >
                        <Alert type="error" title={"错误"} closable onClose={() => { console.log("我点击了close") }}>这是一个错误提示！</Alert>

                        <Alert type="warning" title={"警告"}>这是一个警告提示！</Alert>

                        <Alert type="info" title={"提示"}>这是一个提示！</Alert>

                        <Alert type="success" deep={4}  title={"成功"}>这是一个成功提示！</Alert>
                    </Space>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <Space direction="vertical" isBlock >
                        <Alert type="error" filled deep={4}  closable onClose={() => { console.log("我点击了close") }}>这是一个错误提示！</Alert>

                        <Alert type="warning" filled deep={4} >这是一个警告提示！</Alert>

                        <Alert type="info" filled deep={4}  >这是一个提示！</Alert>

                        <Alert type="success" filled deep={4}  action={
                            <Button color="inherit" size="small" flat>
                                UNDO
                            </Button>
                        }>这是一个成功提示！</Alert>
                    </Space>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法。"}
            ></TextLayout>


            <SubTitle>API</SubTitle>
            <Description>属性说明如下：</Description>
            <DescriptionTable
                columns={[
                    { title: "属性", dataIndex: "attr" },
                    { title: "说明", dataIndex: "description" },
                    { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                    { title: "默认值", dataIndex: "default" }
                ]}
                dataSource={[
                    { attr: "prefixCls", description: "自定义类名前缀", type: "string", default: "" },
                    { attr: "className", description: "额外添加的类名", type: "string", default: "false" },
                    { attr: "style", description: "样式", type: "object", default: "{}" },

                ]}
            />

        </Layout>
    )
}

export default Page;