import * as React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from './../components/button/index';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';

class ButtonPage extends React.Component {
    render() {
        return (
            <Layout >
                <Title>Button按钮</Title>
                <Description>按钮用于开始一个即时操作。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    components={<React.Fragment>
                        <Button>Default</Button>
                        <Button type={"primary"}>Primary</Button>
                        <Button type={"secondary"}>Secondary</Button>
                        <Button type={"dashed"}>Dashed</Button>
                        <Button type={"danger"}>Danger</Button>
                        <Button type={"warning"}>Warning</Button>
                        <Button type={"link"}>Link</Button>
                    </React.Fragment>}
                    title={"按钮类型"}
                    description={"按钮有五种类型：主按钮、次按钮、虚线按钮、危险按钮、警告按钮和链接按钮。主按钮在同一个操作区域最多出现一次。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <Button size={"small"} type={"primary"}>small</Button>
                        <Button type={"primary"}>Default</Button>
                        <Button type={"warning"} size={"large"}>Large</Button>

                    </React.Fragment>}
                    title={"按钮尺寸"}
                    description={"通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ backgroundColor: "rgb(190, 200, 200)", padding: "10px" }}>
                            <Button type={"primary"} ghost>primary ghost</Button>
                            <Button type={"danger"} ghost>danger ghost</Button>
                            <Button type={"warning"} ghost>warning ghost</Button>
                            <Button type={"link"} ghost>link ghost</Button>
                        </div>

                    </React.Fragment>}
                    title={"幽灵按钮"}
                    description={"幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。"}
                ></Textlayout>

                <SubTitle>API</SubTitle>
                <Description>通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled。</Description>
                <Description>按钮的属性说明如下：</Description>
                <DescriptionTable 
                    columns={[
                        {title:"属性",dataIndex:"attr"},
                        {title:"说明",dataIndex:"description"},
                    {title:"类型",dataIndex:"type",render:(text,record)=>{return (<div style={{color:"rgba(242,49,127,1)"}}>{text}</div>)}},
                        {title:"默认值",dataIndex:"default"}
                    ]}
                    dataSource={[
                        {attr:"disabled",description:"按钮失效状态",type:"boolean",default:"false"},
                        {attr:"type",description:"设置按钮类型，可选值为 primary dashed danger link或者不设",type:"string",default:"-"},
                        {attr:"size",description:"设置按钮大小，可选值为 small large 或者不设",type:"string",default:"default"},
                        {attr:"ghost",description:"幽灵属性，使按钮背景透明",type:"boolean",default:"false"},
                    ]}
                />

            </Layout>
        )
    }
}

export default ButtonPage;