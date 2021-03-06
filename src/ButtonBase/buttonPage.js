import React, { Fragment } from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from './index';
import Icon from './../components/icon/index';
import TextLayout from './../components/text/TextLayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Space from '../Space';
import BackTop from '../BackTop';
//import  Notification from 'rc-notification';

class ButtonPage extends React.Component {

    constructor(props){
        super(props);
        this.state={
      
        }
    }

    handleClick=()=>{
 
    }

    componentDidMount(){
     
    }

    render() {

         


        return (
            <Fragment >

                <BackTop target={document.getElementById("layout")} />
                
                <Title>Button按钮</Title>
                <Description>按钮用于开始一个即时操作。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。</Description>
                <SubTitle>代码演示</SubTitle>
            
                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space itemStyle={{marginBottom:"8px"}}>
                            <Button  loading>default</Button>
                            <Button type={"primary"} loading>Primary</Button>
                            <Button type={"second"} loading>Secondary</Button>
                            <Button type={"danger"} loading>Danger</Button>
                            <Button type={"info"} loading>Info</Button>
                            <Button type={"warning"} loading>Warning</Button>
                            <Button disabled>禁用</Button>
                        </Space>
                    </React.Fragment>}
                    title={"按钮类型"}
                    description={"按钮有六种类型：主按钮、次按钮、危险按钮、提示按钮、警告按钮、禁用按钮。主按钮在同一个操作区域最多出现一次。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space itemStyle={{marginBottom:"8px"}}>
                            <Button size={"small"} type={"primary"} loading>small</Button>
                            <Button type={"danger"} loading>danger</Button>
                            <Button type={"second"} size={"large"} loading>Large</Button>
                        </Space>
                    </React.Fragment>}
                    title={"按钮尺寸"}
                    description={"通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space itemStyle={{marginBottom:"8px"}}>
                            <Button flat size={"large"}>Default</Button>
                            <Button type={"primary"} flat size={"large"}>Primary</Button>
                            <Button type={"second"} flat>Secondary</Button>
                            <Button type={"danger"} flat>Danger</Button>
                            <Button type={"info"} flat>Info</Button>
                            <Button type={"warning"} flat>Warning</Button>
                            <Button disabled flat>禁用</Button>
                        </Space>
                    </React.Fragment>}
                    title={"按钮扁平"}
                    description={"用于通用功能和减少分层在屏幕上,使其更具可读性。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space itemStyle={{marginBottom:"8px"}}>
                            <Button type={"primary"} shape={"circle"} size={"small"} >小</Button>
                            <Button type={"danger"} shape={"circle"} flat >中</Button>
                            <Button type={"warning"} shape={"circle"} size={"large"} flat>大</Button>
                            <Button type={"primary"} shape={"round"} size={"small"} onClick={this.handleClick}>小</Button>
                            <Button type={"second"} shape={"round"}>中</Button>
                            <Button type={"danger"} shape={"round"} size={"large"} flat>大</Button>
                        </Space>
                    </React.Fragment>}
                    title={"按钮形状"}
                    description={"通过设置 shape 为 circle 或者round（正方形）。设置icon为按钮的图标类型。此属性只适合单个字，多个字会有问题。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space itemStyle={{marginBottom:"8px"}}>
                            <Button type={"primary"} float>Primary</Button>
                            <Button type={"second"} float>Secondary</Button>
                            <Button type={"danger"} float>Danger</Button>
                            <Button type={"info"} float>Info</Button>
                            <Button type={"warning"} float>Warning</Button>
                        </Space>
                    </React.Fragment>}
                    title={"图标按钮"}
                    description={"通过设置float来决定按钮是否悬浮，通常被用来作为网站的全局按钮操作。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space itemStyle={{marginBottom:"8px"}}>
                            <Button type={"primary"} float icon="add" shape="circle" ></Button>
                            <Button type={"second"} size={"large"} float icon="car" shape="round" iconStyle={{ color: "black", fontSize: 32 }}></Button>
                            <Button type={"warning"} float >
                                <Icon name={"edit"} size={16} style={{ marginRight: "8px" }} /> 编辑
                        </Button>
                            <Button type={"danger"} float>
                                删除<Icon name={"delete"} size={16} style={{ marginLeft: "8px" }} />
                            </Button>
                        </Space>
                    </React.Fragment>}
                    title={"按钮浮动"}
                    description={"通过设置icon来生成具有单个图标的按钮。仅适合单个图标属性。"}
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

            </Fragment>
        )
    }
}

export default ButtonPage;