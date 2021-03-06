import React, { useState, useRef } from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import WordPad from './index';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import message from '../Message';
import Button from '../ButtonBase';
 

const Page = () => {

    const canvasRef=useRef(null);
    const [imgUrl,setImgUrl]=useState(null);

    const onGetImage = () => {
        const img = canvasRef.current.toDataURL("image/png");
  
        setImgUrl(img)

        message.success({message:"获取成功"});
    };
  
    const getCanvasRef=(canvas)=>{
        canvasRef.current=canvas;
    }

    return (
        <Layout >
            <Title>写字板</Title>
            <Description>返回页面顶部的操作按钮。</Description>
            <SubTitle>何时使用</SubTitle>
            <Description>当页面内容区域比较长时。</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <WordPad getCanvasRef={getCanvasRef} />
                    <Button
                        type="primary"
                        onClick={onGetImage}
                        style={{ marginTop: 20 }}
                    >
                        获取文字
                    </Button>
                    {imgUrl && <img src={imgUrl} /> }
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法。"}
            ></TextLayout>

          
            <SubTitle>API</SubTitle>
            <Description>属性说明如下：</Description>
            <DescriptionTable
                columns={[
                    { title: "属性", dataIndex: "attr" },
                    { title: "说明", dataIndex: "description" },
                    { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                    { title: "默认值", dataIndex: "default" }
                ]}
                dataSource={[
                    { attr: "prefixCls", description: "自定义类名前缀", type: "string", default: "" },
                    { attr: "className", description: "额外添加的类名", type: "string", default: "false" },
                    { attr: "style", description: "样式", type: "object", default: "{}" },

                ]}
            />

        </Layout>
    )
}

export default Page;