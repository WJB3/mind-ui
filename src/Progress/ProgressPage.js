import React, { useState } from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Progress from './index';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Space from '../Space';
import Button from '../ButtonBase'

const Page = () => {

    const [value, setValue] = useState(0);

    const [progress, setProgress] = React.useState(0);
    const [progress2, setProgress2] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    
    React.useEffect(() => {
        const timer = setInterval(() => {
          setProgress2((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
        }, 500);
    
        return () => {
          clearInterval(timer);
        };
      }, []);
    

    return (
        <Layout >
            <Title>Progress</Title>
            <Description>返回页面顶部的操作按钮。</Description>
            <SubTitle>何时使用</SubTitle>
            <Description>当页面内容区域比较长时。</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Space size={"large"}>
                        <Progress color={"primary"} />
                        <Progress color={"danger"} thickness={6} />
                        <Progress color={"danger"} thickness={6} variant={"static"} value={value} />
                        <Progress color={"warning"} thickness={6} variant={"static"} value={progress} />
                        <Button onClick={() => setValue(value + 10)}>点击+10</Button>
                    </Space>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
            
                    <Space  direction="vertical" isBlock size={"large"} > 
                        <Progress type="liner" color={"primary"} />
                        <Progress type="liner" color={"danger"} />
                        <Progress type="liner" color={"danger"} variant="determinate" value={progress2}  />
                        <Progress type="liner" color={"danger"} variant="buffer" value={progress2}  />
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