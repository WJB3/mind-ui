import React, { Fragment } from 'react';
import Collapse from './index';
import Icon from '../components/icon';
import "./index.scss";
//import  Notification from 'rc-notification';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
class AppBarPage extends React.Component {

    state = {

    }

    render() {

        return (
            <Fragment>
                <div className="container">
                <Collapse defaultActiveKey={["1"]} onChange={(e,keys)=>{console.log(e);console.log(keys)}} >
                    <Collapse.Panel header="This is panel header 1" key="1" forceRender  disabled >
                        <p>{text}</p>
                    </Collapse.Panel>
                    <Collapse.Panel header="This is panel header 2" key="2" forceRender={false} extra={<Icon name="settings"/>}>
                        <p>{text}</p>
                    </Collapse.Panel>
                </Collapse>
                </div>
            </Fragment>
        )
    }
}

export default AppBarPage;