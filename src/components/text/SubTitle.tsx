import * as React from 'react';
import "./SubTitle.less";

class SubTitle extends React.Component{
    render(){

        const {
            children
        }=this.props;

        return(
            <p className={"subtitle_component"}>
                {children}
            </p>
        )
    }
}

export default SubTitle;