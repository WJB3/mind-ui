import React, { Fragment } from 'react';
import AppBar from '../AppBar';
import Toolbar from '../Toolbar';

// import AppBar from './index';
import "./index.scss";
//import  Notification from 'rc-notification';

class AppBarPage extends React.Component {

    state = {

    }

    
    render() {
 

        return (
            <Fragment>
                <AppBar  position="relative" >
                    <Toolbar >
                        aaaa
                    </Toolbar>
                    
                </AppBar>
                
            </Fragment>
        )
    }
}

export default AppBarPage;