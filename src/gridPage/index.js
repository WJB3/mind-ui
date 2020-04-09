import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from './../components/button/index';
import Icon from './../components/icon/index';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Row from './../components/row';
import Col from './../components/col';

class ButtonPage extends React.Component {


    render() {


        return (
            <Layout >
                <Title>Grid栅格</Title>
                <Description>24 栅格系统。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>在多数业务情况下，需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    components={<React.Fragment>
                        <Row>
                            <Col span={24}>col-24</Col>
                        </Row>
                        <Row>
                            <Col span={12}>col-12</Col>
                            <Col span={12}>col-12</Col>
                        </Row>
                        <Row>
                            <Col span={8}>col-8</Col>
                            <Col span={8}>col-8</Col>
                            <Col span={8}>col-8</Col>

                        </Row>
                        <Row>
                            <Col span={6}>col-6</Col>
                            <Col span={6}>col-6</Col>
                            <Col span={6}>col-6</Col>
                            <Col span={6}>col-6</Col>
                        </Row>
                    </React.Fragment>}
                    title={"基础栅格"}
                    description={"从堆叠到水平排列。使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <Row gutter={16}>
                            <Col  span={6}>
                                <div  >col-6</div>
                            </Col>
                            <Col span={6}>
                                <div  >col-6</div>
                            </Col>
                            <Col  span={6}>
                                <div  >col-6</div>
                            </Col>
                            <Col  span={6}>
                                <div  >col-6</div>
                            </Col>
                        </Row>
                    </React.Fragment>}
                    title={"区块间隔"}
                    description={"栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性，我们推荐使用 (16+8n)px 作为栅格间隔。(n 是自然数)如果要支持响应式，可以写成 { xs: 8, sm: 16, md: 24, lg: 32 }。如果需要垂直间距，可以写成数组形式 [水平间距, 垂直间距] [16, { xs: 8, sm: 16, md: 24, lg: 32 }]。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <Button type={"primary"} flat size={"large"}>Primary</Button>
                        <Button type={"second"} flat>Secondary</Button>
                        <Button type={"danger"} flat>Danger</Button>
                        <Button type={"info"} flat>Info</Button>
                        <Button type={"warning"} flat>Warning</Button>
                        <Button disabled flat>禁用</Button>
                    </React.Fragment>}
                    title={"按钮扁平"}
                    description={"用于通用功能和减少分层在屏幕上,使其更具可读性。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <Button type={"primary"} shape={"circle"} size={"small"} flat>小</Button>
                        <Button type={"danger"} shape={"circle"} flat >中</Button>
                        <Button type={"warning"} shape={"circle"} size={"large"} flat>大</Button>
                        <Button type={"primary"} shape={"round"} size={"small"} >小</Button>
                        <Button type={"second"} shape={"round"}>中</Button>
                        <Button type={"danger"} shape={"round"} size={"large"} flat>大</Button>

                    </React.Fragment>}
                    title={"按钮形状"}
                    description={"通过设置 shape 为 circle 或者round（正方形）。设置icon为按钮的图标类型。此属性只适合单个字，多个字会有问题。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <Button type={"primary"} float>Primary</Button>
                        <Button type={"second"} float>Secondary</Button>
                        <Button type={"danger"} float>Danger</Button>
                        <Button type={"info"} float>Info</Button>
                        <Button type={"warning"} float>Warning</Button>
                    </React.Fragment>}
                    title={"图标按钮"}
                    description={"通过设置icon来生成具有单个图标的按钮。仅适合单个图标属性。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <Button type={"primary"} float icon="add" shape="circle" ></Button>
                        <Button type={"second"} size={"large"} float icon="car" shape="round" iconStyle={{ color: "black", fontSize: 32 }}></Button>
                        <Button type={"warning"} float >
                            <Icon name={"edit"} size={16} style={{ marginRight: "8px" }} /> 编辑
                        </Button>
                        <Button type={"danger"} float>
                            删除<Icon name={"delete"} size={16} style={{ marginLeft: "8px" }} />
                        </Button>

                    </React.Fragment>}
                    title={"按钮浮动"}
                    description={"通过设置float来决定按钮是否悬浮，通常被用来作为网站的全局按钮操作。"}
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