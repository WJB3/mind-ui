import React from 'react';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import classNames from '../_utils/className';
import Icon from '../components/icon';
import Progress from '../Progress';
import Loading from '../Loading';

const UploadList=React.forwardRef((props,ref)=>{

    const {
        items=[],
        iconRender,
        listType,
        isImageUrl:isImgUrl,
        prefixCls,
        onPreview,
        showRemoveIcon=true
    }=props; 

    console.log(items)

    const handleIconRender=(file)=>{
        if(iconRender){
            return iconRender(file,listType);
        }
        const isLoading=file.status==='uploading';
        const fileIcon=isImgUrl && isImgUrl(file)?"file":"image";
        let icon=isLoading?<Loading />:<Icon name="paperclip"/>;

        return icon;
    }   

    const handlePreview=(file,e)=>{
        if(!onPreview) return ;
        e.preventDefault();
        return onPreview(file);
    }

    const list=items.map(file=>{ 
        let progress;
        const iconNode=handleIconRender(file);

        let icon=<div className={classNames(`${prefixCls}-text-icon`)}>
            {iconNode}
        </div>

        if(file.status==="uploading"){
            const loadingProgress='percent' in file?(
                <Progress type="liner" color={"primary"} variant="determinate" value={file.percent}  />
            ):null;

            progress=(
                <div className={classNames(`${prefixCls}-list-item-progress`)}  key="progress">
                    {loadingProgress}
                </div>
            )
        }

        const preview=file.url?[
            <a key="view" target="_blank" rel="noopener noreferrer" title={file.name} href={file.url}
                onClick={()=>handlePreview(file,e)}>
                {file.name}
            </a>
        ]:null;
 

        const dom=(
            <div>
                {preview}
                {progress}
            </div>
        )

        return (
            <CSSTransition key={file.uid} timeout={500} classNames={"list-item"}>
                {dom}
            </CSSTransition>
        )
    })

    const renderUploadList=()=>{

        return <TransitionGroup>
            {list}
        </TransitionGroup>
    }

    return renderUploadList();
});


export default UploadList;