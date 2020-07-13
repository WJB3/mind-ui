import React from 'react'; 
import useStatus from '../_utils/useStatus';
import "./index.scss";
import Message from '../Notice';
let defaultPlacement = 'top-center';

const notificationInstance={}

function getNotificationInstance(args, callback) {

    const {
        placement = defaultPlacement,
        maxCount=10
    } = args;

    const prefixCls = 'parrot-message';
    const cacheKey = `${prefixCls}-${placement}`;
    const cacheInstance = notificationInstance[cacheKey];

    if (cacheInstance) {
        Promise.resolve(cacheInstance).then(instance => {
            callback({ instance })
        });
        return;
    }

    notificationInstance[cacheKey] = new Promise(resolve => {
        Message.newInstance(
            {
                className: cacheKey,
                maxCount
            },
            (notification) => {
                resolve(notification);
                callback({
                    instance: notification
                })
            }
        )
    })
}


useStatus().forEach((item) => {
    Message[item] = (args) => {
        getNotificationInstance(args, ({ instance }) => {
            instance.notice({...args,status:item})
        })
    }
})
 

export default Message;