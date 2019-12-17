import * as React from 'react';
import "./TextLayout.less";

class TextLayout extends React.Component{
    render(){

        const {
            children,
            components,
            title,
            description
        }=this.props;

        console.log(components);

        return(
            <section className={"textlayout_component"}>
                <section className={"textlayout_component-demo"}>
                    {components}
                </section>
                <section className={"textlayout_component-text"}>
                    <div className={"textlayout_component-text_title"}>
                        {title}
                    </div>
                    <div className={"textlayout_component-text_description"}>
                        {description}
                    </div>
                </section>
            </section>
        )
    }
}

export default TextLayout;