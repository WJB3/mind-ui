import React ,{forwardRef,useState, useEffect} from 'react';
import AjaxUploader from './uploader/AjaxUploader';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { fileToObject } from 'antd/lib/upload/utils';
import { getFileItem } from './utils';

const Uploader =forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        type="select",
        multiple=false,
        action="",
        data={},
        accept="",
        showUploadList=true,
        listType="text",
        className="",
        disabled=false,
        supportServerRender=true,
        children,
        fileList:fileListProp,
        defaultFileList:defaultFileListProp,
        onChange:onChangeProp,
        beforeUpload:beforeUploadProp
    }=props;

    const [fileList,setFileList]=useState(fileListProp||defaultFileListProp||[]);

    const ajaxUploaderRef=useRef(null);

    const progressTimer=useRef(null);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("uploader", customizePrefixCls);

    const onStart=(file)=>{
        const targetItem=fileToObject(file);
        targetItem.status='uploading';

        const nextFileList=fileList.concat();
        const fileIndex=nextFileList.findIndex(({uid})=>uid===targetItem.uid);

        if(findIndex===-1){
            nextFileList.push(targetItem);
        }else{
            nextFileList[fileIndex]=targetItem;
        }

        onChange({
            file:targetItem,
            fileList:nextFileList
        })

    }
    
    const onError=(error,response,file)=>{
        const targetItem=getFileItem(file,fileList);

        if(!targetItem){
            return ;
        }

        targetItem.error=error;
        targetItem.response=response;
        targetItem.status='error';

        onChange({
            file:{...targetItem},
            fileList
        })
    }

    const onProgress=(e,file)=>{
        const targetItem=getFileItem(file,fileList);
        if(!targetItem){
            return ;
        }
        targetItem.percent=e.percent;
        onChange({
            event:e,
            file:{...targetItem},
            fileList
        })
    }

    const onSuccess=(response,file,xhr)=>{
        try{
            if(typeof response==='string'){
                response=JSON.parse(response);
            }
        }catch(e){}
        const targetItem=getFileItem(file,fileList);
        if(!targetItem){
            return ;
        }
        targetItem.status='done';
        targetItem.response=response;
        targetItem.xhr=xhr;
        onChange({
            file:{...targetItem},
            fileList
        })
    }

    const onChange=(info)=>{
        if(!fileListProp){
            setFileList(info.fileList);
        }

        if(onChangeProp){
            onChangeProp({
                ...info,
                fileList:[...info.fileList]
            })
        }
    }

    const beforeUpload=(file,fileListProp)=>{
        if(!beforeUpload){
            return true;
        }

        const result=beforeUploadProp(file,fileListProp);

        if(result===false){
            const uniqueList=[];

            fileList.concat(fileList.map(fileToObject)).forEach(f=>{
                if(uniqueList.every(uf=>uf.uid!==f.uid)){
                    uniqueList.push(f);
                }
            })

            onChange({
                file,
                fileList:uniqueList
            });

            return false;
        }

        if(result && result.then){
            return result;
        }

        return true;
    }

    const renderUpload=()=>{
 
        const uploadProps={
            onStart:onStart,
            onError:onError,
            onProgress:onProgress,
            onSuccess:onSuccess,
            ...props,
            prefixCls,
            beforeUpload:beforeUpload
        }

        delete uploadProps.className;
        delete uploadProps.style;

        const uploadButton=(
            <div className={classNames(
                prefixCls
            )} style={children?undefined:{display:"none"}}>
                <AjaxUploader {...uploadProps} ref={ajaxUploaderRef}  />
            </div>
        )

        return <span className={className}>
            {uploadButton}
        </span>
    }
 
    useEffect(()=>{
        setFileList(fileListProp||[]);
    },[fileListProp])

    return renderUpload();

});

export default Uploader;