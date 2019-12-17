import * as React from 'react';
import { classNames } from './../helper/className';
import "./index.less";

class Button extends React.Component {
    render() {

        const { children, type,size,disabled,ghost } = this.props;
        return (
            <button className={
                classNames(
                    'melon-button',
                    'melon-button--raised',
                    type ? `melon-button--${type}` : "",
                    size ? `melon-button--${size}` : "",
                    disabled?`melon-button--disabled`:"",
                    ghost?`melon-button--ghost`:""
                )} >
                {children}
            </button>
        )
    }
}

export default Button;