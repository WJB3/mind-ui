import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import DescriptionTable from './../components/text/DescriptionTable';
import Textlayout from './../components/text/Textlayout';
import Checkbox from './index';
import Switch from '../Switch';
//import  Notification from 'rc-notification';

const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
  ];

class checkboxPage extends React.Component {

    state = {
        checked: false,
        disabled: false,
    }

    render() {

        return (
            <Layout >
                <Title>Checkbox</Title>
                <Description>在一组可选项中进行多项选择时；</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Checkbox onChange={(e) => console.log(`checked ${e}`)}>Checkbox</Checkbox>
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Checkbox defaultChecked={false} disabled />

                            <Checkbox defaultChecked disabled />
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Checkbox
                                indeterminate
                                checked={this.state.checked}
                                disabled={this.state.disabled}
                                onChange={(checked) => { console.log(`当前选中状态:${checked}`) }}
                            />
                            <Switch onChange={(e) => { this.setState({ checked: e }) }} />
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></Textlayout> 

                <Textlayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Checkbox.Group options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} onChange={(e)=>console.log(e)} />
                            
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Checkbox.Group options={options} defaultValue={['Pear']} onChange={(e)=>console.log(e)} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Checkbox.Group
                            options={optionsWithDisabled}
                            disabled
                            defaultValue={['Apple']}
                            onChange={(e)=>console.log(e)}
                        />
                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
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

export default checkboxPage;