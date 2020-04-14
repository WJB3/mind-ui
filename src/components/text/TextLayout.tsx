import * as React from 'react';
import "./TextLayout.less";
import { classNames } from './../helper/className';

class TextLayout extends React.Component{
    render(){

        const {
            children,
            components,
            title,
            description,
            layoutStyle,
            componentClassName
        }=this.props;
 

        return(
            <section className={"textlayout_component"}>
                <section className={classNames("textlayout_component-demo",componentClassName?componentClassName:"")} style={layoutStyle}>
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