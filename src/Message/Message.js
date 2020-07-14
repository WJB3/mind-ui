import React from 'react'; 
import useStatus from '../_utils/useStatus';
import "./index.scss";
import Message from '../Notice'; 

const notificationInstance={}

function getNotificationInstance(args, callback) {

    const {
        maxCount=10,
        filled
    } = args;

    const prefixCls = 'parrot-message';
    const cacheKey = `${prefixCls}`;
    const cacheInstance = notificationInstance[cacheKey];

    console.log(notificationInstance);

    if (cacheInstance) {
        Promise.resolve(cacheInstance).then(instance => {
            console.log("promise")
            console.log(instance)
            callback({ instance })
        });
        return;
    }

    notificationInstance[cacheKey] = new Promise(resolve => {
        Message.newInstance(
            { 
                maxCount,
                className:prefixCls,
                filled:filled,
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
            console.log("addd")
            instance.notice({...args,status:item})
        })
    }
})
 

export default Message;