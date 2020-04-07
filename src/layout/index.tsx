import * as React from 'react';
import { Layout as AntdLayout,Menu } from 'antd';
const { Header, Footer, Sider, Content } = AntdLayout;
import {withRouter} from "react-router-dom";
const { SubMenu }=Menu;
import { menuInfo } from '@/config/menu';

class Layout extends React.Component {

    generateMenu=(menuConfig)=>{
        return menuConfig.map((menu)=>{
            if(menu.children){
                return <SubMenu title={menu.title} key={menu.key} >{this.generateMenu(menu.children)}</SubMenu>;
            }else{
                return <Menu.Item key={menu.key} onClick={this.menuClick} >
                    <span>{menu.title}</span>
                </Menu.Item>;
            }
        })
    }

    menuClick=(info)=>{
        this.props.history.push(`/${info.key}`)
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
                    <Content><div className={"main_container"}>{children}</div></Content>
                    <Footer>Footer</Footer>
                </AntdLayout>
            </AntdLayout>
        )
    }
}

export default withRouter(Layout);