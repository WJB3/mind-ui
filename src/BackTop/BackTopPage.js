import React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from '../ButtonBase';
import BackTop from './index';
import TextLayout from './../components/text/TextLayout';
import DescriptionTable from './../components/text/DescriptionTable';
//import  Notification from 'rc-notification';
const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};
class ButtonPage extends React.Component {


    render() {

        return (
            <Layout >
                <Title>BackTop回到顶部</Title>
                <Description>返回页面顶部的操作按钮。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>当页面内容区域比较长时。</Description>
                <SubTitle>代码演示</SubTitle>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        Scroll down to see the bottom-right button.
                        <BackTop visibilityHeight={100} />
                    </React.Fragment>}
                    title={"基本"}
                    description={"最简单的用法。"}
                ></TextLayout>

                {/* <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <div style={{ height: '600vh', padding: 8 }} ref={ref=>this.ScrollRef=ref}>
                            <div>Scroll to bottom</div>
                            <div>Scroll to bottom</div>
                            <div>Scroll to bottom</div>
                            <div>Scroll to bottom</div>
                            <div>Scroll to bottom</div>
                            <div>Scroll to bottom</div>
                            <div>Scroll to bottom</div>
                            <BackTop target={this.ScrollRef}>
                               
                            </BackTop>
                        </div>
                    </React.Fragment>}
                    title={"自定义样式"}
                    description={"可以自定义回到顶部按钮的样式，限制宽高：40px * 40px。"}
                ></TextLayout> */}


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