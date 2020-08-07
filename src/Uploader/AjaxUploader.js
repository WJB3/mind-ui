import React,{useState, useEffect,useRef } from 'react';
import classNames from '../_utils/className';
import useForkRef from '../_utils/useForkRef';
import defaultRequest, { getUid,attrAccept } from './request';

const dataOrAriaAttributeProps=(props)=>{
    return Object.keys(props).reduce(
        (acc,key)=>{
            if(key.substr(0,5)==="data-"||key.substr(0,5)==='aria-'||key==='role'){
                acc[key]=props[key];
            }
            return acc;
        },
        {}
    )
}

const empty=()=>{

}

const AjaxUploader=React.forwardRef((props,ref)=>{

    const {
        component:Component="span",
        disabled,
        openFileDialogOnClick=true,
        inputRef,
        children,
        onClick:onClickProp,
        onMouseEnter,
        onMouseLeave,
        multiple=false,
        accept,
        beforeUpload=null,
        onStart=empty,
        onProgress,
        transformFile=(originFile)=>originFile,
        //上传的地址
        action,
        //自定义上传方法
        customRequest=null,
        data={},
        name="file",
        headers={},
        withCredentials=false,
        method,
        onSuccess=empty,
        onError=empty,
        style,
        ...restProps
    }=props;

    const fileInputRef=useRef(null);
    const isMounted=useRef(false);
    const reqs=useRef({});

    const [uid,setUid]=useState(getUid());

    const handleRef=useForkRef(fileInputRef,inputRef); 

    const onClick=(e)=>{
        const el=fileInputRef.current;
        if(!el){
            return ;
        }
        if(children && children.type==='button'){
            el.parentNode.focus();
            el.parentNode.querySelector('button').blur();
        }
        el.click();
        if(onClickProp){
            onClickProp(e);
        }

    }

    const onKeyDown=(e)=>{
        if(e.key==='Enter'){
            onClick();
        }
    }

    const upload=(file,fileList)=>{ 
        if(!beforeUpload){ 
            return setTimeout(()=>post(file),0);
        }
        const before=beforeUpload(file,fileList);
        if(before && before.then){

        }else if(before!==false){
            setTimeout(()=>post(file,0));
        }
        return undefined;
    }

    const post=(file)=>{
        if(!isMounted.current){
            return ;
        }

        new Promise(resolve=>resolve(action))
            .then(action=>{
                const {uid}=file;
                const request=customRequest||defaultRequest;
                const transform=Promise.resolve(transformFile(file))
                    .then((transformedFile)=>{
                        if(typeof data==='function'){
                            data=data(transformedFile);
                        }
                        return Promise.all([transformedFile,data]);
                    })
                    .catch(e=>{
                        console.error(e);
                    });
                
                transform.then(([transformedFile,data])=>{
                    const requestOption={
                        action,
                        filename:name,
                        data,
                        file:transformedFile,
                        headers:headers,
                        withCredentials:withCredentials,
                        method:method||'post',
                        onProgress:onProgress?e=>{onProgress(e,file)}:null,
                        onSuccess:(ret,xhr)=>{
                            delete reqs.current[uid];
                            onSuccess(ret,xhr,file);
                        },
                        onError:(err,ret)=>{
                            delete reqs.current[uid];
                            onError(err,ret,file);
                        }
                    }
                    reqs.current[uid]=request(requestOption);
                    onStart(file);
                })

            })
    }

    const uploadFiles=(files)=>{
        const postFiles=Array.prototype.slice.call(files);

        postFiles
            .map(file=>{
                file.uid=getUid();
                return file;
            })
            .forEach(file=>{
                upload(file,postFiles);
            })
    }

     
    const onFileDrop=(e)=>{ 

        e.preventDefault();

        if(e.type==='dragover'){
            return ;
        } 

        let files=Array.prototype.slice
            .call(e.dataTransfer.files)
            .filter(file=>attrAccept(file,accept));

        if(multiple===false){
            files=files.slice(0,1);
        }

        uploadFiles(files);
    }

    const events=disabled?{}:{
        onClick:openFileDialogOnClick?onClick:()=>{},
        onKeyDown:openFileDialogOnClick?onKeyDown:()=>{},
        onMouseEnter,
        onMouseLeave,
        onDrop:onFileDrop,
        onDragOver:onFileDrop,
        tabIndex:"0" 
    }

    const abort=(file)=>{
        if(file){
            let uid=file;
            if(file && file.uid){
                uid=file.uid;
            }
            if(reqs.current[uid] && reqs.current[uid].abort){
                reqs.current[uid].abort();
            }
            delete reqs.current[uid];
        }else{
            Object.keys(reqs.current).forEach((uid)=>{
                if(reqs.current[uid] && reqs.current[uid].abort){
                    reqs.current[uid].abort();
                }
                delete reqs.current[uid];
            })
        }
    }

    const onChange=e=>{
        const files=e.target.files;
        uploadFiles(files);
        reset();
    }

    const reset=()=>{
        setUid(getUid());
    }

    useEffect(()=>{
        isMounted.current=true;

        ()=>{
            isMounted.current=false;
            abort();
        }

    },[]);

    return(
        <Component
            {...events}
            role="button"
            style={style}
            ref={ref}
        >
            <input 
                {...dataOrAriaAttributeProps(restProps)}
                ref={handleRef}
                type="file"
                onClick={e => e.stopPropagation()}
                key={uid}
                accept={accept}
                multiple={multiple}
                onChange={onChange}
                style={{ display: 'none' }}
            />
            {children}
        </Component>
    )

});

export default AjaxUploader;