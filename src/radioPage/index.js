import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Button from './../components/button';
import Radio from './../components/radio';
import Input from './../components/input';
const radioStyle={
    display: 'block',
    height: '30px',
    lineHeight: '30px',
}


class Page extends React.Component {

    handleChangeRadioOne = (flag) => {

    }

    state = {
        disabled2: true,
        fourvalue:1
    }

    handleChangeRadioThree = (value) => {

    }

    
    render() {

        const {fourvalue}=this.state;

        return (
            <Layout >
                <Title>Radio单选框</Title>
                <Description>单选框。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>用于在多个备选项中选中单个状态。</Description>
                <Description>和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Radio onChange={this.handleChangeRadioOne} >选中</Radio>
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Radio defaultChecked={false} disabled={this.state.disabled2}>
                                Disabled
                            </Radio>
                            <br />
                            <Radio defaultChecked disabled={this.state.disabled2}>
                                Disabled
                            </Radio>
                            <Button type="primary" onClick={() => { this.setState({ disabled2: !this.state.disabled2 }) }}  >
                                Toggle disabled
                            </Button>
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>

                        <Radio.Group onChange={this.handleChangeRadioThree} value={1}>
                            <Radio value={1}>A</Radio>
                            <Radio value={2}>B</Radio>
                            <Radio value={3}>C</Radio>
                            <Radio value={4}>D</Radio>
                        </Radio.Group>
                    </React.Fragment>}
                    title={"单选组合。"}
                    description={"一组互斥的 Radio 配合使用。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                            <Radio.Group onChange={(value)=>this.setState({fourvalue:value})} value={fourvalue}>
                                <Radio style={radioStyle} value={1}>
                                    Option A
                                </Radio>
                                <Radio style={radioStyle} value={2}>
                                    Option B
                                </Radio>
                                <Radio style={radioStyle} value={3}>
                                    Option C
                                </Radio>
                                <Radio style={radioStyle} value={4}>
                                    <div>More...</div>
                                    {fourvalue === 4 ? <div onClick={(e)=>e.stopPropagation()}><Input style={{ width: 100, marginLeft: 10 }} /></div> : null}
                                </Radio>
                            </Radio.Group>
                    
                    </React.Fragment>}
                    title={"Radio.Group 垂直。"}
                    description={"垂直的 Radio.Group，配合更多输入框选项。"}
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