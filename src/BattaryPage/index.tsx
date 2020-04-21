import * as React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from '../ButtonBase/index';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import BattaryCharging from "./BattaryCharging";
import BatteryChargingHigh from "./BatteryChargingHigh";

class ButtonPage extends React.Component {
    render() {
        return (
            <Layout >
                <Title>动画合集</Title>
                <Description>动画合集用于开始一个动画。</Description>

                <Textlayout
                    layoutStyle={{backgroundColor:"#f5f5f5"}}
                    components={<React.Fragment>
                        <BattaryCharging />
                        <BatteryChargingHigh />
                    </React.Fragment>}
                    title={"动画组件"}
                    description={"动画组件：充电动画"}
                ></Textlayout>

             

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
                        { attr: "ghost", description: "幽灵属性，使按钮背景透明", type: "boolean", default: "false" },
                        { attr: "shape", description: "设置按钮形状，可选值为 circle 或者不设", type: "string", default: "-" },
                        { attr: "icon", description: "设置按钮的图标类型", type: "string", default: "-" },
                    ]}
                />

            </Layout>
        )
    }
}

export default ButtonPage;