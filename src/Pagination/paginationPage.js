import React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import TextLayout from './../components/text/TextLayout';
import Button from '../ButtonBase';
import Icon from '../components/icon';
import Space from '../Space';
import DescriptionTable from './../components/text/DescriptionTable';
import Badge from './index';
import Pagination from './index'
import { Pagination as PaginationA } from 'antd'
//import  Notification from 'rc-notification';

class Page extends React.Component {

    state = {

    }

    render() {

        return (
            <Layout >
                <Title>Pagination分页</Title>
                <Description>采用分页的形式分隔长列表，每次只加载一个页面。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>当页面内容区域比较长时。</Description>
                <SubTitle>代码演示</SubTitle>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <div style={{ justifyContent: "center", alignItems: "center" }}>
                            <Pagination defaultCurrent={1} total={55} />
                            <Pagination defaultCurrent={2} total={55} circle disabled />
                            <Pagination defaultCurrent={3} total={55} color="primary" />
                            <Pagination defaultCurrent={4} total={55} color="primary" circle />
                            <Pagination defaultCurrent={5} total={55} color="danger" />
                            <Pagination defaultCurrent={6} total={55} color="danger" circle disabled />
                        </div>
                    </React.Fragment>}
                    title={"基本"}
                    description={"基础分页。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>

                        <Pagination defaultCurrent={1} total={200} color="primary" />

                    </React.Fragment>}
                    title={"更多"}
                    description={"更多分页。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>

                        <Pagination defaultCurrent={1} total={200} color="primary" prevRender={"前一页"} nextRender={"后一页"} />

                    </React.Fragment>}
                    title={"替换前一页和后一页"}
                    description={"替换前一页和后一页"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>

                        <Pagination defaultCurrent={1} total={200} color="primary" onChange={(page,pageSize)=>{console.log(`当前页码：${page},每页条数：${pageSize}`)}}prevRender={"前一页"} nextRender={"后一页"} />

                    </React.Fragment>}
                    title={"通过onchange回调当前页码和每页条数"}
                    description={"通过onchange回调当前页码和每页条数"}
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