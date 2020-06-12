import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Select from './index';
import DescriptionTable from '../components/text/DescriptionTable';
import TextLayout from '../components/text/TextLayout';
import Space from '../Space';
import Input from '../Input/index';
import { Select as SelectA } from 'antd';

const { Option } = Select;
//import  Notification from 'rc-notification';

const Page = () => {




    return (
        <Layout >
            <Title>Select</Title>
            <Description>页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。</Description>
            <SubTitle>何时使用</SubTitle>

            <SubTitle>代码演示</SubTitle>
            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Space>

                        <Select defaultValue="lucy" onChange={(value) => console.log(`selected:${value}`)}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>

                        </Select>
                        <Select defaultValue="lucy" disabled>
                            <Option value="lucy">Lucy</Option>
                        </Select>

                        <Select defaultValue="lucy" loading>
                            <Option value="lucy">Lucy</Option>
                        </Select>

                        <Select defaultValue="lucy" allowClear>
                            <Option value="lucy">Lucy</Option>
                        </Select>

                    </Space>
                </React.Fragment>}
                title={"基本用法"}
                description={"一个简单的 loading 状态。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Space>

                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={(value) => console.log(`selected:${value}`)}
                            filterOption={(input, options) =>  {
                                    return options.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 
                            }}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>

                    </Space>
                </React.Fragment>}
                title={"基本用法"}
                description={"一个简单的 loading 状态。"}
            ></TextLayout>


            <SubTitle>API</SubTitle>
            <Description>通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled。</Description>
            <Description>Select</Description>
            <DescriptionTable
                columns={[
                    { title: "属性", dataIndex: "attr" },
                    { title: "说明", dataIndex: "description" },
                    { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                    { title: "默认值", dataIndex: "default" }
                ]}
                dataSource={[
                    { attr: "children", description: "孩子节点", type: "node", default: "false" },
                ]}
            />

        </Layout>
    )

}

export default Page;