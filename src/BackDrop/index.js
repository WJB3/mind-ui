import React, { useContext, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { Fade } from '../Animate';
import PropTypes from 'prop-types';
import "./index.scss";

const BackDrop = React.forwardRef((Props,ref) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style,
        open,
        onClick,
        disabledScroll,
        centered=true,
    } = Props;
 
    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("backdrop",customizePrefixCls);

    useEffect(()=>{
        if(disabledScroll && open){
            document.body.style="overflow:hidden";
        }
        return ()=>{
            if(open){
                document.body.style="overflow:auto";
            }
        }
      
    },[disabledScroll,open]);

   
     
    return (
        <Fade in={open}>
            <div className={
                classNames(prefixCls,className,{
                    [`${prefixCls}-centered`]:centered
                })
            }  style={style} ref={ref} onClick={onClick} >
                {children}
            </div>
        </Fade>
    )
});

BackDrop.propTypes={
    //孩子节点
    children:PropTypes.oneOfType([
         PropTypes.func,
         PropTypes.node
    ]),
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //添加类名
    className:PropTypes.string,
    //背景板是否打开
    open:PropTypes.bool,
    //是否禁用滚动
    disabledScroll:PropTypes.bool,
    //是否垂直居中
    centered:PropTypes.bool
}

export default BackDrop;