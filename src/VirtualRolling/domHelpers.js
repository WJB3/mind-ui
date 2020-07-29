let size=-1;

//可以获取滚动条的大小
export function getScrollbarSize(recalculate=false){

    if(size===-1 || recalculate){

        const div=document.createElement("div");
        const style=div.style;
        style.width="50px";
        style.height="50px";
        style.overflow="scroll";

        document.body.appendChild(div);
        //offsetwidth对象整体的实际宽度，包滚动条等边线
        //clientWidth对象内容的可视区的宽度，不包滚动条等边线
        size=div.offsetWidth-div.clientWidth;
        document.body.removeChild(div); 

    }

    return size;
}

let cachedRTLResult=null;

export function getRTLOffsetType(recalculate=false){
    if(cachedRTLResult===null || recalculate){
        const outerDiv=document.createElement("div");
        const outerStyle=outerDiv.style;
        outerStyle.width='50px';   
        outerStyle.height='50px';   
        outerStyle.overflow='scroll';
        outerStyle.direction="rtl";
        
        const innerDiv=document.createElement("div");
        const innerStyle=innerDiv.style;
        innerStyle.width = '100px';
        innerStyle.height = '100px';

        outerDiv.appendChild(innerDiv);

        document.body.appendChild(outerDiv);

        if(outerDiv.scrollLeft>0){
            cachedRTLResult="positive-descending";
        }else{
            outerDiv.scrollLeft=1;
            if(outerDiv.scrollLeft===0){
                cachedRTLResult='negative';
            }else{
                cachedRTLResult="positive-ascending";
            }
        }

        document.body.removeChild(outerDiv);

        return cachedRTLResult;
    }
}