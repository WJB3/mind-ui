import React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import TextLayout from './../components/text/TextLayout';
import DescriptionTable from './../components/text/DescriptionTable';
import InputNumber from './index';
import Button from '../ButtonBase';

import { Input as InputA } from 'antd';
const { TextArea } = InputA;

class Page extends React.Component {

    state = {
        disabled: false
    }

    render() {


        return (
            <Layout >
                <Title>InputNumber输入框</Title>
                <Description>通过鼠标或键盘输入内容，是最基础的表单域的包装。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>需要用户输入表单域内容时。提供组合型输入框，带搜索的输入框，还可以进行大小选择。</Description>
                <SubTitle>代码演示</SubTitle>

                <TextLayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <InputNumber min={1} max={10} defaultValue={3} step={0.05} />
                            <InputNumber min={1} max={10} defaultValue={3} border style={{ width: 200 }} />
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"有border与不border2种形式"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <InputNumber border size="large" min={1} max={100000} defaultValue={3} onChange={(e) => console.log(e)} />
                            <InputNumber border min={1} max={100000} defaultValue={3} onChange={(e) => console.log(e)} />
                            <InputNumber border size="small" min={1} max={100000} defaultValue={3} onChange={(e) => console.log(e)} />
                        </div>
                    </React.Fragment>}
                    title={"三种大小。"}
                    description={"三种大小的数字输入框，当 size 分别为 large 和 small 时，输入框高度为 40px 和 24px ，默认高度为 32px。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <InputNumber min={1} max={10} disabled={this.state.disabled} defaultValue={3} />
                            <InputNumber border min={1} max={10} disabled={this.state.disabled} defaultValue={3} />
                        </div>
                        <div>
                            <Button onClick={() => this.setState({ disabled: !this.state.disabled })} type="primary">
                                Toggle disabled
                            </Button>
                        </div>
                    </React.Fragment>}
                    title={"三种大小。"}
                    description={"三种大小的数字输入框，当 size 分别为 large 和 small 时，输入框高度为 40px 和 24px ，默认高度为 32px。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <InputNumber min={-10} max={10} step={0.1} onChange={(e) => console.log(e)} />
                            <InputNumber border min={0} max={10} step={0.1} onChange={(e) => console.log(e)} />
                        </div>
                    </React.Fragment>}
                    title={"小数。"}
                    description={"和原生的数字输入框一样，value 的精度由 step 的小数位数决定。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <InputNumber
                                defaultValue={1000}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                onChange={(e) => console.log(e)}
                            />
                            <InputNumber
                                defaultValue={100}
                                min={0}
                                max={100}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                onChange={(e) => console.log(e)}
                            />
                        </div>
                    </React.Fragment>}
                    title={"格式化展示。"}
                    description={"通过 formatter 格式化数字，以展示具有具体含义的数据，往往需要配合 parser 一起使用。"}
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

            </Layout >
        )
    }
}

export default Page;