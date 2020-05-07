import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import "./index.scss";

const Modal = (Props) => {

    const {
        prefixCls: customizePrefixCls,//自定义class类名
        className,//传过来的class类名
        style,//传过来的style样式名     
        children,//modal子节点
        afterClose,//Modal完全关闭后的回调
        bodyStyle,//Modal body样式
        cancelText,//取消按钮文字
        centered,//垂直居中展示modal
        closable,//是否显示右上角的
        closeIcon,//自定义关闭按钮
        confirmLoading,//确定按钮loading
        destroyOnClose,//关闭时销毁Modal里的子元素
        footer,//底部内容，当不需要默认底部按钮时，可以设为 footer={null}
        forceRender,//强制渲染Modal
        getContainer,//指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom
        keyboard,//	是否支持键盘 esc 关闭
        mask,//是否展示遮罩
        maskClosable,//点击蒙层是否允许关闭,
        maskStyle,//遮罩样式
        okText,//确认按钮文字
        okType,//确认按钮类型
        okButtonProps,//ok 按钮 props
        cancelButtonProps,//cancel 按钮 props
        style,//可用于设置浮层的样式，调整浮层位置等
        title,//标题
        visible,//对话框是否可见
        width,//宽度
        wrapClassName,//对话框外层容器的类名
        zIndex,//设置 Modal 的 z-index
        onCancel,//点击遮罩层或右上角叉或取消按钮的回调
        onOk,//点击确定回调
        ...restProps
    } = Props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("loading", customizePrefixCls);

    const classes = classNames(prefixCls, className);

    
 

    return <div>

    </div>
}

export default Modal;