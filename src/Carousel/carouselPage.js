import React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import TextLayout from './../components/text/TextLayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Carousel from './index';
import { Row, Col } from '../Grid';



const Page = () => {



    return (
        <Layout >
            <Title>Carousel轮播图</Title>
            <SubTitle>何时使用</SubTitle>
            <Description>Carousel轮播图</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                 
                        <Carousel autoPlay>
                            <div className={"item_width"}><img style={{width:"100%",height:"100%"}} src="https://test-zhian.mro365.com/public/upload/ad/2019/07-19/b26cbff42a00289a188e11a21d289807.jpg"/></div>
                            <div className={"item_width"}>
                                <img style={{width:"100%",height:"100%"}} src="http://ppechina.com/public/upload/ad/2020/03-17/57941d33cc2b45a7cc19e2562408a59d.jpg"/>
                            </div>
                            <div className={"item_width"}>
                            <img style={{width:"100%",height:"100%"}} src="http://ppechina.com/public/upload/ad/2020/04-21/baff9f802877caf21cf11593fdf9af6d.jpg"/>
                            </div>
                            <div className={"item_width"}>
                            <img style={{width:"100%",height:"100%"}} src="http://ppechina.com/public/upload/ad/2020/04-29/06461ed47095167ba0a1b5f62e1d6235.jpg" />
                            </div>
                        </Carousel>
             

                </React.Fragment>}
                title={"基本用法"}
                description={""}
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
                    { attr: "style", description: "样式", type: "node/string", default: "false" },
                    { attr: "title", description: "提示内容", type: "node/string", default: "" },
                    { attr: "prefixCls", description: "自定义类名前缀", type: "string", default: "" },
                    { attr: "description", description: "描述", type: "string", default: "" },
                    { attr: "type", description: "类型", type: "string", default: "" },
                    { attr: "height", description: "高度", type: "number", default: "" },
                ]}
            />

        </Layout>
    )

}
export default Page;