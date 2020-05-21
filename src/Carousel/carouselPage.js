import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
// import Carousel from './mobile-carousel';
import Carousel from './index';
import Button from '../ButtonBase';

class ButtonPage extends React.Component {

    constructor(props) {
        super(props);
        this.CRef = React.createRef();
    }


    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <Layout >
                <Title>Carousel走马灯</Title>
                <Description>设置组件之间的间距。</Description>
                <SubTitle>当有一组平级的内容。</SubTitle>
                <Description>常用于一组图片或卡片轮播。</Description>
                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Carousel
                            autoPlay
                        >
                            <div className="item_width">
                                <h3>1</h3>
                            </div>
                            <div className="item_width">
                                <h3>2</h3>
                            </div>
                            <div className="item_width">
                                <h3>3</h3>
                            </div>
                            <div className="item_width">
                                <h3>4</h3>
                            </div>
                        </Carousel>


                    </React.Fragment>}
                    title={"水平分割线"}
                    description={"默认为水平分割线，可在中间加入文字。"}
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

export default ButtonPage;