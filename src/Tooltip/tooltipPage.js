import React from 'react';
import Layout from '../layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Textlayout from '../components/text/Textlayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Tooltip from '../Tooltip';
import Button from '../ButtonBase';
import TooltipM from '@material-ui/core/Tooltip';
import { Tooltip as TooltipA } from 'antd';
const text = "asdasd";

const buttonWidth = 70;
class Page extends React.Component {

    state = {

    }

    render() {

        const { } = this.state;

        return (
            <Layout >
                <Title>Tooltip</Title>
                <Description>页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。</Description>
                <SubTitle>何时使用</SubTitle>

                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Tooltip title="prompt text" arrow visible>
                            <span>Tooltip will show on mouse enter.</span>
                        </Tooltip>
                        
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"一个简单的 loading 状态。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"tooltip-page-demo"}
                    components={<React.Fragment>
                        <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
                            <Tooltip placement="topStart" title={text} trigger="click">
                                <Button>TL</Button>
                            </Tooltip>
                            <Tooltip placement="top" title={text}>
                                <Button>Top</Button>
                            </Tooltip>
                            <Tooltip placement="topEnd" title={text} >
                                <Button>TR</Button>
                            </Tooltip>
                        </div>
                        <div style={{ width: buttonWidth, float: 'left' }}>
                            <Tooltip placement="leftStart" title={text} animation="fade"> 
                                <Button>LT</Button>
                            </Tooltip>
                            <Tooltip placement="left" title={text} >
                                <Button>Left</Button>
                            </Tooltip>
                            <Tooltip placement="leftEnd" title={text} >
                                <Button>LB</Button>
                            </Tooltip>
                        </div>
                        <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
                            <Tooltip placement="rightStart" title={text}>
                                <Button>RT</Button>
                            </Tooltip>
                            <Tooltip placement="right" title={text}>
                                <Button>Right</Button>
                            </Tooltip>
                            <Tooltip placement="rightEnd" title={text}>
                                <Button>RB</Button>
                            </Tooltip>
                        </div>
                        <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }} >
                            <Tooltip placement="bottomStart" title={text} >
                                <Button>BL</Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title={text} >
                                <Button>Bottom</Button>
                            </Tooltip>
                            <Tooltip placement="bottomEnd" title={text} >
                                <Button>BR</Button>
                            </Tooltip>
                        </div>
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