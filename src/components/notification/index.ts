import Notification from './notification';
import { any } from 'prop-types';

let defaultPlacement = 'right-top';

export enum notificationType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info",
    WARNING = "warning"
}

const notificationInstance: any = {}

function getPlacementStyle(
    placement: any,
    top: any,
    bottom: any
) {
    let style;
    switch (placement) {
        case "right-top":
            style = {
                right: 0,
                top,
                bottom: "auto"
            };
            break;
        case "right-bottom":
            style = {
                right: 0,
                top: "auto",
                bottom
            };
            break;
        case "left-bottom":
            style = {
                left: 0,
                top: "auto",
                bottom
            };
            break;
        case "left-top":
            style = {
                left: 0,
                top,
                bottom: "auto"
            }
            break;
        default:
            style = {
                right: 0,
                top: 'auto',
                bottom,
            };
            break;
    }
    return style;
}

function getNotificationInstance(args: any, callback: any) {

    const {
        placement = defaultPlacement,
        top="24px",
        bottom="24px",
        maxCount=10
    } = args;

    const prefixCls = 'wonderful-notification';
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
                className: cacheKey,
                style:getPlacementStyle(placement,top,bottom),
                maxCount
            },
            (notification: any) => {
                resolve(notification);
                callback({
                    instance: notification
                })
            }
        )
    })
}

const notification: any = {
    open: (args: any) => {
        getNotificationInstance(args, ({ instance }) => {
            instance.notice(args)
        })
    },
    close(key:string){
        Object.keys(notificationInstance).forEach(cacheKey=>{
            Promise.resolve(notificationInstance[cacheKey]).then(instance=>{
                instance.removeNotice(key);
            });
        })
    },
    destroy() {
        Object.keys(notificationInstance).forEach(cacheKey => {
          Promise.resolve(notificationInstance[cacheKey]).then(instance => {
            instance.destroy();
          });
          delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
        });
    }

};

['success', 'info', 'warning', 'error'].forEach((item: any) => {
    notification[item] = (args: any) => {
        getNotificationInstance(args, ({ instance }) => {
            instance.notice({...args,status:item})
        })
    }
})

export default notification;