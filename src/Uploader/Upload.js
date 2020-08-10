import React ,{ forwardRef,useState, useEffect,useRef } from 'react';
import AjaxUploader from './AjaxUploader';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext'; 
import useInit from '../_utils/useInit';
import { getFileItem,fileToObject } from './utils'; 
import UploadList from './UploadList';
import "./index.scss";


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
        beforeUpload:beforeUploadProp,
    }=props;

    const fileList=useRef(fileListProp||defaultFileListProp||[]);

    const isInit=useInit();

    const ajaxUploaderRef=useRef(null);

    const [forceUpdate,setForceUpdate]=useState([]);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("upload", customizePrefixCls);

    const onStart=(file)=>{ 

        console.log("onStart")
      
        const targetItem=fileToObject(file);

        targetItem.status='uploading';
 
        const nextFileList=fileList.current.concat();
        const fileIndex=nextFileList.findIndex(({uid})=>uid===targetItem.uid);

        if(fileIndex===-1){
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
        const targetItem=getFileItem(file,fileList.current);

        if(!targetItem){
            return ;
        }

        targetItem.error=error;
        targetItem.response=response;
        targetItem.status='error';

        onChange({
            file:{...targetItem},
            fileList:fileList.current
        })
    }

    const onProgress=(e,file)=>{

        console.log("onProgress")
       
        const targetItem=getFileItem(file,fileList.current); 

        if(!targetItem){
            return ;
        }
        targetItem.percent=e.percent;
        onChange({
            event:e,
            file:{...targetItem},
            fileList:fileList.current
        })
    }

    const onSuccess=(response,file,xhr)=>{
         
        try{
            if(typeof response==='string'){
                response=JSON.parse(response);
            }
        }catch(e){}
        const targetItem=getFileItem(file,fileList.current);
        if(!targetItem){
            return ;
        }
        targetItem.status='done';
        targetItem.response=response;
        targetItem.xhr=xhr;
        onChange({
            file:{...targetItem},
            fileList:fileList.current
        })
    }

    const onChange=(info)=>{  
  
        fileList.current=info.fileList||[]; 

        if(onChangeProp){
            onChangeProp({
                ...info,
                fileList:[...info.fileList]
            })
        }
    }

    const beforeUpload=(file,fileListProp)=>{
        if(!beforeUploadProp){
            return true;
        }

        const result=beforeUploadProp(file,fileListProp);

        if(result===false){
            const uniqueList=[];

            fileList.current.concat(fileList.current.map(fileToObject)).forEach(f=>{
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

    const renderUploadList=()=>{
        console.log("renderUploadList")
        return <UploadList 
            items={fileList.current}
            prefixCls={prefixCls}
        />
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
        );

        const uploadList=showUploadList ? renderUploadList() :null;

        return <span className={className}>
            {uploadButton}
            {uploadList}
        </span>
    }
 
    useEffect(()=>{
        if(isInit.current){
            fileList.current=fileListProp||[];
        }
    },[fileListProp]) 

    return renderUpload();

});

export default Uploader;