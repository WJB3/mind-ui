import React, { useRef, useState } from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Portal from './index';
import Button from '../ButtonBase';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';

//import  Notification from 'rc-notification';
const portalPage = () => {

    const [mount, setMount] = useState(false);

    const container = useRef(null);

    const handleClick = () => {
        setMount(!mount);
    }

    return (
        <Layout >
            <Title>Portal传送门</Title>
            <SubTitle>何时使用</SubTitle>
            <Description>传送门portal</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <Button type="button" onClick={handleClick}>
                        {mount ? '撤销传送' : '传送'}
                    </Button>

                    {mount ? (
                        <Portal container={container.current}>
                            <span>传送的节点</span>
                        </Portal>
                    ) : null}

                    <div ref={container} />

                </React.Fragment>}
                title={"基本用法"}
                description={"一个简单的 loading 状态。"}
            ></TextLayout>



            <SubTitle>API</SubTitle>
            <Description>通过设置Protal</Description>
            <Description>按钮的属性说明如下：</Description>
            <DescriptionTable
                columns={[
                    { title: "属性", dataIndex: "attr" },
                    { title: "说明", dataIndex: "description" },
                    { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                    { title: "默认值", dataIndex: "default" }
                ]}
                dataSource={[
                    { attr: "children", description: "孩子节点", type: "node", default: "false" },
                    { attr: "disablePortal", description: "是否禁用传送门", type: "boolean", default: "" },
                    { attr: "container", description: "传送门挂载的接待您", type: "func/node", default: "document.body" },

                ]}
            />

        </Layout>
    )

}

export default portalPage;