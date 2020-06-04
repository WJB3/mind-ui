import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Space from '../Space';
import Button from '../ButtonBase';
import Modal from './index';
//import Popper from '../_utils/demo';
//import  Notification from 'rc-notification';

class Page extends React.Component {

    state = {
        visible: false,
        visible2: false,
        visible3: false,
    }

    componentDidMount() {

    }

    render() {

        const { visible, visible2, visible3 } = this.state;

        return (
            <Layout >
                <Title>Modal对话框</Title>
                <Description>模态对话框。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。</Description>
                <Description>另外当需要一个简洁的确认框询问用户时，可以使用 Modal.confirm() 等语法糖方法。</Description>
                <SubTitle>代码演示</SubTitle>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space size={"large"}>
                            <Button type="primary" onClick={() => this.setState({ visible: !visible })}>弹窗</Button>
                            <Modal
                                visible={visible}
                                title="Basic Title"
                                onCancel={(event) => this.setState({ visible: false })}
                                onOk={() => this.setState({ visible: false })}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Space>
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"一个简单的 loading 状态。"}
                ></TextLayout>


                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space size={"large"}>
                            <Button type="primary" onClick={() => this.setState({ visible2: !visible2 })}>弹窗</Button>
                            <Modal
                                visible={visible2}
                                title="Basic Title"
                                onCancel={() => this.setState({ visible2: false })}
                                onOk={() => this.setState({ visible2: false })}
                                mask={false}

                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Space>
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"一个简单的 loading 状态。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space size={"large"}>
                            <Button type="primary" onClick={() => this.setState({ visible3: !visible3 })}>弹窗</Button>
                            <Modal
                                visible={visible3}
                                title="Basic Title"
                                onCancel={() => this.setState({ visible3: false })}
                                onOk={() => this.setState({ visible3: false })}
                                mask={false}
                                zIndex={2000}
                                okText={"ok"}
                                cancelText={"cancel"}
                                maskClosable={false}
                                keyboard
                                confirmLoading
                                centered
                                afterClose={() => { console.log("modal完全关闭") }}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Space>
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"一个简单的 loading 状态。"}
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

export default Page;