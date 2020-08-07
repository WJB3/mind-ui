 
const now = +(new Date());
let index = 0;

function getError(option,xhr){

    const msg=`cannot ${option.method} ${option.action} ${xhr.status}`;
    const err=new Error(msg);

    err.status=xhr.status;
    err.method=option.method;
    err.url=option.action;

    return err;
}

function getBody(xhr){
    const text=xhr.responseText||xhr.response;

    if(!text){
        return text;
    }

    try{
        return JSON.parse(text);
    }catch(e){
        return text;
    }
}

export function getUid(){
    return `parrot-mini-upload-${now}-${++index}`;
}

function endsWith(str,suffix){
    return str.indexOf(suffix,str.length-suffix.length)!==-1;
}

export function attrAccept(file, acceptedFiles){
    if(file && acceptedFiles){
        const acceptedFilesArray=Array.isArray(acceptedFiles)
            ?acceptedFiles
            :acceptedFiles.split(",");
        const fileName=file.name||'';
        const mimeType=file.type||'';
        const baseMimeType=mimeType.replace(/\/.*$/,'');

        return acceptedFilesArray.some(type=>{
            const validType=type.trim();

            if(validType.charAt(0)==='.'){
                return endsWith(fileName.toLowerCase(),validType.toLowerCase());
            }else if(/\/\*$/.test(validType)){
                return baseMimeType===validType.replace(/\/.*$/, '')
            }
            return mimeType===validType;
        });
    }
    return true;
}

export default function upload(option){
    const xhr=new XMLHttpRequest();

    if(option.onProgress && xhr.upload){
        xhr.upload.onprogress=function progress(e){
            if(e.total>0){
                e.percent=e.loaded/e.total*100;
            }
            option.onProgress(e);
        }
    }

    const formData=new FormData();

    if(option.data){
        Object.keys(option.data).forEach(key=>{
            const value=option.data[key];
            if(Array.isArray(value)){
                value.forEach(item=>{
                    formData.append(`${key}[]`,item);
                });
                return ;
            }

            formData.append(key,option.data[key]);
        })
    }

    if(option.file instanceof Blob){
        formData.append(option.filename,option.file,option.file.name);
    }else{
        formData.append(option.filename,option.file);
    }

    xhr.onerror=function error(e){
        option.onError(e);
    }

    xhr.onload=function onload(){
        if(xhr.status<200||xhr.status>=300){
            return option.onError(getError(option,xhr),getBody(xhr));
        }

        return option.onSuccess(getBody(xhr),xhr);
    }

    xhr.open(option.method,option.action,true);

    if(option.withCredentials && 'withCredentials' in xhr){
        xhr.withCredentials=true;
    }

    const headers=option.headers||{};
    
    //判断是否是异步请求，请求头存在X-Requested-With即为异步请求
    if(headers['X-Requested-With']!==null){
        xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    }

    Object.keys(headers).forEach(h=>{
        if(headers[h]!==null){
            xhr.setRequestHeader(h,headers[h]);
        }
    })

    xhr.send(formData);

    return {
        abort(){
            xhr.abort();
        }
    }


}