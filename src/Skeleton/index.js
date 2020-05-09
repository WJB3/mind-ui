import React, { useCallback,useState,useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Avatar from '../Avatar';
import "./index.scss";

const defaultSkeletonParagraphProps={
    rows:4,
    width:"61%"
}

const defaultSkeletonAvatarProps=false;

const Modal = (Props) => {

    const {
        prefixCls: customizePrefixCls,//自定义class类名
        className,//传过来的class类名
        style,//传过来的style样式名     
        children,//modal子节点
        active,//是否展示动画
        loading,//为 true 时，显示占位图。反之则直接展示子组件
        paragraph:skeletonParagraphProps={
            ...defaultSkeletonParagraphProps
        },//是否显示段落占位图
        avatar:skeletonAvatarProps=defaultSkeletonAvatarProps,//是否显示图像
        title=true,//是否显示标题占位图
        animation,
        ...restProps
    } = Props;
 
    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("skeleton", customizePrefixCls);

    const paragraphNode=(paragraph)=>{
        console.log(paragraph.rows)
        return <ul className={classNames(`${prefixCls}-paragraph`)}>
            {
                [...Array(paragraph.rows)].map((_, index)=>{
                    if(index===paragraph.rows-1){
                        return <li style={{width:paragraph.width}} key={index}></li>
                    }else{
                        return <li key={index}></li>
                    }
                   
                })
            }
        </ul>
    }

   
    return  <div className={
        classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-${animation}`]:!!animation
            }
        )
    }>

        {!!skeletonAvatarProps && <div className={classNames(`${prefixCls}-header`)}>
            <Avatar {...skeletonAvatarProps}/>
        </div>}

        <div className={classNames(`${prefixCls}-content`)}>
            {!!title && <h3  className={classNames(`${prefixCls}-title`)}></h3>}

            {!!skeletonParagraphProps && paragraphNode({...defaultSkeletonParagraphProps,...skeletonParagraphProps})}
        </div>
    </div>
}

export default Modal;