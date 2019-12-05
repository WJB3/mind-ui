import * as React from 'react';
import { Layout as AntdLayout,Menu } from 'antd';
const { Header, Footer, Sider, Content } = AntdLayout;
const { SubMenu }=Menu;
import { menuInfo } from '@/config/menu';

class Layout extends React.Component {

    generateMenu=(menuConfig)=>{
        return menuConfig.map((menu)=>{
            if(menu.children){
                return <SubMenu title={menu.title}>{this.generateMenu(menu.children)}</SubMenu>;
            }else{
                return <Menu.Item>
                    <span>{menu.title}</span>
                </Menu.Item>;
            }
        })
    }

    render() {

        const { children }=this.props;

        return (
            <AntdLayout className={"layout_container"}>
                <Sider>
                    <Menu
                        mode="inline"
                    >{this.generateMenu(menuInfo)}</Menu>
                </Sider>
                <AntdLayout>
                    <Content>{children}</Content>
                    <Footer>Footer</Footer>
                </AntdLayout>
            </AntdLayout>
        )
    }
}

export default Layout;