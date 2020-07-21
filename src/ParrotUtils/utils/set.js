export default function set(entity,paths,value){
    if(!paths.length){
        return value;
    }

    const [path,...restPath]=paths;

    let clone;
    if(!entity && typeof path==='number'){
        clone=[];
    }else if(Array.isArray(entity)){
        clone=[...entity]
    }else{
        clone={...entity}
    }

    clone[path]=set(clone[path],restPath,value);

    return clone;
}