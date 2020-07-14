import React from 'react'; 
import useStatus from '../_utils/useStatus';
import "./index.scss";
import Notification from '../Notice';
let defaultPlacement = 'top-center';

const notificationInstance={}

function getNotificationInstance(args, callback) {

    const {
        placement = defaultPlacement,
        maxCount=100,
        filled
    } = args;

    const prefixCls = 'parrot-notification';
    const cacheKey = `${prefixCls}-${placement}`;
    const cacheInstance = notificationInstance[cacheKey];

    if (cacheInstance) {
        Promise.resolve(cacheInstance).then(instance => {
            callback({ instance })
        });
        return;
    }

    notificationInstance[cacheKey] = new Promise(resolve => {

   
        Notification.newInstance(
            { 
                maxCount,
                className:'parrot-notification',
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
    Notification[item] = (args) => {
        getNotificationInstance(args, ({ instance }) => {
            instance.notice({...args,status:item})
        })
    }
})
 

export default Notification;