import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import  createChainedFunction  from '../_utils/createChainedFunction';
import Notice from './Notice';
import ReactDom from 'react-dom';
import "./index.scss";

class Notices extends React.Component{
    state={
        notices: []
    }

    removeNotice(key) {
        let notices = this.state.notices.filter((notice) => notice.key !== key)
        this.setState({
            notices: notices
        })
    }

    getNoticeNodes=()=>{
        const { notices }=this.state;
      
        return notices.map((notice, index) => {
           
            //createChainedFunction目的是，让this.remove函数,notice.onClose函数能够接收相同的参数，并一同调用。
            //即调用onClose时，会先调用this.remove,再调用notice.onClose
            const onClose = createChainedFunction(this.removeNotice.bind(this,notice.key), notice.onClose);

            //React中有两个比较特殊的参数：ref 和 key，不会被传递到组件
            return <Notice
                        onClose={onClose}
                        message={notice.message?notice.message:"消息提醒"}
                        duration={notice.duration?notice.duration:4}
                        isCloseAuto={isNull(notice.duration)}
                        type={notice.status} 
                        in={true}
            /> 
        })
    }

    render() {
        const { className,style,prefixCls:customizePrefixCls }=this.props; 

        const { getPrefixCls } = React.useContext(ConfigContext);

        const prefixCls = getPrefixCls("notices", customizePrefixCls);

        return (
            <div className={classNames(prefixCls,className)} style={style}>
                {this.getNoticeNodes()} 
            </div>
        )
    }
}

export default Notices;

Notices.newInstance = function newNotificationInstance(properties, callback) {

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

    function ref(notification){
        if(called){
            return ;
        }
        called=true;
        callback({
            notice(noticeProps){
                notification.addNotice(noticeProps);
            },
            component:notification,
            removeNotice(key){
                notification.removeNotice(key);
            }
        })
    }

    ReactDom.render(<Notices {...props} ref={ref} />, div);

}