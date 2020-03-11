import * as React from 'react';
import Transition from 'react-transition-group/Transition';

class Ripple extends React.Component{

    constructor(props){
        super();
        this.state={
            rippleEntering:false,
            wrapperExiting:false
        }
    }

    handleEnter=()=>{
        this.setState({
            rippleEntering:true
        });
    }

    render(){
        return(
            <Transition
                onEnter={this.handleEnter}
            >

            </Transition>
        )
    }
}

export default Ripple;