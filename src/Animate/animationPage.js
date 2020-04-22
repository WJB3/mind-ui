import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Pager from './../components/pager';
import { Fold, Fade, Zoom } from './index';
import Button from '../ButtonBase';


class Page extends React.Component {

    state = {
        foldIn: false,
        fadeIn: false,
        zoomIn:false
    }

    render() {


        return (
            <Layout >
                <Title>过渡动画</Title>
                <SubTitle>何时使用</SubTitle>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    layoutStyle={{ backgroundColor: "#f5f5f5" }}
                    componentClassName={"pager-page-demo"}
                    components={<React.Fragment>

                        <Button type="primary" onClick={() => { this.setState({ foldIn: !this.state.foldIn }) }}>点击展示</Button>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Fold in={this.state.foldIn}>
                                <Pager deep={2} />
                            </Fold>
                            <Fold in={this.state.foldIn} foldHeight={"30px"}>
                                <Pager deep={4} />
                            </Fold>
                            <Pager deep={6} />
                        </div>
                    </React.Fragment>}
                    title={"折叠"}
                    description={"折叠"}
                ></Textlayout>

                <Textlayout
                    layoutStyle={{ backgroundColor: "#f5f5f5" }}
                    componentClassName={"pager-page-demo"}
                    components={<React.Fragment>

                        <Button type="primary" onClick={() => this.setState({ fadeIn: !this.state.fadeIn })}>点击展示</Button>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Fade in={this.state.fadeIn}>
                                <Pager deep={2} />
                            </Fade>
                            <Fade in={this.state.fadeIn} foldHeight={"30px"}>
                                <Pager deep={4} />
                            </Fade>
                            <Pager deep={6} />
                        </div>
                    </React.Fragment>}
                    title={"fade"}
                    description={"消失/展示渐隐"}
                ></Textlayout>

                <Textlayout
                    layoutStyle={{ backgroundColor: "#f5f5f5" }}
                    componentClassName={"pager-page-demo"}
                    components={<React.Fragment>

                        <Button type="primary" onClick={() => this.setState({ zoomIn: !this.state.zoomIn })}>点击展示</Button>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Zoom in={this.state.zoomIn}>
                                <Pager deep={2} />
                            </Zoom>
                            <Zoom in={this.state.zoomIn}  >
                                <Pager deep={4} />
                            </Zoom>
                            <Pager deep={6} />
                        </div>
                    </React.Fragment>}
                    title={"fade"}
                    description={"消失/展示渐隐"}
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