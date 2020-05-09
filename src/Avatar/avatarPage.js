import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Avatar from './index';
import Space from '../Space';
import Icon from '../components/icon';
import Badge from '../Badge';

class Page extends React.Component {


    render() {

        return (
            <Layout >
                <Title>Avatar头像</Title>
                <Description>用来代表用户或事物，支持图片、图标或字符展示。</Description>


                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space size={"large"} direction={"vertical"}>
                            <Space size={"large"}>
                                <Avatar size={64} icon={<Icon name={"person"} size={30} />} />
                                <Avatar size={"large"} icon={<Icon name={"person"} />} />
                                <Avatar icon={<Icon name={"person"} />} />
                                <Avatar size={"small"} icon={<Icon name={"person"} />} />
                            </Space>
                            <Space size={"large"}>
                                <Avatar shape="square" size={64} icon={<Icon name={"person"} size={30} />} />
                                <Avatar shape="square" size={"large"} icon={<Icon name={"person"} />} />
                                <Avatar shape="square" icon={<Icon name={"person"} />} />
                                <Avatar shape="square" size={"small"} icon={<Icon name={"person"} />} />
                            </Space>
                        </Space>
                    </React.Fragment>}
                    title={"基本"}
                    description={"最简单的用法。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>

                        <Space size={"large"}>
                            <Avatar icon={<Icon name={"person"} />} />
                            <Avatar>吴</Avatar>
                            <Avatar>USER</Avatar>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar
                                style={{
                                    color: '#f56a00',
                                    backgroundColor: '#fde3cf',
                                }}
                            >
                                U
                            </Avatar>
                            <Avatar
                                style={{
                                    backgroundColor: '#87d068',
                                }}
                                icon={<Icon name={"person"} />}
                            />
                        </Space>

                    </React.Fragment>}
                    title={"基本"}
                    description={"最简单的用法。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>

                        <Space size={"large"}>
                            <Badge count={1}>
                                <Avatar shape="square" icon={<Icon name={"eye"} />} />
                            </Badge>
                            <Badge dot>
                                <Avatar shape="square" icon={<Icon name={"eye-off"} />} />
                            </Badge>
                        </Space>

                    </React.Fragment>}
                    title={"基本"}
                    description={"最简单的用法。"}
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