import React ,{useState } from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import DatePicker from './index';
import TextLayout from '../components/text/TextLayout';
import Button from '../ButtonBase';
import DescriptionTable from '../components/text/DescriptionTable';
import { currentDate } from "../_utils/dateUtils";
import Space from '../Space'

const Page = () => {

    const [open, setOpen] = React.useState(false);

    const disabledDateFunc1=(current)=>{
        return current>currentDate(new Date("2020-06-02")).time && current<currentDate(new Date("2020-06-28")).time
    }

    const [value,setValue]=useState(new Date("2020-08-28"));

 

    return (
        <Layout >
            <Title>DatePicker</Title>
            <Description>返回页面顶部的操作按钮。</Description>
            <SubTitle>何时使用</SubTitle>
            <Description>当页面内容区域比较长时。</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Button style={{marginBottom:20}} onClick={()=>{console.log("marginbottom");setValue(new Date("2022-05-06"))}}>2022-05-06</Button>

                    <Space size="large">    

                        <DatePicker value={value}  onChange={(date) => { console.log(currentDate(date).currentYearMonthDay); }} />

                        <DatePicker value={value} landscape onChange={(date) => { console.log(currentDate(date).currentYearMonthDay); }}/>

                    </Space>

                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <Space size="large">
 
                        <DatePicker value={value} picker="month" disabled onChange={(date) => { console.log(currentDate(date).currentYearMonth); }}/>

                        <DatePicker  picker="year" landscape onChange={(date) => { console.log(currentDate(date).currentYear ); }}/>

                    </Space>

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