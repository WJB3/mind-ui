import React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from '../ButtonBase/index';
import Icon from './../components/icon/index';
import TextLayout from './../components/text/TextLayout';
import DescriptionTable from './../components/text/DescriptionTable';
import notification from './../components/notification';
//import  Notification from 'rc-notification';

const Page = () => {


    handleClickDemoOne = () => {
        notification.open({
            backgroundColor: "rgba(171,237,216,1)",
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        })
    }

    handleClickDemoTwo_1 = () => {
        notification.open({
            message: 'Notification Title',
            description:
                '弹窗将在4秒后关闭',
        })
    }

    handleClickDemoTwo_2 = () => {
        notification.open({
            message: 'Notification Title',
            description:
                '弹窗永不关闭',
            duration: null
        })
    }

    handleClickDemoThree = (type) => {
        notification[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',

        })
    }

    handleClickDemoFour = () => {
        notification.open({
            message: 'Notification Title',
            description:
                '弹窗永不关闭',
            duration: null,
            icon: <Icon name={"car"} size={22} color={"red"} />
        })
    }

    handleClickDemoFive = () => {
        let key = "demofive";
        notification.open({
            message: 'Notification Title',
            description:
                '自定义图标',
            icon: <Icon name={"car"} size={22} color={"red"} />,
            key,
            duration: null,
            btn: (
                <Button type="danger" size="small" onClick={() => { notification.close(key) }}>关闭</Button>
            )
        })
    }

    handleClickDemoSix = () => {
        notification.open({
            message: 'Notification Title',
            description:
                '自定义样式',
            duration: null,
            icon: <Icon name={"car"} size={22} color={"red"} />,
            style: {
                width: "600px",
                marginLeft: 384 - 600 + "px"
            },
        })
    }

    handleClickDemoSeven = (placement) => {

        notification.open({
            message: 'Notification Title',
            description:
                '弹窗永不关闭',
            duration: null,
            btn: (
                <Button type="danger" size="small" >关闭</Button>
            ),
            placement,
            onClose: () => {
            }
        })
    }

    handleClickDemoEight = () => {
        const key = "updatable";
        notification.open({
            key,
            message: 'Notification Title',
            description: 'description.',

        });
        setTimeout(() => {
            notification.open({
                key,
                message: 'New Title',
                description: 'New description.',
            });
        }, 1000);
    }




    return (
        <Layout >
            <Title>Notification通知提醒框</Title>
            <Description>全局展示通知提醒信息。</Description>
            <SubTitle>何时使用</SubTitle>
            <Description>在系统四个角显示通知提醒信息。经常用于以下情况：</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                components={<React.Fragment>
                    <Button type={"primary"} onClick={() => { this.handleClickDemoOne() }}>Open the notification box</Button>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法，4 秒后自动关闭。可设置弹框背景色。"}
            ></TextLayout>

            <TextLayout
                components={<React.Fragment>
                    <Button type={"primary"} onClick={() => { this.handleClickDemoTwo_1() }}>默认4s后延时</Button>
                    <Button type={"primary"} onClick={() => { this.handleClickDemoTwo_2() }}>不关闭弹框</Button>
                </React.Fragment>}
                title={"自动关闭的延时"}
                description={"自定义通知框自动关闭的延时，默认4s,取消自动关闭只要将该值设置为null即可。"}
            ></TextLayout>

            <TextLayout
                components={<React.Fragment>
                    <Button onClick={() => { this.handleClickDemoThree("success") }}>
                        <Icon name={"success"} size={22} style={{ marginRight: "8px", color: "rgba(107,198,0,1)" }} />成功框
                        </Button>
                    <Button onClick={() => { this.handleClickDemoThree("info") }}>
                        <Icon name={"info"} size={22} style={{ marginRight: "8px", color: "rgba(171,237,216,1)" }} /> 提示框
                        </Button>
                    <Button onClick={() => { this.handleClickDemoThree("error") }}>
                        <Icon name={"error"} size={22} style={{ marginRight: "8px", color: "rgba(255,46,99,1)" }} />错误框
                        </Button>
                    <Button onClick={() => { this.handleClickDemoThree("warning") }}>
                        <Icon name={"info"} size={22} style={{ marginRight: "8px", color: "rgba(252,227,138,1)" }} />警告框
                        </Button>
                </React.Fragment>}
                title={"自动关闭的延时"}
                description={"自定义通知框自动关闭的延时，默认4s,取消自动关闭只要将该值设置为null即可。"}
            ></TextLayout>

            <TextLayout
                components={<React.Fragment>
                    <Button onClick={() => { this.handleClickDemoFive() }} type={"primary"}>
                        自定义关闭按钮
                        </Button>
                </React.Fragment>}
                title={"自定义按钮"}
                description={"自定义关闭按钮的样式和文字。"}
            ></TextLayout>


            <TextLayout
                components={<React.Fragment>
                    <Button onClick={() => { this.handleClickDemoSix() }} type={"primary"}>
                        自定义样式
                        </Button>

                </React.Fragment>}
                title={"自定义样式"}
                description={"使用 style 和 className 来定义样式。"}
            ></TextLayout>

            <TextLayout
                components={<React.Fragment>
                    <Button type={"primary"} onClick={() => { this.handleClickDemoSeven("left-top") }}>
                        <Icon name={"left-top"} size={18} color={"rgba(255,255,255,1)"} style={{ marginRight: "8px" }} />左上角
                        </Button>
                    <Button type={"primary"} onClick={() => { this.handleClickDemoSeven("right-top") }}>
                        <Icon name={"right-top"} size={18} color={"rgba(255,255,255,1)"} style={{ marginRight: "8px" }} />右上角
                        </Button>
                    <Button type={"primary"} onClick={() => { this.handleClickDemoSeven("left-bottom") }}>
                        <Icon name={"left-bottom"} size={18} color={"rgba(255,255,255,1)"} style={{ marginRight: "8px" }} />左下角
                        </Button>
                    <Button type={"primary"} onClick={() => { this.handleClickDemoSeven("right-bottom") }}>
                        <Icon name={"right-bottom"} size={18} color={"rgba(255,255,255,1)"} style={{ marginRight: "8px" }} />右下角
                        </Button>

                </React.Fragment>}
                title={"自定义图标"}
                description={"图标可以被自定义。"}
            ></TextLayout>

            <TextLayout
                components={<React.Fragment>
                    <Button onClick={() => { this.handleClickDemoEight() }} type={"primary"}>
                        1s后更新提示框
                        </Button>

                </React.Fragment>}
                title={"更新消息内容"}
                description={"可以通过唯一的 key 来更新内容。"}
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

export default Page;