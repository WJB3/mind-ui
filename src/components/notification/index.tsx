import React, { useState,useEffect } from 'react';
import { classNames } from './../helper/className';
import Notification from './notification';
import "./../styles/notification.scss";
import {} from './notification';
import Icon from './../icon';

let defaultDuration=4.5;
let defaultGetContainer:()=>HTMLElement;

const notificationInstance:any={};

const typeToIcon={
    success:<Icon name={"success"}/>,
    info:<Icon name={"info"}/>,
    error:<Icon name={"error"} />,
    warning:<Icon name={"warning"} />
}

export type NotificationPlacement="topLeft"|"topRight"|"bottomLeft"|"bottomRight";
 
let closeTimer;//计算关闭的定时器

export interface ArgsProps{
    message:React.ReactNode;
    description?:React.ReactNode;
    btn?:React.ReactNode;
    key?:string;
    onClose?:()=>void;
    duration?:number|null;
    icon?:React.ReactNode;
    placement?:NotificationPlacement;
    style?:React.CSSProperties;
    getContainer?:()=>HTMLElement;
    type?:any;

}

export interface ConfigProps{
    top?:number,
    bottom?:number,
    duration?:number,
    placement?:NotificationPlacement,
    getContainer?:()=>HTMLElement,
    closeIcon?:React.ReactNode
}

let defaultPlacement:NotificationPlacement="topRight";


function getWDNoticeProps(args:ArgsProps,prefix:string){
    const duration=args.duration===undefined?defaultDuration:args.duration;
    let iconNode:React.ReactNode=null;
    if(args.icon){
        iconNode=<span >{args.icon}</span>
    }else if(args.type){
        iconNode=React.createElement(typeToIcon[args.type]||null,{

        })
    }
    return {
        content:"center",
        duration

    }
}

function getNotificationInstance(
    args:ArgsProps,
    callback:(instance:any)=>void
){
    const {
        placement=defaultPlacement,
        getContainer=defaultGetContainer,

    }=args;

    const cacheKey=`wondeful-notification-${placement}`;
    const cacheInstance=notificationInstance[cacheKey];

    if(cacheInstance){
        Promise.resolve(cacheInstance).then(instance=>{
            callback({prefix,instance});
        });
        return ;
    }

    notificationInstance[cacheKey]=new Promise(resolve=>{
        Notification.newInstance(
            {

            },
            (notification:any)=>{
                resolve(notification);
                callback({
                    instance:notification
                })
            }
        )
    })
}

const api:any={
    open:(args:ArgsProps)=>{
        getNotificationInstance(args,({instance})=>{
            instance.notice(getWDNoticeProps(args,prefix))
        })
    },
    //config:getNotificationCOnfig
}

export default api as NotificationApi;