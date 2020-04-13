import Notification from './notification';
export enum notificationType{
    SUCCESS="success",
    ERROR="error",
    INFO="info",
    WARNING="warning"
}

function getNotificationInstance(){
    let notificationInstance=null;
    Notification.newInstance({},(n:any)=>notificationInstance=n);
    return notificationInstance;
}

let notificationInstance:any=getNotificationInstance();


const notification:any={
    open:function(notificationProps:any){
        notificationInstance.notice(notificationProps)
    }
     
};

['success', 'info', 'warning', 'error'].forEach((item:any)=>{
    notification[item]=function(notificationProps:any){
        notificationInstance.notice({...notificationProps,status:item})
    }
})

export default notification;