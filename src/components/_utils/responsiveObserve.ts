

export const responsiveSize={
    xs:'(max-width:575px)',
    sm:'(min-width:576px)',
    md:'(min-width:768px)',
    lg:'(min-width:992px)',
    xl:'(min-width:1200px)',
    xxl:'(min-width:1600px)'
}

export const responsiveArray= ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

let subscribers=[];//注册的事件
let screens={};//屏幕
let subUid=-1;//用来标示便于清除

const responsiveObserve={
    matchHandlers:{},
    dispatch(ScreenMap){
        screens=ScreenMap;
        if(subscribers.length<1){
            return false;
        }
        subscribers.forEach(item=>{
            item.func(screens);
        })
        return true;
    },
    subscribe(func){
        if(subscribers.length===0){
            this.register();
        }
        const token=(++subUid).toString();
        subscribers.push({
            func,
            token
        });
        func(screens);
        return token;
    },
    unsubscribe(token){
        subscribers=subscribers.filter(item=>item.tokens!==token);
        if(subscribers.length===0){
            this.unregister();
        }
    },
    register(){
        Object.keys(responsiveSize).forEach(size=>{
            const matchMediaQuery=responsiveSize[size];
            const listener=({matches})=>{
                this.dispatch({
                    ...screens,
                    [size]:matches
                })
            }
            const mql=window.matchMedia(matchMediaQuery);
            mql.addListener(listener);
            this.matchHandlers[matchMediaQuery]={
                mql,
                listener
            };
            listener(mql);
        })
    },
    unregister(){
        Object.keys(responsiveSize).forEach(size=>{
            const matchMediaQuery=responsiveSize[size];
            const handler=this.matchHandlers[matchMediaQuery];
            if(handler && handler.mql && handler.listener){
                handler.mql.removeListener(handler.listener);
            }
        })
    }
}

export {
    responsiveObserve
}