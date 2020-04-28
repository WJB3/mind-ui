import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Button from '../ButtonBase';
import Radio from './../Radio';
 
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
}

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: '上', value: 'top',labelPlacement:"top" },
  { label: '下', value: 'bottom',labelPlacement:"bottom" },
  { label: '左', value: 'left', disabled: true,labelPlacement:"left" },
  { label: '右', value: 'right', disabled: true,labelPlacement:"right"  },
];



class Page extends React.Component {

    handleChangeRadioOne = (flag) => {

    }

    state = {
        disabled2: true,
        fourvalue: 1,
        optionValue1:"Apple",
        optionValue2:"Apple",
        optionValue3:"right",
    }

    handleChangeRadioOne = (value, isCheck) => {

    }

    


    render() {

        const { fourvalue,optionValue1,optionValue2,optionValue3 } = this.state;

        return (
            <Layout >
                <Title>Radio单选框</Title>
                <Description>单选框。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>用于在多个备选项中选中单个状态。</Description>
                <Description>和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Radio>选中</Radio>
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Radio defaultChecked={false} disabled={this.state.disabled2}>
                                Disabled
                            </Radio>
                            <br />
                            <Radio defaultChecked disabled={this.state.disabled2}>
                                Disabled
                            </Radio>
                            <Button type="primary" onClick={() => { this.setState({ disabled2: !this.state.disabled2 }) }}  >
                                Toggle disabled
                            </Button>
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Radio.Group onChange={this.handleChangeRadioThree} value={1}>
                                <Radio value={1}>A</Radio>
                                <Radio value={2}>B</Radio>
                                <Radio value={3}>C</Radio>
                                <Radio value={4}>D</Radio>
                            </Radio.Group>
                        </div>
                    </React.Fragment>}
                    title={"单选组合。"}
                    description={"一组互斥的 Radio 配合使用。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Radio.Group onChange={this.handleChangeRadioThree} value={1}>
                                <Radio value={1} labelPlacement="top">上</Radio>
                                <Radio value={2} labelPlacement="bottom">下</Radio>
                                <Radio value={3} labelPlacement="left">左</Radio>
                                <Radio value={4} labelPlacement="right">右</Radio>
                            </Radio.Group>
                        </div>
                    </React.Fragment>}
                    title={"label文字的位置。"}
                    description={"通过设置label来设置label文字的位置。默认为right"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", flexDirection:"column",alignItems: "center" }}>
                            <Radio.Group options={plainOptions} onChange={(e,value)=>{ }} value={optionValue1} />
                            <Radio.Group options={options} onChange={(e,value)=>{ }} value={optionValue2} />
                            <Radio.Group
                                options={optionsWithDisabled}
                                onChange={(e,value)=>{ }}
                                value={optionValue3}
                            />
                        </div>
                    </React.Fragment>}
                    title={"label文字的位置。"}
                    description={"通过设置label来设置label文字的位置。默认为right"}
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