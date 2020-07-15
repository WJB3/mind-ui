import React from 'react'; 
import useStatus from '../_utils/useStatus';
import "./index.scss";
import Message from '../Notice'; 

let notificationInstance={} 

function getNotificationInstance(args, callback) {

    const {
        maxCount=10,
        filled
    } = args;  

    const prefixCls = 'parrot-message';
    const cacheKey = `${prefixCls}`;
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

const api={}

useStatus().forEach((item) => {
    api[item] = (args) => {
        getNotificationInstance(args, ({ instance }) => { 
            instance.notice({...args,status:item})
        })
    }
})

api.close=(args)=>{ 
    getNotificationInstance(args={}, ({ instance }) => {
        instance.destroy(); 
        notificationInstance={};
    })
}
 

export default api;