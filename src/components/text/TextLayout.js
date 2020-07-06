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
            LayoutStyle,
            componentClassName
        }=this.props;
 

        return(
            <section className={"textLayout_component"}>
                <section className={classNames("textLayout_component-demo",componentClassName?componentClassName:"")} style={LayoutStyle}>
                    {components}
                </section>
                <section className={"textLayout_component-text"}>
                    <div className={"textLayout_component-text_title"}>
                        {title}
                    </div>
                    <div className={"textLayout_component-text_description"}>
                        {description}
                    </div>
                </section>
            </section>
        )
    }
}

export default TextLayout;