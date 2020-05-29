import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { Fold } from '../Animate';
import Paper from '../Paper';
import Button from '../ButtonBase';

const Panel=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style,
        header,
        isActive,
        onHeaderClick,
        forceRender,
        extra,
        showArrow=true,
        disabled
    }=props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("collapse-panel", customizePrefixCls);

    const handleClick=(e)=>{
        if(onHeaderClick && !disabled){
            onHeaderClick(e);
        }
    }

    return (
        <Paper 
            children={children}
            ref={ref}
            style={{
                ...style
            }}
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-isActive`]:isActive,
                        [`${prefixCls}-disabled`]:disabled
                    }
                )
            }
        >
            <Paper className={classNames(`${prefixCls}-header`)} onClick={handleClick}>
                {!!header && header}
                {!!extra && extra}
                {!extra && showArrow &&<Button icon="arrow-thin-down" flat shape="circle"  size="small" />}
            </Paper>
            <Fold in={isActive} unmountOnExit={!forceRender}>
                <Paper className={classNames(`${prefixCls}-content`)}>
                    {children}
                </Paper>
            </Fold>
        </Paper>
    )
});

Panel.propTypes={
    //内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //自定义title
    header:PropTypes.any,
    //是否展开/激活
    isActive:PropTypes.bool,
    //点击头部
    onHeaderClick:PropTypes.func,
    //被隐藏时是否渲染dom
    forceRender:PropTypes.bool,
    //自定义渲染每个面板右上角的
    extra:PropTypes.any,
    //是否展示当前面板上的箭头
    showArrow:PropTypes.bool,
    //是否禁用
    disabled:PropTypes.bool
};

export default Panel;