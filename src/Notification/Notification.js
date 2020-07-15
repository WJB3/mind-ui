import React from 'react'; 
import useStatus from '../_utils/useStatus';
import "./index.scss";
import Notification from '../Notice';
let defaultPlacement = 'top-right';

const notificationInstance={}

function getDirection(placement){
    if(placement==="top-left"){
        return "left"
    }
    if(placement==="top-right"){
        return "right"
    }
    if(placement==="bottom-left"){
        return "left"
    }
    if(placement==="bottom-right"){
        return "right"
    }
}

function getNotificationInstance(args, callback) { 
    const {
        placement = defaultPlacement,
        maxCount=10,
        filled,
        effect="slide", 
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
                className:`parrot-notification parrot-notification-${placement}`,
                filled:filled,
                effect:effect,
                direction:getDirection(placement),
                placement,
                duration:4
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

const api={}

useStatus().forEach((item) => {
    api[item] = (args) => {
        getNotificationInstance(args, ({ instance }) => {
            instance.notice({...args,status:item})
        })
    }
})

api.close=(args)=>{
    getNotificationInstance(args, ({ instance }) => {
        instance.destroy()
    })
}
 

export default api;