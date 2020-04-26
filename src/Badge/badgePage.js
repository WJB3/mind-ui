import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import Icon from '../components/icon';
import Space from '../Space';
import DescriptionTable from './../components/text/DescriptionTable';
import Badge from './index';
//import  Notification from 'rc-notification';

class ButtonPage extends React.Component {


    render() {

        return (
            <Layout >
                <Title>BackTop回到顶部</Title>
                <Description>返回页面顶部的操作按钮。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>当页面内容区域比较长时。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space size={"large"}>
                            <Badge count={9}>
                                <Icon name="email"></Icon>
                            </Badge>
                            <Badge count={0} showZero>
                                <Icon name="email"></Icon>
                            </Badge>
                            <Badge count={<Icon name={"error"} />}>
                                <Icon name="email"></Icon>
                            </Badge>
                        </Space>
                    </React.Fragment>}
                    title={"基本"}
                    description={"简单的徽章展示，当 count 为 0 时，默认不显示，但是可以使用 showZero 修改为显示。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space size="large">
                            <Badge count={25} />
                            <Badge count={4} className="site-badge-count-4" />
                            <Badge className="site-badge-count-109" count={109} style={{ backgroundColor: '#52c41a' }} />
                        </Space>
                    </React.Fragment>}
                    title={"独立使用"}
                    description={"不包裹任何元素即是独立使用，可自定样式展现。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space size="large">
                            <Badge count={99}>
                                <Icon name="shopcar"></Icon>
                            </Badge>
                            <Badge count={100}>
                                <Icon name="shopcar"></Icon>
                            </Badge>
                            <Badge count={99} overflowCount={10}>
                                <Icon name="shopcar"></Icon>
                            </Badge>
                            <Badge count={1000} overflowCount={999}>
                                <Icon name="shopcar"></Icon>
                            </Badge>
                        </Space>
                    </React.Fragment>}
                    title={"独立使用"}
                    description={"不包裹任何元素即是独立使用，可自定样式展现。"}
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