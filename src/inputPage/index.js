import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from './../components/button/index';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Input from './../components/input';
import Icon from './../components/icon';


class Page extends React.Component {


    render() {


        return (
            <Layout >
                <Title>Input输入框</Title>
                <Description>通过鼠标或键盘输入内容，是最基础的表单域的包装。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>需要用户输入表单域内容时。提供组合型输入框，带搜索的输入框，还可以进行大小选择。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Input placeholder="基础" />
                            <Input placeholder="请输入姓名" float />
                            <Input placeholder="输入长度最大为10个字符" maxLength={10} />
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"设置float可浮动placeholder,通过设置maxLength实现输入最大长度"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Input placeholder="请输入姓名" float />
                            <Input placeholder="请输入姓名" float stylize="filled" />
                            <Input placeholder="请输入姓名" float />
                        </div>
                    </React.Fragment>}
                    title={"stylize设置。"}
                    description={"设置stylize可实现输入框风格，默认风格为normal"}
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