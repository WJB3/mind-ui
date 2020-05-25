import React, { Fragment ,useState,useCallback} from 'react';
import AppBar from '../AppBar';
import Toolbar from '../Toolbar';
import { Menu } from 'antd';
import SMenu from './index';

function Counter() {
    const [count, setCount] = useState(0)
  
    const onIncrement = useCallback(() => {
      setCount(count => count + 1)
    }, [])
    
    const onLog = useCallback(() => {
      console.log(count)
    }, [count])
  
    return (
      <div>
        <button onClick={onIncrement}>INCREMENT</button>
        <button onClick={onLog}>Log</button>
        <p>{count}</p>
      </div>
    )
}
  
 
 

class AppBarPage extends React.Component {

    state = {

    }

    
    render() {
 

        return (
            <Fragment>
                <Menu>
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="13">Option 12</Menu.Item>
                </Menu>

                <SMenu>
                    <SMenu.Item key="1">Option 1</SMenu.Item>
                    <SMenu.Item key="13">Option 12</SMenu.Item>
                </SMenu>
                
                <Counter />
            </Fragment>
        )
    }
}

export default AppBarPage;