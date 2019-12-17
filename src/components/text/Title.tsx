import * as React from 'react';
import "./Title.less";

class Title extends React.Component{
    render(){

        const {
            children
        }=this.props;

        return(
            <div className={"title_component"}>
                {children}
            </div>
        )
    }
}

export default Title;