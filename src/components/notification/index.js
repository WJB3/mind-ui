import Notification from './notification';
 
let defaultPlacement = 'right-top';
 
const notificationInstance={}

function getPlacementStyle(placement,top,bottom) {
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

function getNotificationInstance(args, callback) {

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
            (notification) => {
                resolve(notification);
                callback({
                    instance: notification
                })
            }
        )
    })
}

const notification  = {
    open: (args) => {
        getNotificationInstance(args, ({ instance }) => {
            instance.notice(args)
        })
    },
    close(key){
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

['success', 'info', 'warning', 'error'].forEach((item) => {
    notification[item] = (args) => {
        getNotificationInstance(args, ({ instance }) => {
            instance.notice({...args,status:item})
        })
    }
})

export default notification;