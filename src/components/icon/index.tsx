import * as React from 'react';
import { classNames } from './../helper/className';

import "./importIcons";
import "./index.less";

class Icon extends React.Component {
    render() {

        const { children, type, style,spin,rotate } = this.props;
        return (
            <i style={style} className={
                classNames(
                    'melon-icon',
                    spin ? `melon-icon--spin` : "",
                )} >
                <svg width={"1em"} height={"1em"} fill={"currentcolor"}>
                    <use xlinkHref={`#${type}`}></use>
                </svg>
            </i>
        )
    }
}

export default Icon;