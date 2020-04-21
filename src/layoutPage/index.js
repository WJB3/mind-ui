import * as React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import LayoutC from './../LayoutC';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
import Button from '../ButtonBase';

class Page extends React.Component {
    render() {
        return (
            <Layout >
                <Title>Layout布局</Title>
                <Description>协助进行页面级整体布局。</Description>
                <SubTitle>何时使用</SubTitle>

                <SubTitle>代码演示</SubTitle>

                <Textlayout
                    componentClassName={"layout-page-demo"}
                    components={<React.Fragment>
                        <LayoutC>
                            <LayoutC.Header>
                                Header
                                </LayoutC.Header>
                            <LayoutC.Content>
                                Content
                                </LayoutC.Content>
                            <LayoutC.Footer>
                                Footer
                                </LayoutC.Footer>
                        </LayoutC>
                        <div style={{ height: "50px" }}></div>
                        <LayoutC>
                            <LayoutC.Header>Header</LayoutC.Header>
                            <LayoutC>
                                <LayoutC.Sider>Sider</LayoutC.Sider>
                                <LayoutC.Content>Content</LayoutC.Content>
                            </LayoutC>
                            <LayoutC.Footer>Footer</LayoutC.Footer>
                        </LayoutC>
                        <div style={{ height: "50px" }}></div>
                        <LayoutC>
                            <LayoutC.Header>Header</LayoutC.Header>
                            <LayoutC>
                                <LayoutC.Content>Content</LayoutC.Content>
                                <LayoutC.Sider>Sider</LayoutC.Sider>
                            </LayoutC>
                            <LayoutC.Footer>Footer</LayoutC.Footer>
                        </LayoutC>
                        <div style={{ height: "50px" }}></div>
                        <LayoutC>
                            <LayoutC.Sider>Sider</LayoutC.Sider>
                            <LayoutC>
                                <LayoutC.Header>Header</LayoutC.Header>
                                <LayoutC.Content>Content</LayoutC.Content>
                                <LayoutC.Footer>Footer</LayoutC.Footer>
                            </LayoutC>
                        </LayoutC>
                    </React.Fragment>}
                    title={"基本用法"}
                    description={"使用 <Icon /> 标签声明组件，指定图标对应的 name 属性。"}
                ></Textlayout>

<Textlayout
                    componentClassName={"layout-page-demo"}
                    components={<React.Fragment>
                        <LayoutC>
                            <LayoutC.Header>
                                Header
                                </LayoutC.Header>
                            <LayoutC.Content>
                                Content
                                </LayoutC.Content>
                            <LayoutC.Footer>
                                Footer
                                </LayoutC.Footer>
                        </LayoutC>
                        <div style={{ height: "50px" }}></div>
                        <LayoutC>
                            <LayoutC.Header>Header</LayoutC.Header>
                            <LayoutC>
                                <LayoutC.Sider>Sider</LayoutC.Sider>
                                <LayoutC.Content>Content</LayoutC.Content>
                            </LayoutC>
                            <LayoutC.Footer>Footer</LayoutC.Footer>
                        </LayoutC>
                        <div style={{ height: "50px" }}></div>
                        <LayoutC>
                            <LayoutC.Header>Header</LayoutC.Header>
                            <LayoutC>
                                <LayoutC.Content>Content</LayoutC.Content>
                                <LayoutC.Sider>Sider</LayoutC.Sider>
                            </LayoutC>
                            <LayoutC.Footer>Footer</LayoutC.Footer>
                        </LayoutC>
                        <div style={{ height: "50px" }}></div>
                        <LayoutC>
                            <LayoutC.Sider>Sider</LayoutC.Sider>
                            <LayoutC>
                                <LayoutC.Header>Header</LayoutC.Header>
                                <LayoutC.Content>Content</LayoutC.Content>
                                <LayoutC.Footer>Footer</LayoutC.Footer>
                            </LayoutC>
                        </LayoutC>
                    </React.Fragment>}
                    title={"上中下布局"}
                    description={"最基本的『上-中-下』布局 一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。通常将内容放在固定尺寸（例如：1200px）内，整个页面排版稳定，不受用户终端显示器影响；上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。。"}
                ></Textlayout>

                <SubTitle>API</SubTitle>
                <Description>通过设置 Icon 的属性来产生不同的按钮样式</Description>
                <Description>Icon的属性说明如下：</Description>
                <DescriptionTable
                    columns={[
                        { title: "属性", dataIndex: "attr" },
                        { title: "说明", dataIndex: "description" },
                        { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                        { title: "默认值", dataIndex: "default" }
                    ]}
                    dataSource={[

                        { attr: "name", description: "图标名称。遵循图标的命名规范", type: "string", default: "-" },
                        { attr: "color", description: "图标颜色。", type: "string", default: "-" },
                        { attr: "size", description: "图标尺寸。", type: "string", default: "normal(34px)" },
                        { attr: "bounce", description: "是否有抖动动画", type: "boolean", default: "false" },
                        { attr: "spin", description: "是否有旋转动画", type: "boolean", default: "false" },
                    ]}
                />

            </Layout>
        )
    }
}

export default Page;