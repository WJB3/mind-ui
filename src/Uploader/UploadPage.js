import React from 'react';
import Upload from './index';
import Button from '../ButtonBase';
import message from '../Message';
import Icon from '../components/icon';
import { Upload as AUpload} from 'antd';

const Page=React.forwardRef((props,ref)=>{

    const uploadProp={
        name:"test",
        action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",
        headers: {
            authorization: 'authorization-text',
        },
        data:{
            test:"aaaa",
            test2:"bbbb",
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
              //console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
        },
    }

    return (
        <Upload {...uploadProp} showUploadList={{showDownloadIcon:true}}>
            <Button><Icon name={"cloud-upload"} style={{marginRight:10}}/>Click to upload</Button>   
        </Upload>
    )
});

export default Page;