import React from 'react';
import { classNames } from '../components/helper/className';
import { isNull } from '../_utils/helpUtils'
import  createChainedFunction  from '../_utils/createChainedFunction';
import Notice from './Notice';
import ReactDOM from 'react-dom';
import "./index.scss";

let seed = 0;
const now = Date.now();

function getNotificationUuid() {
    return `parrotNotification_${now}_${seed++}`;
}
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

    //add方法保证了notice不会重复加入到notices队列中。
    addNotice(notice) {
  
        const { notices } = this.state;
        const { maxCount } = this.props;
        //key表示一个notice的id
        const key = notice.key || getNotificationUuid();
        notice.key=key;
        notice.in=true;
        notice.filled=this.props.filled;
        notice.effect=this.props.effect;
        notice.direction=this.props.direction;
        notice.className=`${this.props.className}-${this.props.direction}`
    
        //要添加的notice是否存在
        const noticeIndex = notices.map((v) => v.key).indexOf(key);
        //使用concat()来复制notice数组
        const updatedNotices = notices.concat();
        //如果要加的notice已经存在
        if (noticeIndex !== -1) {
            //删除已存在的notice，加入要添加的notice
            updatedNotices.splice(noticeIndex, 1, notice);
        } else {
            //如果设置了maxCount，且notices中的数量已达到maxCount的限制，那么移除第一个notice
            if (maxCount && notices.length >= maxCount) {
                //updateKey设置为最初移除的key，最要是为了利用已存在的组件
                notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
                updatedNotices.shift();
            }
            //加入的要添加的notice
            updatedNotices.push(notice);
        }
        this.setState({
            notices: updatedNotices
        })
      
    }

    onCloseEffect=(key)=>{  
        this.setState({
            notices: this.state.notices.map((item)=> {
                if(item.key===key){
                    return ({...item,in:false})
                }
                return ({...item})
            })
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
                        key={notice.key}
                        keyIndex={notice.key}
                        onClose={onClose}
                        onCloseEffect={this.onCloseEffect}
                        message={notice.message?notice.message:"消息提醒"}
                        duration={notice.duration?notice.duration:2}
                        isCloseAuto={isNull(notice.duration)}
                        type={notice.status==="open"?"normal":notice.status} 
                        in={notice.in}
                        effect={notice.effect?notice.effect:"grow"}
                        filled={notice.filled}
                        direction={notice.direction}
                        // className={notice.className?notice.className:""}
            /> 
        })
    }

    render() {
        const { className,style  }=this.props;

        return (
            <div className={classNames(`parrot-notices`,className)} style={style}>
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
            },
            onCloseEffect(key){
                notification.onCloseEffect(key);
            },
            destroy() {
                ReactDOM.unmountComponentAtNode(div);
                if (!getContainer) {
                  document.body.removeChild(div);
                }
            },
        })
    }

    ReactDOM.render(<Notices {...props} ref={ref} />, div);

}