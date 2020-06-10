import React, { useRef, useState } from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Tooltip from './index';
import Button from '../ButtonBase';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import { Row, Col } from './index';
import useMediaQuery from '../useMediaQuery';

//import  Notification from 'rc-notification';
const GridPage = () => {

    const match = useMediaQuery("(min-width:768px)")

    return (
        <Layout >
            <Title>Grid栅格</Title>
            <SubTitle>何时使用</SubTitle>
            <Description>Grid栅格</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <Row>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            Col
                        </Col>
                            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                                Col
                        </Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                Col
                        </Col>

                    </Row>

                </React.Fragment>}
                title={"基本用法"}
                description={""}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>





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
                    { attr: "children", description: "需要挂载的元素", type: "node/string", default: "false" },
                    { attr: "title", description: "提示内容", type: "node/string", default: "" },
                    { attr: "prefixCls", description: "自定义类名前缀", type: "string", default: "" },
                ]}
            />

        </Layout>
    )

}

export default GridPage;