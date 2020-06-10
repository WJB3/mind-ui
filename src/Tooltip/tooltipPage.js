import React, { useRef, useState } from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Tooltip from './index';
import Button from '../ButtonBase';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Grid from '../components/grid';

//import  Notification from 'rc-notification';
const TooltipPage = () => {

    return (
        <Layout >
            <Title>Tooltip文字提示</Title>
            <SubTitle>何时使用</SubTitle>
            <Description>Tooltip文字提示</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <Tooltip title="我是提示"    >
                        <Button>展示文字提示(默认上)</Button>
                    </Tooltip>


                </React.Fragment>}
                title={"基本用法"}
                description={""}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                
                    
                    <Tooltip title="我是提示" defaultVisible={true} placement={"right-end"} >
                        <Button>展示文字提示(右下)</Button>
                    </Tooltip>


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
                    { attr: "children", description: "需要挂载的元素", type: "node/string", default: "false" },
                    { attr: "title", description: "提示内容", type: "node/string", default: "" },
                    { attr: "prefixCls", description: "自定义类名前缀", type: "string", default: "" },
                    { attr: "className", description: "额外添加的类名", type: "string", default: "false" },
                    { attr: "arrow", description: "是否有箭头", type: "boolean", default: "true" },
                    { attr: "animation", description: "动画名称", type: "string", default: "grow" },
                    { attr: "visible", description: "是否显示", type: "boolean", default: "" },
                    { attr: "defaultVisible", description: "默认是否显示", type: "boolean", default: "" },
                    { attr: "placement", description: "位置", type: "string", default: "top" },
                    { attr: "onVisibleChange", description: "弹框消失/隐藏的回调", type: "string", default: "top" },
                    { attr: "trigger", description: "弹框的时机", type: "string", default: "hover" },
                ]}
            />

        </Layout>
    )

}

export default TooltipPage;