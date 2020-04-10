import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { classNames } from './../helper/className';
import { createChainedFunction } from './../_utils/utils';
import Notice from './notice';
import "./../styles/grid.scss";

let seed = 0;
const now = Date.now();

function getNotificationUuid() {
    return `wonderfulNotification_${now}_${seed++}`;
}

interface NotificationProps {
    maxCount?: number
}

const Notification: React.FunctionComponent<NotificationProps> = (NotificationProps) => {

    const {
        maxCount
    } = NotificationProps;

    const [notices, setNotices] = useState([])

    useEffect(() => {

    })

    const classes = classNames("wonderful-notification",

    )

    function removeNotice(key) {
        setNotices(notices.filter(notice => notice.key !== key));
    }

    //add方法保证了notice不会重复加入到notices队列中。
    function addNotice(notice) {
        //key表示一个notice的id
        const key = notice.key || getNotificationUuid();
        //要添加的notice是否存在
        const noticeIndex = notices.map(v => v.key).indexOf(key);
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
        setNotices(updatedNotices);
    }

    function getNoticesNode() {
        return notices.map((notice, index) => {
            //如果notice是数组最后一个，且存在updateKey。说明，该notice添加进来之前，数组已经达到maxCount,并挤掉了数组的第一个noitce。
            // update 为true，是由于重用了之前被挤掉的notice的组件，需要更新重启Notice组件的定时器
            const update = Boolean(index === notices.length - 1 && notice.updateKey);
            //key相同，若组件属性有所变化，则react只更新组件对应的属性；没有变化则不更新。
            const key = notice.updateKey ? notice.updateKey : notice.key;
            //createChainedFunction目的是，让this.remove函数,notice.onClose函数能够接收相同的参数，并一同调用。
            //即调用onClose时，会先调用this.remove,再调用notice.onClose
            const onClose = createChainedFunction(removeNotice.bind(this, notice.key), notice.onClose);

            return <Notice
                onClose={onClose}
                key={key}
            >
                {notice.content}
            </Notice>
        })
    }

    return (
        <div className={classes} >
            {getNoticesNode()}
        </div>
    )
}

export default Notification;

Notification.newInstance = function newNotificationInstance(properties, callback) {
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
    //参数notification是指Notification组件
    function ref(notification) {
        //设置变量called的原因是因为ref回调会在一些生命周期回调之前执行，这里为了保证ref回调在组件的所有生命周期中只执行完整的一次，所以才使用了一个布尔值。
        if (called) {
            return;
        }
        called = true;
        //传进来的callback函数，接收一个对象，该对象可以增加notice,移除notice,提供组件的引用，销毁组件
        callback({
            notice(noticeProps) {
                notification.addNotice(noticeProps);
            },
            removeNotice(key){
                notification.removeNotice(key);
            },
            component: notification, //compoent可以向外暴露Notification实例
            destroy(){
                //从div中移除已挂载的Notification组件从 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。
                //清除的是这个div下挂载的子组件
                ReactDom.unmountComponentAtNode(div);
                div.parentNode.removeChild(div);//移除挂载的容器
            }
        })
    }
    ReactDom.render(<Notification {...props} ref={ref} />,div)
}