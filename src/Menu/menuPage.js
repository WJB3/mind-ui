import React, { Fragment, useState, useCallback } from 'react';
// import { Menu } from 'antd';
import Menu from './index';

// import { Menu } from 'vikingship'
// import { Menu } from 'antd'

class AppBarPage extends React.Component {

    state = {

    }


    render() {


        return (
            <Fragment>
                <Menu style={{ width: 256 }} defaultSelectedKeys={["1", "15"]} mode="inline" theme="dark" >
                    <Menu.SubMenu key="wu1" title="Mr.Wu">
                        <Menu.Item key="Profile-1" selectable={false}>My Profile</Menu.Item>
                        <Menu.Item key="Profile-2" selectable={false}>Edit Profile</Menu.Item>
                        <Menu.Item key="Profile-3" selectable={false}>Settings</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Divider></Menu.Divider>
                    <Menu.Item key="1">
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.SubMenu key="sub1" title="子菜单">
                        <Menu.Item key="sub1-1">测试1</Menu.Item>
                        <Menu.Item key="sub1-2">测试1</Menu.Item>
                        <Menu.SubMenu key="sub1-3" title="子菜单">
                            <Menu.Item key="6">子菜单</Menu.Item>
                            <Menu.Item key="7">子菜单</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                </Menu>
            </Fragment>
        )
    }
}

export default AppBarPage;