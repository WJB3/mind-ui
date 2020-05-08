import React from 'react';
import Layout from '../layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Textlayout from '../components/text/Textlayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Space from '../Space';
import Slide from '@material-ui/core/Slide';
import Button from '../ButtonBase';
import Paper from '@material-ui/core/Paper';
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
                <Title>Drawer抽屉</Title>
                <Description>屏幕边缘滑出的浮层面板。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。</Description>
                <Description>当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。</Description>
                <Description>当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space size={"large"}>
                            <Button type="primary" onClick={() => this.setState({ visible: !visible })}>弹窗</Button>
                            <Slide direction="left" in={visible}  mountOnEnter >
                                <Paper elevation={4} >
                                    {"AAAAAAA"}
                                </Paper>
                            </Slide>
                        </Space>
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"一个简单的 loading 状态。"}
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