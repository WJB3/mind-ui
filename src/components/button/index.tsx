import * as React from 'react';
import { classNames } from './../helper/className';
import Icon from './../icon';
import "./index.less";

class Button extends React.Component {
    render() {

        const { children, type,size,disabled,ghost,shape,icon } = this.props;
        return (
            <button className={
                classNames(
                    'melon-button',
                    'melon-button--raised',
                    type ? `melon-button--${type}` : "",
                    size ? `melon-button--${size}` : "",
                    disabled?`melon-button--disabled`:"",
                    ghost?`melon-button--ghost`:"",
                    shape?`melon-button--${shape}`:""
                )} >
                {icon && <Icon type={icon}/>}
                {children}
            </button>
        )
    }
}

export default Button;