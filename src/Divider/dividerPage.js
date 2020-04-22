import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Divider from './index';
//import  Notification from 'rc-notification';

class ButtonPage extends React.Component {


    render() {

        return (
            <Layout >
                <Title>Divider</Title>
                <Description>设置组件之间的间距。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>避免组件紧贴在一起，拉开统一的空间。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                            </p>
                            <Divider />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                            </p>
                            <Divider dashed />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                            </p>
                        </div>
                    </React.Fragment>}
                    title={"水平分割线"}
                    description={"默认为水平分割线，可在中间加入文字。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                            </p>
                            <Divider>Text</Divider>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                            </p>
                            <Divider orientation="left">Left Text</Divider>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                            </p>
                            <Divider orientation="right">Right Text</Divider>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                            </p>
                        </div>
                    </React.Fragment>}
                    title={"水平分割线"}
                    description={"默认为水平分割线，可在中间加入文字。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <div>
                            Text
                            <Divider type="vertical" />
                            <a href="#">Link</a>
                            <Divider type="vertical" />
                            <a href="#">Link</a>
                        </div>
                    </React.Fragment>}
                    title={"水平分割线"}
                    description={"默认为水平分割线，可在中间加入文字。"}
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

export default ButtonPage;