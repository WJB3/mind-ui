import * as React from 'react';
import "./Description.less";

class Description extends React.Component{
    render(){

        const {
            children
        }=this.props;

        return(
            <p className={"description_component"}>
                {children}
            </p>
        )
    }
}

export default Description;