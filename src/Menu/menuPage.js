import React, { Fragment ,useState,useCallback} from 'react';
import AppBar from '../AppBar';
import Toolbar from '../Toolbar';
import { Menu } from 'antd';
import SMenu from './index';

 

class AppBarPage extends React.Component {

    state = {

    }

    
    render() {
 

        return (
            <Fragment>
                <Menu style={{width:256}} defaultSelectedKeys={["1","15"]} mode="inline">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="13">Option 12</Menu.Item>
                    <Menu.Item key="14">Option 12</Menu.Item>
                    <Menu.Item key="15">Option 12</Menu.Item>
                    <Menu.Item key="16">Option 12</Menu.Item>
                    <Menu.SubMenu key="sub1"  title="Navigation Two">
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                        <Menu.SubMenu key="sub1-2" title="Submenu">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                </Menu>

                <SMenu style={{width:256}} defaultSelectedKeys={["1","15"]}>
                    <SMenu.Item key="1" icon="person">管理员</SMenu.Item>
                    <SMenu.Item key="13" icon="email">邮件</SMenu.Item>
                    <SMenu.Item key="14" icon="shopcar">Option 12</SMenu.Item>
                    <SMenu.Item key="15">Option 12</SMenu.Item>
                    <SMenu.Item key="16">Option 12</SMenu.Item>
                </SMenu>
                
                
            </Fragment>
        )
    }
}

export default AppBarPage;