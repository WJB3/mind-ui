import React from 'react';
import Layout from '../layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Textlayout from '../components/text/Textlayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Skeleton from './index';
import { Tree as ATree } from 'antd';

const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
            },
        ],
    },
];
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
                <Title>Tree树形控件</Title>
                <Description>在多层次的结构列表。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用 树控件 可以完整展现其中的层级关系，并具有展开收起选择等交互功能。</Description>

                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>

                        <ATree
                            treeData={treeData}
                        />

                        <ATree
                            treeData={treeData}
                        />
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"最简单的占位效果。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Skeleton avatar={{ size: 40 }} paragraph={{ rows: 5 }} />
                    </React.Fragment>}
                    title={"更复杂的组合"}
                    description={"更复杂的组合。"}
                ></Textlayout>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Skeleton avatar={{ size: 40 }} paragraph={{ rows: 5 }} animation={"pulse"} />
                        <br />
                        <Skeleton avatar={{ size: 40 }} paragraph={{ rows: 5 }} animation={"wave"} />
                    </React.Fragment>}
                    title={"更复杂的组合"}
                    description={"更复杂的组合。"}
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