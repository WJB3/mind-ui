import React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from '../ButtonBase/index';
import TextLayout from './../components/text/TextLayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Notification from './index';

const Page = () => {


    const openNotification = () => {

        Notification.success({
            message: "测试",
            duration:5
        })
    }

    const openNotification2 = (placement) => {

        Notification.success({
            message: "测试",
            duration:500,
            placement:placement
        })
    }
    return (
        <Layout >
            <Title>Notification通知提醒框</Title>
            <Description>全局展示通知提醒信息。</Description>
            <SubTitle>何时使用</SubTitle>
            <Description>在系统四个角显示通知提醒信息。经常用于以下情况：</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                components={<React.Fragment>
                    <Button type={"primary"} onClick={openNotification}>Open the notification box</Button>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法，4 秒后自动关闭。可设置弹框背景色。"}
            ></TextLayout>

            <TextLayout
                components={<React.Fragment>
                    <Button type={"primary"} onClick={()=>openNotification2("top-left")}>左上</Button>
                    <Button type={"primary"} onClick={()=>openNotification2("top-right")}>右上</Button>
                    <Button type={"primary"} onClick={()=>openNotification2("bottom-left")}>左下</Button>
                    <Button type={"primary"} onClick={()=>openNotification2("bottom-right")}>右下</Button>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法，4 秒后自动关闭。可设置弹框背景色。"}
            ></TextLayout>


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

export default Page;