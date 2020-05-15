import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from '../ButtonBase';
import Steps from './index';

import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
//import  Notification from 'rc-notification';
const StepsItem=Steps.Item;

class Page extends React.Component {


    render() {

        return (
            <Layout >
                <Title>Steps步骤条</Title>
                <Description>引导用户按照流程完成任务的导航条。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Steps current={1}>
                            <StepsItem title="Finished" description="This is a description." />
                            <StepsItem title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
                            <StepsItem title="Waiting" description="This is a description." />
                        </Steps>
                    </React.Fragment>}
                    title={"按钮类型"}
                    description={"按钮有六种类型：主按钮、次按钮、危险按钮、提示按钮、警告按钮、禁用按钮。主按钮在同一个操作区域最多出现一次。"}
                ></Textlayout>


                <SubTitle>API</SubTitle>
                <Description>通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled。</Description>
                <Description>按钮的属性说明如下：</Description>
                <DescriptionTable
                    columns={[
                        { title: "属性", dataIndex: "attr" },
                        { title: "说明", dataIndex: "description" },
                        { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                        { title: "默认值", dataIndex: "default" }
                    ]}
                    dataSource={[
                        { attr: "disabled", description: "按钮失效状态", type: "boolean", default: "false" },
                        { attr: "type", description: "设置按钮类型，可选值为 primary dashed danger link或者不设", type: "string", default: "-" },
                        { attr: "size", description: "设置按钮大小，可选值为 small large 或者不设", type: "string", default: "default" },
                        { attr: "shape", description: "设置按钮形状，可选值为 circle 或者不设", type: "string", default: "-" },
                        { attr: "float", description: "设置按钮是否悬浮", type: "boolean", default: "false" },
                        { attr: "flat", description: "设置按钮的扁平状态", type: "boolean", default: "false" },
                    ]}
                />

            </Layout>
        )
    }
}

export default Page;