import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Skeleton from './index';


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
                <Title>Skeleton骨架屏</Title>
                <Description>在需要等待加载内容的位置提供一个占位图形组合。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>网络较慢，需要长时间等待加载处理的情况下。</Description>
                <Description>图文信息内容较多的列表/卡片中。</Description>
                <Description>只在第一次加载数据的时候使用。</Description>
                <Description>可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。</Description>
                <SubTitle>代码演示</SubTitle>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>

                        <Skeleton />


                    </React.Fragment>}
                    title={"基本用法"}
                    description={"最简单的占位效果。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Skeleton avatar={{ size: 40 }} paragraph={{ rows: 5 }} />
                    </React.Fragment>}
                    title={"更复杂的组合"}
                    description={"更复杂的组合。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Skeleton avatar={{ size: 40 }} paragraph={{ rows: 5 }} animation={"pulse"}/>
                        <br />
                        <Skeleton avatar={{ size: 40 }} paragraph={{ rows: 5 }} animation={"wave"}/>
                    </React.Fragment>}
                    title={"更复杂的组合"}
                    description={"更复杂的组合。"}
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

export default Page;