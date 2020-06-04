import React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from '../ButtonBase';
import Space from './index';
import TextLayout from './../components/text/TextLayout';
import DescriptionTable from './../components/text/DescriptionTable';
//import  Notification from 'rc-notification';

class ButtonPage extends React.Component {


    render() {

        return (
            <Layout >
                <Title>Space间距</Title>
                <Description>设置组件之间的间距。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>避免组件紧贴在一起，拉开统一的空间。</Description>
                <SubTitle>代码演示</SubTitle>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space itemStyle={{marginBottom:"8px"}}>
                            <Button>default</Button>
                            <Button type={"primary"}>Primary</Button>
                            <Button type={"second"}>Secondary</Button>
                            <Button type={"danger"}>Danger</Button>
                            <Button type={"info"}>Info</Button>
                            <Button type={"warning"}>Warning</Button>
                            <Button disabled>禁用</Button>
                        </Space>
                    </React.Fragment>}
                    title={"按钮类型"}
                    description={"按钮有六种类型：主按钮、次按钮、危险按钮、提示按钮、警告按钮、禁用按钮。主按钮在同一个操作区域最多出现一次。"}
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
}

export default ButtonPage;