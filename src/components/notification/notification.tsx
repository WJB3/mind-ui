import React, { useState, useEffect, useRef, Component } from 'react';
import ReactDom, { render } from 'react-dom';
import { classNames } from './../helper/className';
import { createChainedFunction } from './../_utils/utils';
import Notice from './notice';
import { useAnimate } from './../../components/_utils/hooks';
import "./../styles/grid.scss";
import { isNull } from './../_utils/utils';


export interface NotificationInstance {
    notice?: any,
    removeNotice?: any,
    destroy?: any,
    component?: any,

}

let seed = 0;
const now = Date.now();

function getNotificationUuid() {
    return `wonderfulNotification_${now}_${seed++}`;
}

interface NotificationProps {
    maxCount?: number,
    ref?: any
}

interface NotificationState {
    notices?: any;
}

class Notification extends Component<NotificationProps, NotificationState>{

    state: NotificationState = {
        notices: []
    }


    removeNotice(key: any) {
        let notices = this.state.notices.filter((notice: any) => notice.key !== key)
        this.setState({
            notices: notices
        })
    }

    //add方法保证了notice不会重复加入到notices队列中。
    addNotice(notice: any) {
  
        const { notices } = this.state;
        const { maxCount } = this.props;
        //key表示一个notice的id
        const key = notice.key=  getNotificationUuid();
    
        //要添加的notice是否存在
        const noticeIndex = notices.map((v: any) => v.key).indexOf(key);
        //使用concat()来复制notice数组
        const updatedNotices = notices.concat();
        //如果要加的notice已经存在
        if (noticeIndex !== -1) {
            //删除已存在的notice，加入要添加的notice
            updatedNotices.splice(noticeIndex, 1, notice);
        } else {
            //如果设置了maxCount，且notices中的数量已达到maxCount的限制，那么移除第一个notice
            if (maxCount && notices.length >= maxCount) {
                //updateKey设置为最初移除的key，最要是为了利用已存在的组件
                notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
                updatedNotices.shift();
            }
            //加入的要添加的notice
            updatedNotices.push(notice);
        }
        this.setState({
            notices: updatedNotices
        })
      
    }

    getNoticeNodes=()=>{
        const { notices }=this.state;
      
        return notices.map((notice: any, index: any) => {
            //如果notice是数组最后一个，且存在updateKey。说明，该notice添加进来之前，数组已经达到maxCount,并挤掉了数组的第一个noitce。
            // update 为true，是由于重用了之前被挤掉的notice的组件，需要更新重启Notice组件的定时器
            const update = Boolean(index === notices.length - 1 && notice.updateKey);
            //key相同，若组件属性有所变化，则react只更新组件对应的属性；没有变化则不更新。
            const key = notice.updateKey ? notice.updateKey : notice.key;
            //createChainedFunction目的是，让this.remove函数,notice.onClose函数能够接收相同的参数，并一同调用。
            //即调用onClose时，会先调用this.remove,再调用notice.onClose
            const onClose = createChainedFunction(this.removeNotice.bind(this,notice.key), notice.onClose);

            //React中有两个比较特殊的参数：ref 和 key，不会被传递到组件
            return <Notice
                    onClose={onClose}
                    keyIndex={key}
                    key={key}
                    message={notice.message?notice.message:"通知提醒框"}
                    description={notice.description} 
                    duration={notice.duration?notice.duration:4}
                    isCloseAuto={isNull(notice.duration)}
                    status={notice.status}
                    backgroundColor={notice.backgroundColor}
                    icon={notice.icon}
                    btn={notice.btn}
                /> 
        })
    }

    render() {
       
        const classes = classNames("wonderful-notification");

        return (
            <div className={classes}>
                {this.getNoticeNodes()} 
            </div>
        )
    }
}

export default Notification;

Notification.newInstance = function newNotificationInstance(properties: any, callback: any) {

    const { getContainer, ...props } = properties || {};
    const div = document.createElement("div");
    if (getContainer) {
        // getContainer是函数，返回HTMLElement。返回结果将作为notification挂载的容器
        const root = getContainer();
        root.appendChild(div);
    } else {
        document.body.appendChild(div);
    }
    //由上可知，其实notification最后都挂载在div中
    let called = false;

    function ref(notification:Notification){
        if(called){
            return ;
        }
        called=true;
        callback({
            notice(noticeProps:any){
                notification.addNotice(noticeProps);
            },
            component:notification
        })
    }
    ReactDom.render(<Notification {...props} ref={ref} />, div);

}