import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Row from '../components/row';
import Col from '../components/col';

class ButtonPage extends React.Component {


    render() {

        const gutterStyle = {
            padding: "8px 0px",
            background: 'rgba(8,217,214,0.8)',
            borderRadius: "4px"
        }

        return (
            <Layout >
                <Title>Grid栅格</Title>
                <Description>24 栅格系统。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>在多数业务情况下，需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。</Description>
                <SubTitle>代码演示</SubTitle>

                <TextLayout
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
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Row gutter={16}>
                            <Col span={6}>
                                <div style={gutterStyle}>col-6</div>
                            </Col>
                            <Col span={6}>
                                <div style={gutterStyle} >col-6</div>
                            </Col>
                            <Col span={6}>
                                <div style={gutterStyle}>col-6</div>
                            </Col>
                            <Col span={6}>
                                <div style={gutterStyle} >col-6</div>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xxl: 200 }}>
                            <Col span={8}>
                                <div style={gutterStyle}>col-6</div>
                            </Col>
                            <Col span={8}>
                                <div style={gutterStyle} >col-6</div>
                            </Col>
                            <Col span={8}>
                                <div style={gutterStyle}>col-6</div>
                            </Col>

                        </Row>
                    </React.Fragment>}
                    title={"区块间隔"}
                    description={"栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性，我们推荐使用 (16+8n)px 作为栅格间隔。(n 是自然数)如果要支持响应式，可以写成 { xs: 8, sm: 16, md: 24, lg: 32 }。如果需要垂直间距，可以写成数组形式 [水平间距, 垂直间距] [16, { xs: 8, sm: 16, md: 24, lg: 32 }]。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Row>
                            <Col span={8}>col-8</Col>
                            <Col span={8} offset={8}>
                                col-8
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={6}>
                                col-6 col-offset-6
                            </Col>
                            <Col span={6} offset={6}>
                                col-6 col-offset-6
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} offset={6}>
                                col-12 col-offset-6
                            </Col>
                        </Row>
                    </React.Fragment>}
                    title={"左右偏移"}
                    description={"列偏移。使用 offset 可以将列向右侧偏。例如，offset={4} 将元素向右侧偏移了 4 个列（column）的宽度。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Row>
                            <Col span={18} push={6}>
                                col-18 col-push-6
                        </Col>
                            <Col span={6} pull={18}>
                                col-6 col-pull-18
                            </Col>
                        </Row>
                    </React.Fragment>}
                    title={"栅格排序"}
                    description={"列排序。通过使用 push 和 pull 类就可以很容易的改变列（column）的顺序。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Row>
                            <Col span={6} order={4}>
                                1 col-order-4
                            </Col>
                            <Col span={6} order={3}>
                                2 col-order-3
                            </Col>
                            <Col span={6} order={2}>
                                3 col-order-2
                            </Col>
                            <Col span={6} order={1}>
                                4 col-order-1
                            </Col>
                        </Row>
                    </React.Fragment>}
                    title={"排序"}
                    description={"通过 Order 来改变元素的排序。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Row justify="start">
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                        </Row>
                        <Row justify="center">
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                        </Row>
                        <Row justify="end">
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                        </Row>
                        <Row justify="space-between">
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                        </Row>
                        <Row justify="space-around">
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                            <Col span={4}>col-4</Col>
                        </Row>
                    </React.Fragment>}
                    title={"排版"}
                    description={"布局基础。子元素根据不同的值 start,center,end,space-between,space-around，分别定义其在父节点里面的排版方式。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>

                        <Row>
                            <Col flex={2}>2 / 5</Col>
                            <Col flex={3}>3 / 5</Col>
                        </Row>
                        <Row>
                            <Col flex="100px">100px</Col>
                            <Col flex="auto">Fill Rest</Col>
                        </Row>
                        <Row>
                            <Col flex="1 1 200px">1 1 200px</Col>
                            <Col flex="0 1 300px">0 1 300px</Col>
                        </Row>
                    </React.Fragment>}
                    title={"Flex 填充"}
                    description={"Col 提供 flex 属性以支持填充。"}
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

export default ButtonPage;