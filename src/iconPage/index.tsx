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
                            <Icon  name="earth"  />
                            <Icon  name="warehouse" color="primary" />
                            <Icon  name="wechat"  color="second" />
                            <Icon  name="wifi" color="danger" />
                            <Icon  name="alipay" color="info" />
                            <Icon  name="lock-fill" color="green" />
                        </div>
                        
                        
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"使用 <Icon /> 标签声明组件，指定图标对应的 type 属性。可以通过 theme 属性来设置不同的主题风格的图标，也可以通过设置 spin 属性来实现动画旋转效果。"}
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
       
                        {attr:"type",description:"图标类型。遵循图标的命名规范",type:"string",default:"-"},
                        {attr:"style",description:"设置图标的样式，例如 fontSize 和 color",type:"CSSProperties",default:"-"},
                        {attr:"spin",description:"是否有旋转动画",type:"boolean",default:"false"},
                    ]}
                />

            </Layout>
        )
    }
}

export default ButtonPage;