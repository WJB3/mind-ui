import React from 'react';
import Paper from '../Paper';
import Menu from '../Menu';
import Layout from '../Layout';
import { menuInfo } from '../config/menu';
import AppBar from '../AppBar';
import './index.scss';
import Toolbar from '../Toolbar';
import { useHistory } from 'react-router-dom';

const ParrotLayout = (props) => {

    let history = useHistory();

    const {
        children
    } = props;

    const generateMenu = (menuInfo) => {
        return menuInfo.map(item => {
            if (item.children) {
                return <Menu.SubMenu key={item.key} title={item.title} icon={item.icon}>
                    {generateMenu(item.children)}
                </Menu.SubMenu>
            }
            return <Menu.Item key={item.key} icon={item.icon} >{item.title}</Menu.Item>
        })
    }

    const handleItemClick = (e, key) => {
        history.push(`/${key}`)
    }


    return (
        <Paper style={{ height: "100%" }}>



            <Layout style={{width:"100%",height:"100%"}}>
                <Layout.Sider>
                    <Menu theme="dark" defaultOpenKeys={["components"]} style={{ width: 260, height: "100%", overflow: "auto" }} onItemClick={handleItemClick}>
                        {generateMenu(menuInfo)}
                    </Menu>
                </Layout.Sider>
                
                <Layout  style={{width:"100%",overflow:"auto",overflowX:"hidden"}} id="layout">
                    <Layout.Header>
                        <AppBar position="relative" className={"appbar"} style={{marginBottom:"10px"}}>
                            <Toolbar >

                            </Toolbar>
                        </AppBar>
                    </Layout.Header>
                    <Layout.Content style={{padding:16}}>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>


        </Paper>
    )
}

export default ParrotLayout;