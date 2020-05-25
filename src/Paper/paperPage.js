import React, { Fragment } from 'react';
import Paper from './index';
// import Paper from '@material-ui/core/Paper';
import "./index.scss";
//import  Notification from 'rc-notification';

class PaperPage extends React.Component {

    state = {

    }

    render() {

        return (
            <Fragment>
                <Paper className={"testPaper"} >
                    A啊啊啊
                </Paper>
                <Paper deep={5} className={"testPaper"}/>
                <Paper deep={10} className={"testPaper"} square={true} />
            </Fragment>
        )
    }
}

export default PaperPage;