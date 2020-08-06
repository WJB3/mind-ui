
export function fileToObject(file){
    return {
        ...file,
        lastModified:file.lastModified,
        lastModifiedDate:file.lastModifiedDate,
        name:file.name,
        size:file.size,
        type:file.type,
        uid:file.uid,
        percent:0,
        originFileObj:file
    }
}

export function getFileItem(file,fileList){
    const matchKey=file.uid!==undefined?'uid':'name';
    return fileList.filter(item=>item[matchKey]===file[matchKey]);
}

export function removeFileItem(file,fileList){
    const matchKey=file.uid!==undefined?'uid':'name';
    const removed=fileList.filter(item=>item[matchKey]!==file[matchKey]);
    if(removed.length===fileList.length){
        return null;
    }
    return removed;
}