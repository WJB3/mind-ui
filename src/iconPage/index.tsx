import * as React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Button from './../components/button/index';
import Icon from './../components/icon/index';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';

class ButtonPage extends React.Component {
    render() {
        return (
            <Layout >
                <Title>Icon图标</Title>
                <Description>Icon图标用于定义一个图标。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>Icon图标用于定义一个图标。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    components={<React.Fragment>
                         <div className="icon_container">
                            <Icon  name="car" color="black" size={16}/>
                            <Icon  name="file-add"  color="second" size={16}/>
                            <Icon  name="file-remove" color="danger" size={16}/>
                            <Icon  name="monitor" color="info" size={16}/>
                            <Icon  name="wifi" color="skyblue" size={16}/>
                        </div>
                        <div className="icon_container">
                            <Icon  name="car" color="black" />
                            <Icon  name="file-add"  color="second" />
                            <Icon  name="file-remove" color="danger" />
                            <Icon  name="monitor" color="info" />
                            <Icon  name="wifi" color="skyblue" />
                        </div>
                        <div className="icon_container">
                            <Icon  name="car" color="black" size={36} />
                            <Icon  name="file-add"  color="second" size={36} />
                            <Icon  name="file-remove" color="danger" size={36} />
                            <Icon  name="monitor" color="info" size={36} />
                            <Icon  name="wifi" color="skyblue" size={36} />
                        </div>
                        <div className="icon_container">
                            <Icon  name="car" color="black" size={56}/>
                            <Icon  name="file-add"  color="second" size={56}/>
                            <Icon  name="file-remove" color="danger" size={56}/>
                            <Icon  name="monitor" color="info" size={56}/>
                            <Icon  name="wifi" color="skyblue" size={56} />
                        </div>
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"使用 <Icon /> 标签声明组件，指定图标对应的 name 属性。"}
                ></Textlayout>

                <Textlayout
                    components={<React.Fragment>
                         
                        <div className="icon_container">
                            <Icon  name="car" color="black" size={36} />
                            <Icon  name="bell" color="primary" size={36} bounce/>
                            <Icon  name="file-add"  color="second" size={36} />
                            <Icon  name="file-remove" color="danger" size={36} spin />
                            <Icon  name="monitor" color="info" size={36} />
                            <Icon  name="wifi" color="skyblue" size={36} />
                        </div>
                        
                    </React.Fragment>}
                    title={"动画"}
                    description={"支持旋转、抖动动画"}
                ></Textlayout>
 
                <SubTitle>API</SubTitle>
                <Description>通过设置 Icon 的属性来产生不同的按钮样式</Description>
                <Description>Icon的属性说明如下：</Description>
                <DescriptionTable 
                    columns={[
                        {title:"属性",dataIndex:"attr"},
                        {title:"说明",dataIndex:"description"},
                    {title:"类型",dataIndex:"type",render:(text,record)=>{return (<div style={{color:"rgba(242,49,127,1)"}}>{text}</div>)}},
                        {title:"默认值",dataIndex:"default"}
                    ]}
                    dataSource={[
       
                        {attr:"name",description:"图标名称。遵循图标的命名规范",type:"string",default:"-"},
                        {attr:"color",description:"图标颜色。",type:"string",default:"-"},
                        {attr:"size",description:"图标尺寸。",type:"string",default:"normal(34px)"},
                        {attr:"bounce",description:"是否有抖动动画",type:"boolean",default:"false"},
                        {attr:"spin",description:"是否有旋转动画",type:"boolean",default:"false"},
                    ]}
                />

            </Layout>
        )
    }
}

export default ButtonPage;