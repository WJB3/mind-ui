import React, { useRef, useState } from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Popper from './index';
import Button from '../ButtonBase';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';

//import  Notification from 'rc-notification';
const PopperPage = () => {

    const [mountNode, setMountNode] = React.useState(null);

    const handleClick = (e) => {
        setMountNode(mountNode?null:e.currentTarget);
    }

    const visible=Boolean(mountNode);

    return (
        <Layout >
            <Title>Popper弹出提示工具</Title>
            <SubTitle>何时使用</SubTitle>
            <Description>弹出提示工具Popper</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <Button onClick={handleClick}>点击出现弹框</Button>

                    <Popper visible={visible} mountNode={mountNode} placement="top-start">
                        {"popper"}
                    </Popper>

                </React.Fragment>}
                title={"基本用法"}
                description={"一个简单的 loading 状态。"}
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
                    { attr: "children", description: "孩子节点", type: "node", default: "false" },
                    { attr: "disablePortal", description: "是否禁用传送门", type: "boolean", default: "" },
                    { attr: "container", description: "传送门挂载", type: "func/node", default: "document.body" },
                    { attr: "transition", description: "是否开启动画", type: "boolean", default: "true" },
                    { attr: "prefixCls", description: "自定义类名", type: "string", default: "true" },
                    { attr: "placement", description: "弹出的位置", type: "string", default: "top" },
                    { attr: "className", description: "添加的类名", type: "string", default: "" },
                    { attr: "mountNode", description: "需要挂载的节点", type: "node", default: "" },
                    { attr: "visible", description: "显示或隐藏节点", type: "node", default: "" },
                    
                ]}
            />

        </Layout>
    )

}

export default PopperPage;