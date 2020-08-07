function loopFiles(item,callback){
    const dirReader=item.createReader();

    let fileList=[];

    function sequence(){
        dirReader.readEntries((entries)=>{
            const entryList=Array.prototype.slice.apply(entries);

            fileList=fileList.concat(entryList);

            const isFinished=!entryList.length;

            if(isFinished){
                callback(fileList);
            }else{
                sequence();
            }
        })
    }

    sequence();

}

const traverseFileTree=(files,callback,isAccepted)=>{

    const _traverseFileTree=(item,path)=>{
        path=path||'';
        if(item.isFile){
            item.file((file)=>{
                if(isAccepted(file)){

                }
            })
            callback([file]);
        }else if(item.isDirectory){
            loopFiles(item,(entries)=>{
                entries.forEach((entryItem)=>{
                    _traverseFileTree(entryItem,`${path}${item.name}`);
                })
            })
        }
    }

    files.forEach(file=>{
        _traverseFileTree(file.webkitGetAsEntry());
    });
}