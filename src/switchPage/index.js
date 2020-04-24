import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Radio from './../Radio';
import Switch from './../Switch';
import Button from '../ButtonBase';


class Page extends React.Component {

    state = {
        disabled: true
    }

    render() {


        return (
            <Layout >
                <Title>Switch开关</Title>
                <Description>开关选择器。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>需要表示开关状态/两种状态之间的切换时。</Description>
                <Description>和 checkbox的区别是，切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Switch defaultChecked onChange={(event, checked) => {   }} />
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <Switch disabled={this.state.disabled} defaultChecked />
                        <br />
                        <Button type="primary" onClick={() => this.setState({ disabled: !this.state.disabled })}>
                            Toggle disabled
                        </Button>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                        <br />
                        <Switch checkedChildren="1" unCheckedChildren="0" />
                        <br />
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
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