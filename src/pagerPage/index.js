import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Pager from './../components/pager';


class Page extends React.Component {


    render() {


        return (
            <Layout >
                <Title>Pager纸张</Title>
                <Description>应用程序的的背景类似纸张一样平坦、不透明，而其行为也像纸张一样。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>需要用户输入表单域内容时。提供组合型输入框，带搜索的输入框，还可以进行大小选择。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    layoutStyle={{ backgroundColor: "#f5f5f5" }}
                    componentClassName={"pager-page-demo"}
                    components={<React.Fragment>
                        <Pager />
                        <Pager deep={2} />
                        <Pager deep={4} />
                        <Pager deep={6} />
                        <Pager deep={8} />
                        <Pager deep={10} />
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"基本使用。"}
                ></Textlayout>

                <Textlayout
                    layoutStyle={{ backgroundColor: "#f5f5f5" }}
                    componentClassName={"pager-page-demo"}
                    components={<React.Fragment>
                        <Pager style={{width:"300px",height:"300px"}} />
                        <Pager style={{width:"100px",height:"100px"}} deep={2}/>
                        <Pager style={{width:"200px",height:"200px",backgroundColor:"yellow"}} deep={4}/>
                        <Pager style={{width:"200px",height:"200px",backgroundColor:"red"}} deep={6}/>
                        <Pager style={{width:"200px",height:"200px",backgroundColor:"blue"}} deep={8}/>
                        <Pager style={{width:"200px",height:"200px",backgroundColor:"skyblue"}} deep={10}/>
                    </React.Fragment>}
                    title={"自定义className类名和style样式。"}
                    description={"自定义className类名和style样式。"}
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