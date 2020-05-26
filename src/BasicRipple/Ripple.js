import React,{useState,useContext} from 'react';
import { classNames } from './../components/helper/className';
import { Transition } from 'react-transition-group';
import { ConfigContext } from '../ConfigContext';
import PropTypes from 'prop-types';
import "./index.scss";
 

const Ripple=(props)=>{

    const {
        style,
        className,
        in:inProps,
        prefixCls: customizePrefixCls,
        ...other
    }=props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("ripple", customizePrefixCls);

    const [ rippleEntering,setRippleEntering ]=useState(false);

    const [ rippleExiting,setRippleExiting ]=useState(false);

    function handleEnter(){
        setRippleEntering(true);
    }

    function handleExit(){
        setRippleExiting(true);
    }

    const classes=classNames(
        prefixCls,
        className,
        {
            [`${prefixCls}-entering`]:rippleEntering,
            [`${prefixCls}-exiting`]:rippleExiting
        }
    )

  

    return (
        <Transition
            onEnter={handleEnter}
            onExit={handleExit}
            exit
            enter
            timeout={500}
            unmountOnExit
            in={inProps}
            style={style}
        >
                <span
                    className={
                        classes
                    }
                 
                />
        </Transition>
        
    )
};

Ripple.propTypes={
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object
};

export default Ripple;